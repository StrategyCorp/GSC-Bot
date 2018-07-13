var fs = require('fs');
module.exports.run = async (bot, message, args) => {
var user= message.mentions.members.first();
var data =  fs.readFile(`${user}`)

}

exports.cmdConfig = {
  name: "data",
  aliases: ['d','data', 'ort'],
  description: "Manages GSC User Data",
  usage: "!",
  type: "gsc"
};