const Discord = require('discord.js');
const request = require('request');
// const crypto = require('crypto');
const md5 = require('md5');
const moment = require('moment');

exports.run = (client, message, args) => {
  let playerName = 'Gazder';
  const devID = process.env.SMITEDEVID;
  const authKey = process.env.SMITEAUTHID;
  let method = 'getplayerstatus';
  let timestamp = moment().format('YYYYMMDDHHmmss');
  let signature = `${devID}createsession${authKey}${timestamp}`;
  console.log(signature)
  signature = md5(signature);
  console.log(signature);
  let createsession = `http://api.smitegame.com/smiteapi.svc/createsessionJson/${devID}/${signature}/${timestamp}`;
  let url = `http://api.smitegame.com/smiteapi.svc/${method}json/${devID}/${signature}/${timestamp}/${playerName}`;
  request.get({
    url: createsession,
    json: true,
    headers: {'User-Agent': 'request'}
  }, (err, res, data) => {
    if (err) {
      return message.channel.send(':negative_squared_cross_mark: Error:', err);
    } else if (res.statusCode !== 200) {
      return message.channel.send(':negative_squared_cross_mark: Status:', res.statusCode);
    } else {
      var sessionID = data.session_id;
    }
  });
}

exports.cmdConfig = {
  name: "test",
  aliases: [],
  description: "test, go away",
  usage: "test",
  type: "client"
};
