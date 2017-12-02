const request = require('request');
const meme = require('../data/memes.json');

exports.run = (client, message, [search, ...args]) => {
  if (search === "list") {
    var list = Object.keys(meme.inbuild).sort();
    list = client.chunkArray(list, 25);
    let pageNumber = args[0] ? (/^\d+$/.test(args[0]) ? args[0] : 1) : 1;
    if (pageNumber > list.length) pageNumber = list.length;
    return message.channel.send(`**Page Number ${pageNumber} of ${list.length}**\n${list[pageNumber - 1].join(', ')}`);
  }
  let url = 'https://memegen.link/buzz/memes/memes_everywhere';
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
      return message.channel.send({'files': [data.direct.masked]});
    }
  });
};

exports.cmdConfig = {
  name: "memes",
  aliases: ['meme'],
  description: "Makes a memes.",
  usage: "memes",
  type: "fun"
};
