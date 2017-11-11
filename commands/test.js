const Discord = require('discord.js');
const request = require('request');
const crypto = require('crypto');

exports.run = (client, message, args) => {
  const devID = process.env.SMITEDEVID;
  const authKey = process.env.SMITEAUTHKEY;
  let method = 'getplayerstatus';
  let signature;
  let url = `http://api.smitegame.com/smiteapi.svc/${method}json/${devID}/`;
}

exports.cmdConfig = {
  name: "test",
  aliases: [],
  description: "test, go away",
  usage: "test",
  type: "client"
};
