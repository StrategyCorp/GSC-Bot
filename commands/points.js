const Discord = require('discord.js');

exports.run = (client, message, args) => {
  let user = message.mentions.users.first();
  if (message.mentions.users.size < 1) user = message.author;
  let scorePoints = client.points.get(user.id).points;
  let scoreLevel = client.points.get(user.id).level;
  if (!scorePoints) {
    scorePoints = "0";
    scoreLevel = "0";
  }
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
  usage: "points [@user]",
  type: "info"
};