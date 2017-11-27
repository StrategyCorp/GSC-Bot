const Discord = require('discord.js');
const request = require('request');
const md5 = require('md5');
const moment = require('moment');

exports.run = async (client, message, [search, ...args]) => {
  let session = client.session.get("sessionID");
  const domain = "http://api.smitegame.com/smiteapi.svc/";
  const devID = process.env.SMITEDEVID;
  let timestamp = moment().format('YYYYMMDDHHmmss');
  const authKey = process.env.SMITEAUTHID;
  const testSession = async () => {
    var method = "testsession";
    let signature = `${devID}${method}${authKey}${timestamp}`;
    signature = md5(signature);
    request.get({
      url: domain + `${method}Json/${devID}/${signature}/${session}/${timestamp}`,
      json: true,
      headers: {'User-Agent': 'request'}
    }, (err, res, data) => {
      if (err) {
        return message.channel.send(':negative_squared_cross_mark: Error:' + err);
      } else if (res.statusCode !== 200) {
        return message.channel.send(':negative_squared_cross_mark: Status:' + res.statusCode);
      } else {
        console.log(data);
        let message = data.split(' ');
        message = message[0] + message[1] + message[2];
        console.log(message);
        if (message === "Invalidsessionid.") {
          createSession();
          console.log("1");
        } else {
          console.log("2");
        }
      }
    });
  };
  const createSession = async () => {
    var method = "createsession";
    let signature = `${devID}${method}${authKey}${timestamp}`;
    signature = md5(signature);
    request.get({
      url: domain + `${method}Json/${devID}/${signature}/${timestamp}`,
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
  };
  // testSession();
  
  if (search === "getdataused") {
    const getDataUsed = async () => {
      var signature = createSignature("getdataused");
      console.log(signature);
    };
  }
  
  function createSignature(method) {
    let signature = `${devID}${method}${authKey}${timestamp}`;
    signature = md5(signature);
  }
}

exports.cmdConfig = {
  name: "test",
  aliases: [],
  description: "test, go away",
  usage: "test",
  type: "client"
};
