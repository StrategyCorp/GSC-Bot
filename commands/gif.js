const request = require("request");
const Discord = require("discord.js");

exports.run = (client, message, [search, ...args]) => {
  const apiKey = process.env.GIPHY;
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
    var url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${q}&limit=25&offset=${offset}&rating=G&lang=en`;
  } else if (search === "trending") {
    var q = "Trending";
    if (/^\d+$/.test(args[0])) {
      var offset = args[0];
      if (offset > 24) offset = 25;
    } else {
      var offset = 1;
    }
    offset = offset - 1;
    var url = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=25&rating=G`;
  } else if (search === "random") {
    var q = args.join(' ');
    var url = `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}&tag=${q}&rating=G`;
  }
  const requestGif = async () => {
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
        let title = `**${q.toProperCase()}**`;
        let number = ` #${parseInt(offset) + 1}`;
        if (search === "search" || search === "trending") {
          var gif = data.data[offset].url
          title += number;
        } else {
          var gif = data.data.url;
        }
        return message.channel.send(`${title}\n${gif}`);
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
