var fs = require('fs');
module.exports.run = async (bot, message, args) => {
var user = message.mentions.members.first();
message.channel.send(`${user} Data Has been saved with a timestamp and ${args}`);
  fs.appendFile(`$"\n")
  fs.appendFile(`${user}`, new Date(), function (err) {
  if (err) throw err;
  console.log(`Saved! ${user}`);
});
}

exports.cmdConfig = {
  name: "data",
  aliases: ['d','data', 'ort'],
  description: "Manages GSC User Data",
  usage: "!",
  type: "gsc"
};