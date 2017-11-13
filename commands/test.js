const Discord = require('discord.js');
const request = require('request');
const crypto = require('crypto');
const moment = require('moment');

exports.run = (client, message, args) => {
  let playerName = 'Gazder';
  const devID = process.env.SMITEDEVID;
  const authKey = process.env.SMITEAUTHKEY;
  let method = 'getplayerstatus';
  let timestamp = moment().format('yyyyMMddHHmmss');
  let signature = `${devID}createsession${authKey}${timestamp}`;
  let createsession = `http://api.smitegame.com/smiteapi.svc/createsessionJson/${devID}/${signature}/${timestamp}`;
  let url = `http://api.smitegame.com/smiteapi.svc/${method}json/${devID}/${signature}/${timestamp}/${playerName}`;
  console.log(timestamp);
  // request(createsession, function(error, response, body) {
  //   if (!error && response.statusCode === 200) {
  //     console.log(JSON.parse(body));
  //   } else {
  //     console.log(response.statusCode);
  //   }
  // })
}

exports.cmdConfig = {
  name: "test",
  aliases: [],
  description: "test, go away",
  usage: "test",
  type: "client"
};
