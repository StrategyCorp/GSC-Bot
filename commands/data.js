var fs = require('fs');
module.exports.run = async (bot, message, args) => {
      let user = message.mentions.users.first()
      message.channel.send(user);

}

exports.cmdConfig = {
  name: "data",
  aliases: ['d','data', 'ort'],
  description: "Manages GSC User Data",
  usage: "!",
  type: "gsc"
};