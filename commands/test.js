const Discord = require('discord.js');
const request = require('request');

exports.run = (client, message, args) => {
  const devID = process.env.SMITEDEVID;
  const authKey = process.env.SMITEAUTHKEY;
}

exports.cmdConfig = {
  name: "test",
  aliases: [],
  description: "test, go away",
  usage: "test",
  type: "client"
};
