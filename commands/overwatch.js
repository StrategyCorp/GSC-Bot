const Discord = require('discord.js');
const request = require('request');

exports.run = async (client, message, [search, ...args]) => {
  search = search ? search.toLowerCase() : "help";
  var cmdList = [];
  var cmdArray = [
    ["player", "<battletag> [platform && region]", "Displays a players stats", "Who would you like me to look up?"]
  ];
  const settings = client.settings.get(message.guild.id);
  const helpEmbed = new Discord.RichEmbed()
    .setColor(settings.embedColour)
    .setTitle('**Overwatch Help**');
  for (let [cmdName, cmdUsage, cmdDesc, cmdError] of cmdArray) {
    cmdList.push(cmdName);
    helpEmbed.addField(cmdName, `${settings.prefix}smite ${cmdName} ${cmdUsage}\n${cmdDesc}`);
  }
  if (search === "help") {
    return message.channel.send({embed: helpEmbed});
  }
  var aliaseObj = {
    "profile": "player"
  };
  var aliaseArray = Object.keys(aliaseObj);
  if (!args[0]) {
    for (let [cmdName, cmdUsage, cmdDesc, cmdError] of cmdArray) {
      if (search === cmdName) return message.channel.send(`:negative_squared_cross_mark: ${cmdError}`);
    }
  }
  if (client.isInArray(aliaseArray, search) === true) search = aliaseObj[search];
  if (client.isInArray(cmdList, search) === false) return message.channel.send(':negative_squared_cross_mark: Unknown command');
  var rankObj = {
    "unranked" : [0, 0],
    "bronze": [1, 1499],
    "silver": [1500, 1999],
    "gold": [2000, 2499],
    "platinum": [2500, 2999],
    "diamond": [3000, 2499],
    "master": [3500, 3999],
    "grand master": [4000, 5000]
  };
  var platformObj = {
    "psn": "psn",
    "ps": "psn",
    "ps4": "psn",
    "xbl": "xbl",
    "xbox": "xbl",
    "pc": "pc"
  };
  var platformArray = Object.keys(platformObj);
  var rankArray = Object.keys(rankObj);
  const requestData = (url) => {
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
          var region = !args[1] ? "na" : (args[1].match(/^(na|eu|asia)$/)) ? args[1] : (!args[2]) ? "na" : (args[2].match(/^(na|eu|asia)$/)) ? args[2] : "na";
          var p = data;
          for (let rankRank of rankArray) {
            if (client.between(p.rating, rankObj[rankRank][0], rankObj[rankRank][1])) {
              var rank = rankRank;
            }
          }
          let main = [
            `**Level:** ${p.prestige}-${p.level} (${parseInt((p.prestige * 100) + p.level)})`,
            `**Rank:** ${rank.toProperCase()} - ${p.rating}`
          ];
          const playerEmbed = new Discord.RichEmbed()
            .setColor(settings.embedColour)
            .setThumbnail(data.icon)
            .addField(p.name, main.join('\n'));
          return message.channel.send({embed: playerEmbed});
        }
      }
    });
  };
  if (search === "player") {
    var player = args[0].split('#');
    if (!player[1]) return message.channel.send(':negative_squared_cross_mark: You must include your whole battletag. Example: name#1234');
    var platform = !args[1] ? "pc" : (client.isInArray(platformArray, args[1])) ? args[1] : (!args[2]) ? "pc" : (client.isInArray(platformArray, args[2])) ? args[2] : "pc";
    // requestData(`https://owapi.net/api/v3/u/${player[0]}-${player[1]}/stats`);
  }
};

exports.cmdConfig = {
  name: "overwatch",
  aliases: ['ow'],
  description: "Gives Overwatch stats",
  usage: "overwatch",
  type: "info"
};
