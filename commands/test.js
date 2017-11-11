const Discord = require('discord.js');
const request = require('request');
const crypto = require('crypto');
const moment = require('moment');

exports.run = (client, message, args) => {
  const devID = process.env.SMITEDEVID;
  const authKey = process.env.SMITEAUTHKEY;
  let method = 'getplayerstatus';
  let signature = `${devID}createsession${authKey}${moment().format('yyyyMMddHHmmss')}`;
  let createsession = `http://api.smitegame.com/smiteapi.svc/createsessionJson/${devID}/${authKey}`;
  let url = `http://api.smitegame.com/smiteapi.svc/${method}json/${devID}/${signature}/`;
}

exports.cmdConfig = {
  name: "test",
  aliases: [],
  description: "test, go away",
  usage: "test",
  type: "client"
};
