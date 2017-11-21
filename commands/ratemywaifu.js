const Discord = require('discord.js');
const giSearch = require('google-image-search');
const fs = require('fs');

exports.run = async (client, message, waifu) => {
  if (!waifu[0]) return message.channel.send(':negative_squared_cross_mark: You must tell me who your waifu is');
  waifu = waifu.join(' ');
  waifu = waifu.toLowerCase();
  const settings = client.settings.get(message.guild.id);
  let score = client.randomNum(1, 10);
  if (waifu === "blake" || waifu === "blake belledonna") score = 10;
  giSearch(waifu).pipe(fs.createWriteStream('waifu.jpg'));
  // const waifuEmbed = new Discord.RichEmbed()
  //   .setColor(settings.embedColour)
  //   .addField(waifu.toProperCase(), `${score} / 10`);
  // message.channel.send({embed: waifuEmbed});
  message.channel.send({file: waifu.jpg});
};

exports.cmdConfig = {
  name: "ratemywaifu",
  aliases: ['waifu'],
  description: "Gives your waifu a score out of 10.",
  usage: "ratemywaifu <waifu>",
  type: "fun"
};
