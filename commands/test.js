const Discord = require('discord.js');
const request = require('request');
const md5 = require('md5');
const moment = require('moment');

exports.run = async (client, message, args) => {
  let session = client.session.get("sessionID");
  const domain = "http://api.smitegame.com/smiteapi.svc/";
  const devID = process.env.SMITEDEVID;
  let timestamp = moment().format('YYYYMMDDHHmmss');
  const authKey = process.env.SMITEAUTHID;
  let signature = `${devID}createsession${authKey}${timestamp}`;
  signature = md5(signature);
  const testSession = async () => {
    request.get({
      url: domain + `testsessionJson/${devID}/${signature}/${session}/${timestamp}`,
      json: true,
      headers: {'User-Agent': 'request'}
    }, (err, res, data) => {
      if (err) {
        return message.channel.send(':negative_squared_cross_mark: Error:' + err);
      } else if (res.statusCode !== 200) {
        return message.channel.send(':negative_squared_cross_mark: Status:' + res.statusCode);
      } else {
        console.log(data);
        if (Object.prototype.toString.call(data) === "[object String]") {
          console.log("1");
        } else {
          console.log("2");
        }
      }
    });
  }
  const createSession = async () => {
    request.get({
      url: domain + `createsessionJson/${devID}/${signature}/${timestamp}`,
      json: true,
      headers: {'User-Agent': 'request'}
    }, (err, res, data) => {
      if (err) {
        return message.channel.send(':negative_squared_cross_mark: Error:' + err);
      } else if (res.statusCode !== 200) {
        return message.channel.send(':negative_squared_cross_mark: Status:' + res.statusCode);
      } else {
        client.session.set("sessionID", data.session_id);
      }
    });
  }
  // testSession();
  createSession();
}

exports.cmdConfig = {
  name: "test",
  aliases: [],
  description: "test, go away",
  usage: "test",
  type: "client"
};
