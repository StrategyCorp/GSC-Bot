const Discord = require('discord.js');
const request = require('request');
const md5 = require('md5');

exports.run = (client, message, waifu) => {
  if (!waifu[0]) return message.channel.send(':negative_squared_cross_mark: You must tell me who your waifu is');
  waifu = waifu.join(' ').toLowerCase();
  const settings = client.settings.get(message.guild.id);
  var score = md5(waifu.toLowerCase()).replace(/\D/g,'');
  score = 10 - parseInt(score.charAt(0));
  if (waifu === "blake" || waifu === "blake belladonna") score = 10;
  var url = `https://api.qwant.com/api/search/images?count=1&offset=1&q=anime ` + waifu;
  request.get({
      url: url,
      json: true,
      headers: {'User-Agent': 'request'}
    }, (err, res, data) => {
      if (err) {
        return message.channel.send(':negative_squared_cross_mark: Error: ' + err);
      } else if (res.statusCode !== 200) {
        return message.channel.send(':negative_squared_cross_mark: Status: ' + res.statusCode);
      } else {
        var image = data.data.result["items"].length > 0 ? data.data.result.items[0].media : null;
      }
    const waifuEmbed = new Discord.RichEmbed()
      .setColor(settings.embedColour)
      .addField(waifu.toProperCase(), `${score} / 10`);
    if (image !== null) waifuEmbed.setImage(image);
    return message.channel.send({embed: waifuEmbed});
  });
};

exports.cmdConfig = {
  name: "ratemywaifu",
  aliases: ['waifu', 'ratemyhusbando', 'husbando'],
  description: "Gives your waifu a score out of 10.",
  usage: "ratemywaifu <waifu>",
  type: "fun"
};
