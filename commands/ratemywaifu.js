const Discord = require('discord.js');
const search = require('image-search');

exports.run = (client, message, waifu) => {
  if (!waifu[0]) return message.channel.send(':negative_squared_cross_mark: You must tell me who your waifu is');
  waifu = waifu.join(' ');
  waifu = waifu.toLowerCase();
  const settings = client.settings.get(message.guild.id);
  let score = client.randomNum(1, 10);
  if (waifu === "blake" || waifu === "blake belledonna") score = 10;
  search.google('cats', function(err, images) {
    console.log(images);
  });
  const waifuEmbed = new Discord.RichEmbed()
    .setColor(settings.embedColour)
    .addField(waifu.toProperCase(), `${score} / 10`);
  message.channel.send({embed: waifuEmbed});
};

exports.cmdConfig = {
  name: "ratemywaifu",
  aliases: ['waifu'],
  description: "Gives your waifu a score out of 10.",
  usage: "ratemywaifu <waifu>",
  type: "fun"
};
