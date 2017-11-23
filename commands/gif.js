const request = require("request");

exports.run = (client, message, [search, ...args]) => {
  if (!search) {
    return message.channel.send('HELP WIP');
  } else if (search === "search") {
    let q = args.join(' ');
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
