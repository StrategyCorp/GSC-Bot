const Discord = require('discord.js');

exports.run = (client, message, args) => {
  const settings = client.settings.get(message.guild.id);
  let user = message.mentions.users.first();
  if (message.mentions.users.size < 1) user = message.author;
  const points = client.points.get(user.id).points;
  const level = client.points.get(user.id).level;
  if (!points) {
    points = 1;
    level = 0;
  }
  const pointsEmbed = new Discord.RichEmbed()
    .setColor(settings.embedColour)
    .setThumbnail(message.author.avatarURL)
    .addField(message.author.username, `Level: ${level}\nPoints: ${points}`);
  message.channel.send({embed: pointsEmbed});
};

exports.cmdConfig = {
  name: "points",
  aliases: ['point', 'level', 'levels'],
  description: "Displays a users points",
  usage: "points [@user]",
  type: "fun"
};
