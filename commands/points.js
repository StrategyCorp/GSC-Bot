const Discord = require('discord.js');

exports.run = (client, message, args) => {
  let scorePoints = client.points.get(message.author.id).points;
  let scoreLevel = client.points.get(message.author.id).level;
  const settings = client.settings.get(message.guild.id);
  const pointsEmbed = new Discord.RichEmbed()
    .setColor(settings.embedColour)
    .setThumbnail(message.author.avatarURL)
    .addField(`${message.author.username}`, `Level: ${scoreLevel}\nPoints: ${scorePoints}`);
  message.channel.send({embed: pointsEmbed});
};

exports.cmdConfig = {
  name: "points",
  aliases: ['point', 'level', 'levels'],
  description: "Displays a users points",
  usage: "points",
  type: "info"
};