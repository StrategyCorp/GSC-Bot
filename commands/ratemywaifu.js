const Discord = require('discord.js');
const request = require('request');

exports.run = (client, message, waifu) => {
  if (!waifu[0]) return message.channel.send(':negative_squared_cross_mark: You must tell me who your waifu is');
  waifu = waifu.join(' ');
  waifu = waifu.toLowerCase();
  const settings = client.settings.get(message.guild.id);
  let score = client.randomNum(1, 10);
  if (waifu === "blake" || waifu === "blake belledonna") score = 10;
  let url = `https://api.qwant.com/api/search/images?count=1&offset=1&q=anime ` + waifu;
  request.get({
      url: url,
      json: true,
      headers: {'User-Agent': 'request'}
    }, (err, res, data) => {
      if (err) {
        console.log('Error:', err);
      } else if (res.statusCode !== 200) {
        console.log('Status:', res.statusCode);
      } else {
        let image = data.data.result.media;
        console.log(image);
      }
  });
  //   const waifuEmbed = new Discord.RichEmbed()
  //   .setColor(settings.embedColour)
  //   .addField(waifu.toProperCase(), `${score} / 10`);
  // message.channel.send({embed: waifuEmbed});
};

exports.cmdConfig = {
  name: "ratemywaifu",
  aliases: ['waifu'],
  description: "Gives your waifu a score out of 10.",
  usage: "ratemywaifu <waifu>",
  type: "fun"
};
