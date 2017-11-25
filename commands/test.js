const Discord = require('discord.js');
const request = require('request');
const md5 = require('md5');
const moment = require('moment');

exports.run = (client, message, args) => {
  const domain = "http://api.smitegame.com/smiteapi.svc/";
  const devID = process.env.SMITEDEVID;
  const authKey = process.env.SMITEAUTHID;
  let timestamp = moment().format('YYYYMMDDHHmmss');
  let signature = `${devID}createsession${authKey}${timestamp}`;
  signature = md5(signature);
  let createSessionUrl = domain + `createsessionJson/${devID}/${signature}/${timestamp}`;
  const createSession = async (url) => {
    request.get({
      url: url,
      json: true,
      headers: {'User-Agent': 'request'}
    }, (err, res, data) => {
      if (err) {
        return message.channel.send(':negative_squared_cross_mark: Error:' + err);
      } else if (res.statusCode !== 200) {
        return message.channel.send(':negative_squared_cross_mark: Status:' + res.statusCode);
      } else {
        var session = data.session_id;
      }
    });
  }
  
  let session = client.session;
  let testSessionUrl = domain + `testsessionJson/${devID}/${signature}/${session}/${timestamp}`;
  const testSession = async (url) => {
    
  }
  
  let method = 'getplayerstatus';
  let playerName = 'Gazder';
  let url = domain + `${method}json/${devID}/${signature}/${timestamp}/${playerName}`;
}

exports.cmdConfig = {
  name: "test",
  aliases: [],
  description: "test, go away",
  usage: "test",
  type: "client"
};
