const Discord = require('discord.js');

exports.run = (client, message, args) => {
  const settings = client.settings.get(message.guild.id);
  var user = message.mentions.users.first() || message.author;
  let gpoints = client.gpoints.get(user.id).points || 1;
  let glevel = client.gpoints.get(user.id).level || 0;
  lety spoints = client.spoints.get(message.guild.id);
  const pointsEmbed = new Discord.RichEmbed()
    .setColor(settings.embedColour)
    .setThumbnail(user.avatarURL)
    .setAuthor(`${user.username}#${user.discriminator}`)
    .addField('Global Points', `Level: ${glevel}\nPoints: ${gpoints}`);
  return message.channel.send({embed: pointsEmbed});
};

exports.cmdConfig = {
  name: "points",
  aliases: ['point', 'level', 'levels'],
  description: "Displays a users points",
  usage: "points [@user]",
  type: "fun"
};
