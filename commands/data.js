var fs = require('fs');
module.exports.run = async (bot, message, args) => {
var user = message.mentions.members.first();

  fs.appendFile(`${user}`,"\n")
  var date = new Date();
  var dataf = date+args;
  var datafs = dataf.replace(/,/g," ");
  message.channel.send(`${user} Data Has been saved with this data \n ${datafs}`);
  fs.appendFile(`${user}`, datafs , function (err) {
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