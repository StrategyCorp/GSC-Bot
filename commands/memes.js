const request = require('request');

exports.run = (client, message, [search, ...args]) => {
  request.get()
};

exports.cmdConfig = {
  name: "memes",
  aliases: ['meme'],
  description: "Makes a memes.",
  usage: "memes",
  type: "fun"
};
