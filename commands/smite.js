const Discord = require('discord.js');
const db = require('../data/smite.json');
const request = require('request');
const moment = require('moment');
const md5 = require('md5');
const { inspect } = require("util");

exports.run = async (client, message, [search, ...args]) => {
  const settings = client.settings.get(message.guild.id);
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
  let cmdList = ['player', 'god'];
  if (client.isInArray(cmdList, search) === false) return message.channel.send(':negative_squared_cross_mark: Unknown command');
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
        // console.log(data);
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
  await client.wait(1000);
  if (search === "player") {
    requestData("getplayer", args[0]);
  } else if (search === "god") {
    requestData("getgods", "1");
  }
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
          let main = [
            `**Level:** ${p.Level}`,
            `**Status:** ${p.Personal_Status_Message}`,
            `**Clan:** [${name[0]}] ${p.Team_Name}`,
            `**Region:** ${p.Region}`,
            `**Mastery:** ${p.MasteryLevel} Gods, ${p.Total_Worshippers} total Worshippers`,
            `**Account Created:** ${p.Created_Datetime}`,
            `**Last Login:** ${p.Last_Login_Datetime}`,
            `**Achievements:** ${p.Total_Achievements}`
          ];
          let winrate = [
            `**Winrate:** ${parseInt(p.Wins) / (parseInt(p.Wins) + parseInt(p.Losses)) * 100}%\n**Wins:** ${p.Wins}`,
            `**Losses:** ${p.Losses}`,
            `**Matches Left:** ${p.Leaves}`
          ];
          let ranked = [
            `**Conquest:** ${rankedTierArray[p.Tier_Conquest]}`,
            `**Duel:** ${rankedTierArray[p.Tier_Duel]}`,
            `**Joust:** ${rankedTierArray[p.Tier_Joust]}`
          ];
          let rankColour = [p.Tier_Conquest, p.Tier_Duel, p.Tier_Joust];
          rankColour = rankedTierObj[rankedTierArray[Math.max.apply(Math, rankColour)]];
          const playerEmbed = new Discord.RichEmbed()
            .setColor(rankColour)
            .setThumbnail(p.Avatar_URL)
            .addField(name[1], main.join('\n'))
            .addField('Games', winrate.join('\n'))
            .addField('Ranked', ranked.join('\n'));      
          return message.channel.send({embed: playerEmbed});
        } else if (search === "god") {
          function findGod(searchGod) {
            return searchGod["Name"].toLowerCase() === args[0].toLowerCase();
          }
          var g = data.find(findGod);
          let main = [
            `**Role:**${g.Roles}`,
            `**Pantheon:** ${g.Pantheon}`,
            `**Attack Type:**${g.Type}`,
            `**Pros:**${g.Pros}`
          ];
          if (g.OnFreeRotation === "true") {
            main.push(`**Free Rotation:** True`)
          } else {
            main.push(`**Free Rotation:** False`)
          }
          if (g.latestGod === "y") main.push(`Currently the newest God`);
          let abilities = [
            `**P:** ${g.Ability1}`,
            `**1:** ${g.Ability2}`,
            `**2:** ${g.Ability3}`,
            `**3:** ${g.Ability4}`,
            `**4:** ${g.Ability5}`
          ];
          let stats = [
            [`**Health:** ${g.Health}`, g.HealthPerLevel],
            [`**HP5:** ${g.HealthPerFive}`, g.HP5PerLevel],
            [`**Mana:** ${g.Mana}`, g.ManaPerLevel],
            [`**MP5:** ${g.ManaPerFive}`, g.MP5PerLevel]
          ];
          let baseStats = [];
          let perLevel = [];
          for (let [] of )
          const godEmbed = new Discord.RichEmbed()
            .setColor(settings.embedColour)
            .setThumbnail(g.godIcon_URL)
            .addField(`${g.Name} - ${g.Title}`, main.join('\n'))
            .addField('Abilities', abilities.join('\n'))
            .addField("Base Stats", true)
            .addField("Per level", true);
          return message.channel.send({embed: godEmbed});
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
