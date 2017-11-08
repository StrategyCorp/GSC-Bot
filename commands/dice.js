const Discord = require('discord.js');

exports.run = (client, message, sides) => {
  if (!sides[0]) sides = 6;
  message.channel.send(`${client.randomNum(1, sides)}`);
};

exports.cmdConfig = {
  name: "dice",
  aliases: ['roll', 'rtd', 'rolldice'],
  description: "Rolls a dice.",
  usage: "dice [sides]",
  type: "fun"
};
