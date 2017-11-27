const Discord = require('discord.js');
const db = require('../data/smite.json');
const request = require('request');
const moment = require('moment');
const md5 = require('md5');
const { inspect } = require("util");

exports.run = async (client, message, [search, ...args]) => {
  if (search) search = search.toLowerCase();
  if (search === "help" || search === undefined) {
    var cmdArray = [
      ["player", "<player>", "Displays a players stats"],
      ["god", "<god>", "Displays infomation on a chosen God"]
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
  let searchArray;
  if (client.isInArray(searchArray, search) === false) return message.channel.send(':negative_squared_cross_mark: Unknown command');
  const domain = "http://api.smitegame.com/smiteapi.svc/";
  const devID = process.env.SMITEDEVID;
  let timestamp = moment().format('YYYYMMDDHHmmss');
  const authKey = process.env.SMITEAUTHID;
  function createSignature(method) {
    return md5(`${devID}${method}${authKey}${timestamp}`);
  }
  
  var rankedTierObj = {
    "Unranked": "#ff0000",
    "Bronze V": "#a0460a",
    "Bronze IV": "#a0460a",
    "Bronze III": "#a0460a",
    "Bronze II": "#a0460a",
    "Bronze I": "#a0460a",
    "Silver V": "#a0a0a0",
    "Silver IV": "#a0a0a0",
    "Silver III": "#a0a0a0",
    "Silver II": "#a0a0a0",
    "Silver I": "#a0a0a0",
    "Gold V": "#dca032",
    "Gold IV": "#dca032",
    "Gold III": "#dca032",
    "Gold II": "#dca032",
    "Gold I": "#dca032",
    "Platinum V": "#508c28",
    "Platinum IV": "#508c28",
    "Platinum III": "#508c28",
    "Platinum II": "#508c28",
    "Platinum I": "#508c28",
    "Diamond V": "#2864c8",
    "Diamond IV": "#2864c8",
    "Diamond III": "#2864c8",
    "Diamond II": "#2864c8",
    "Diamond I": "#2864c8",
    "Masters": "#ff00ff"
  };
  var rankedTierArray = Object.keys(rankedTierObj);
  
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
  
  testSession();
  if (search === "player") requestData("getplayer", args[0]);
  if (search === "god" || search === "gods") requestData()
  
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
        return message.channel.send(':negative_squared_cross_mark: Error: ' + err);
      } else if (res.statusCode !== 200) {
        return message.channel.send(':negative_squared_cross_mark: Status: ' + res.statusCode);
      } else {
        if (search === "player") {
          var p = data[0];
          if (!p) return message.channel.send(`:negative_squared_cross_mark: Error: I could not find that player. Either \`${args[0]}\` is wrong or the profile is private`);
          let name = p["Name"].replace('[', '').split(']');
          let level = `**Level:** ${p.Level}`;
          let status = `**Status:** ${p.Personal_Status_Message}`;
          let clan = `**Clan:** ${p.Team_Name}`;
          let region = `**Region:** ${p.Region}`;
          let mastery = `**Mastery:** ${p.MasteryLevel} Gods, ${p.Total_Worshippers} total Worshippers`;
          let created = `**Account Created:** ${p.Created_Datetime}`;
          let login = `**Last Login:** ${p.Last_Login_Datetime}`;
          let achievement = `**Achievements:** ${p.Total_Achievements}`;
          let winrate = parseInt(p.Wins) / (parseInt(p.Wins) + parseInt(p.Losses)) * 100;
          let rankColour = [p.Tier_Conquest, p.Tier_Duel, p.Tier_Joust];
          rankColour = rankedTierObj[rankedTierArray[Math.max.apply(Math, rankColour)]];
          const playerEmbed = new Discord.RichEmbed()
            .setColor(rankColour)
            .addField(name[1], `${level}\n${status}\n[${name[0]}] ${clan}\n${region}\n${mastery}\n${created}\n${login}\n${achievement}`)
            .addField('Games', `**Winrate:** ${winrate}%\n**Wins:** ${p.Wins}\n**Losses:** ${p.Losses}\n**Matches Left:** ${p.Leaves}`)
            .addField('Ranked', `**Conquest:** ${rankedTierArray[p.Tier_Conquest]}\n**Duel:** ${rankedTierArray[p.Tier_Duel]}\n**Joust:** ${rankedTierArray[p.Tier_Joust]}`);
          if (p.Avatar_URL !== null) playerEmbed.setThumbnail(p.Avatar_URL);
          return message.channel.send({embed: playerEmbed});
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
