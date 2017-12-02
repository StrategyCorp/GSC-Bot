const Discord = require('discord.js');

exports.run = (client, message, args) => {
  const settings = client.settings.get(message.guild.id);
  var user = message.mentions.users.first() || message.author;
  let globalPoints = client.gpoints.get(user.id).points;
  let globalLevel = client.gpoints.get(user.id).level;
  if (!globalPoints) {
    globalPoints = 1;
    globalLevel = 0;
  }
  const pointsEmbed = new Discord.RichEmbed()
    .setColor(settings.embedColour)
    .setThumbnail(user.avatarURL)
    .setAuthor(`${user.username}#${user.discriminator}`)
    .addField('Global Points', `Level: ${globalLevel}\nPoints: ${globalPoints}`);
  return message.channel.send({embed: pointsEmbed});
};

exports.cmdConfig = {
  name: "points",
  aliases: ['point', 'level', 'levels'],
  description: "Displays a users points",
  usage: "points [@user]",
  type: "fun"
};
