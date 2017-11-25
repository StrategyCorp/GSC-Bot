const request = require("request");

exports.run = (client, message, [search, ...args]) => {
  if (!search) {
    return message.channel.send('HELP WIP');
  } else if (search === "search") {
    let offset = args[args.length - 1];
    if (/^\d+$/.test(offset)) {
      args.pop();
      var q = args.join(' ');
    } else {
      var q = args.join(' ');
      offset = 1;
    }
    offset = offset - 1;
    const apiKey = process.env.GIPHY;
    let url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${q}&limit=25&offset=${offset}&rating=G&lang=en`;
  } else if (search === "trending") {
    
  } else if (search === "random") {
    
  }
  const requestGif = async (endpoint, parameters) => {
    let url = `https://api.giphy.com/v1/gifs/${endpoint}?api_key=MnPQGrZvaZGPbYCdeAfT4RRuI6KPToYb${parameters}`;
  };
};

exports.cmdConfig = {
  name: "gif",
  aliases: ['giphy'],
  description: "Searches giphy for a gif.",
  usage: "gif",
  type: "fun"
};
