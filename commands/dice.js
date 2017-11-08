const Discord = require('discord.js');

exports.run = (client, message, sides) => {
  if (!sides) sides = 6;
  message.channel.send(`${Math.floor(Math.random() * sides)}`);
};

exports.cmdConfig = {
  name: "dice",
  aliases: ['roll', 'rtd', 'rolldice'],
  description: "Rolls a dice.",
  usage: "dice [sides]",
  type: "fun"
};
