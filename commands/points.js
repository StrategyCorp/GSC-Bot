const Discord = require('discord.js');

exports.run = (client, message, args) => {
  const settings = client.settings.get(message.guild.id);
  const level = client.points.get(message.author.id).level;
  const points = client.points.get(message.author.id).points;
  const pointsEmbed = new Discord.RichEmbed()
    .setColor(settings.embedColour)
    .setThumbail(message.author.avatarURL)
    .addField(message.author.username, `Level: ${level}\n${points}`);
};

exports.cmdConfig = {
  name: "points",
  aliases: ['point', 'level', 'levels'],
  description: "Displays a users points",
  usage: "points",
  type: "info"
};
