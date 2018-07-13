var fs = require('fs');
module.exports.run = async (bot, message, args) => {
var userg= message.mentions.members.first();
fs.readFile(`/app/${userg}`, 'utf8', function (err,data) {
if (err) {
    return console.log(err);
  }
  message.channel.send(data);
});
}

exports.cmdConfig = {
  name: "get",
  aliases: ['g','get', 'info'],
  description: "Gets GSC user info",
  usage: "!get <user>",
  type: "gsc"
};