const request = require("request");

exports.run = (client, message, [search, ...args]) => {
  if (!search) {
    return message.channel.send('HELP WIP');
  } else if (search === "search") {
    let lastItem = args[args.length - 1];
    if (/^\d+$/.test(lastItem)) {
      var q = args.splice(-1, 1).join(' ');
    } else {
      var q = args.join(' ');
      lastItem = 1;
    }
    console.log(q);
    console.log(lastItem);
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
