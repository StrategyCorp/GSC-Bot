const Discord = require('discord.js');

exports.run = (client, message, waifu) => {
  if (!waifu) return message.channel.send(':negative_squared_cross_mark: You must tell me who your waifu is');
  const settings = client.settings.get(message.guild.id);
  let score = client.randomNum(1, 10)
  const waifuEmbed = new Discord.RichEmbed()
    .setColor(settings.embedColour)
    .addField(waifu, score);
  message.channel.send({embed: waifuEmbed});
};

exports.cmdConfig = {
  name: "ratemywaifu",
  aliases: ['waifu'],
  description: "Gives your waifu a score out of 10.",
  usage: "ratemywaifu <waifu>",
  type: "fun"
};
