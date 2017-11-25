const request = require("request");
const Discord = require("discord.js");

exports.run = (client, message, [search, ...args]) => {
  if (!search) {
    return message.channel.send('HELP WIP');
  } else if (search === "search") {
    var offset = args[args.length - 1];
    if (/^\d+$/.test(offset)) {
      args.pop();
      if (offset > 24) offset = 25;
    } else {
      offset = 1;
    }
    var q = args.join(' ');
    offset = offset - 1;
    const apiKey = process.env.GIPHY;
    var url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${q}&limit=25&offset=${offset}&rating=G&lang=en`;
  } else if (search === "trending") {
    if (/^\d+$/.test(args[0])) {
      
    }
  } else if (search === "random") {
    
  }
  const requestGif = async () => {
    request.get({
      url: url,
      json: true,
      headers: {'User-Agent': 'request'}
    }, (err, res, data) => {
      if (err) {
        return message.channel.send(':negative_squared_cross_mark: Error:', err);
      } else if (res.statusCode !== 200) {
        return message.channel.send(':negative_squared_cross_mark: Status:', res.statusCode);
      } else {
        return message.channel.send(`**${q.toProperCase()}** #${parseInt(offset) + 1}\n${data.data[offset].embed_url}`);
      }
    });
  };
  requestGif();
};

exports.cmdConfig = {
  name: "gif",
  aliases: ['giphy'],
  description: "Searches giphy for a gif.",
  usage: "gif",
  type: "fun"
};
