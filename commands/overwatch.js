const Discord = require('discord.js');
const request = require('request');

exports.run = async (client, message, [search, ...args]) => {
  search = search ? search.toLowerCase() : "help";
  var cmdList = [];
  var cmdArray = [
    ["player", "<battletag> [platform] [region]", "Displays a players stats", "Who would you like me to look up?"]
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
        return data;
      }
    });
  };
  if (search === "player") {
    var player = args[0].replace('#', '-');
    
    // requestData(`https://ow-api.com/v1/stats/pc/eu/Gazder-2748/profile`);
  }
};

exports.cmdConfig = {
  name: "overwatch",
  aliases: ['ow'],
  description: "Gives Overwatch stats",
  usage: "overwatch",
  type: "info"
};
