const request = require("request");

exports.run = (client, message, [search, ...args]) => {
  if (!search) {
    return message.channel.send('HELP WIP');
  } else if (search === "search") {
    var offset = args[args.length - 1];
    if (/^\d+$/.test(offset)) {
      args.pop();
      var q = args.join(' ');
    } else {
      var q = args.join(' ');
      offset = 1;
    }
    offset = offset - 1;
    const apiKey = process.env.GIPHY;
    var url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${q}&limit=25&offset=${offset}&rating=G&lang=en`;
  } else if (search === "trending") {
    
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
        let gif = data.data[0].embed_url;
        console.log(gif)
        // return message.channel.send({'files': [gif]});   
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
