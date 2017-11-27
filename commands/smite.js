const Discord = require('discord.js');
const db = require('../data/smite.json');
const request = require('request');
const moment = require('moment');
const md5 = require('md5');
const { inspect } = require("util");

exports.run = async (client, message, [search, ...args]) => {
  if (search) search = search.toLowerCase();
  /*
  if (search === "help" || search === undefined) {
    var cmdArray = [
      ["god", "<god>", "Displays infomation on a chosen God"],
      ["ability", "<ability> <god>", "Displays infomation on a chosen Gods ability"],
      ["stats", "<lvl> <god>", "Displays the stats on a chosen God at a chosen level"],
      ["achievement", "[achievement] <god>", "Displays a random or chosen achievement for a chosen God"],
      ["details", "", "Displays which Gods have been added and what smite patch the stats are for"]
    ];
    const settings = client.settings.get(message.guild.id);
    const helpEmbed = new Discord.RichEmbed()
      .setColor(settings.embedColour)
      .setTitle('**Smite Help**');
    for (let [cmdName, cmdUsage, cmdDesc] of cmdArray) {
       helpEmbed.addField(cmdName, `${settings.prefix}smite ${cmdName} ${cmdUsage}\n${cmdDesc}`);
    }
    return message.channel.send({embed: helpEmbed});
  }
  */
  
  const domain = "http://api.smitegame.com/smiteapi.svc/";
  const devID = process.env.SMITEDEVID;
  let timestamp = moment().format('YYYYMMDDHHmmss');
  const authKey = process.env.SMITEAUTHID;
  function createSignature(method) {
    return md5(`${devID}${method}${authKey}${timestamp}`);
  }
  
  var rankedTier = ["Unranked", "Bronze V", "Bronze IV", "Bronze III", "Bronze II", "Bronze I", "Silver V"];
  
  const testSession = async () => {
    var signature = createSignature("testsession");
    request.get({
      url: domain + `testsessionJson/${devID}/${signature}/${client.session.get("sessionID")}/${timestamp}`,
      json: true,
      headers: {'User-Agent': 'request'}
    }, (err, res, data) => {
      if (err) {
        return message.channel.send(':negative_squared_cross_mark: Error:' + err);
      } else if (res.statusCode !== 200) {
        return message.channel.send(':negative_squared_cross_mark: Status:' + res.statusCode);
      } else {
        let message = data.split(' ');
        message = message[0] + message[1] + message[2];
        if (message === "Invalidsessionid.") {
          createSession();
          // console.log("A new session is being created");
        } else if (message === "Invalidsignature.Your") {
          // console.log("The signature was rejected");
          return message.channel.send(':negative_squared_cross_mark: Invaid signature? If this error pops up the bot is really broken. Lets hope i never have to read this again!');
        } else if (message === "Thiswasa") {
          // console.log("we good!");
        }
      }
    });
  };
  
  const createSession = async () => {
    var signature = createSignature("createsession");
    request.get({
      url: domain + `createsessionJson/${devID}/${signature}/${timestamp}`,
      json: true,
      headers: {'User-Agent': 'request'}
    }, (err, res, data) => {
      if (err) {
        return message.channel.send(':negative_squared_cross_mark: Error:' + err);
      } else if (res.statusCode !== 200) {
        return message.channel.send(':negative_squared_cross_mark: Status:' + res.statusCode);
      } else {
        client.session.set("sessionID", data.session_id);
      }
    });
  };
  
  let searchObj = {
    "player": "getplayer",
    "match": "getmatchdetails"
  };
  let searchArray = Object.keys(searchObj);
  if (client.isInArray(searchArray, search) === false) return message.channel.send(':negative_squared_cross_mark: Unknown command');
  testSession();
  requestData(searchObj[search], args[0]);
  
  function requestData(method, parameters) {
    var signature = createSignature(method);
    let url = domain + `${method}Json/${devID}/${signature}/${client.session.get("sessionID")}/${timestamp}`
    if (parameters) url += `/${parameters}`;
    request.get({
      url: url,
      json: true,
      headers: {'User-Agent': 'request'}
    }, (err, res, data) => {
      if (err) {
        return message.channel.send(':negative_squared_cross_mark: Error:' + err);
      } else if (res.statusCode !== 200) {
        return message.channel.send(':negative_squared_cross_mark: Status:' + res.statusCode);
      } else {
        if (search === "player") {
          var p = data[0];
          let level = `**Level:** ${p.Level}`;
          let status = `**Status:** ${p.Personal_Status_Message}`;
          let clan = `**Clan:** ${p.Team_Name}`;
          let region = `**Region:** ${p.Region}`;
          let mastery = `**Mastery:** ${p.MasteryLevel} Gods, ${p.Total_Worshippers} total Worshippers`;
          let created = `**Account Created:** ${p.Created_Datetime}`;
          let login = `**Last Login:** ${p.Last_Login_Datetime}`;
          let winrate = parseInt(p.Wins) / (parseInt(p.Wins) + parseInt(p.Losses)) * 100;
          const playerEmbed = new Discord.RichEmbed()
            .addField(p.Name, `${level}\n${status}\n${clan}\n${region}\n${mastery}\n${created}\n${login}`)
            .addField('Games', `**Winrate:** ${winrate}%\n**Wins:** ${p.Wins}\n**Losses:** ${p.Losses}\n**Matches Left:** ${p.Leaves}`)
            .addField('Ranked')
          if (p.Avatar_URL !== null) playerEmbed.setThumbnail(p.Avatar_URL);
          message.channel.send({embed: playerEmbed});
        }
      }
    });
  }
};

exports.cmdConfig = {
  name: "smite",
  aliases: [],
  description: "Work in progress",
  usage: "smite",
  type: "info"
};
