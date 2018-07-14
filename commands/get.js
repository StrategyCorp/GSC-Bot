var fs = require('fs');
module.exports.run = async (bot, message, args) => {
if(message.member.roles.find("name", "GSC")){
var userg= message.mentions.members.first();
fs.readFile(`/app/${userg}`, 'utf8', function (err,data) {
if (err) {
    return console.log(err);
  }
  message.channel.send(data);
});

}else{
  message.channel.send(`${message.author} You do not have the required permissions to do this!`);
}}
exports.cmdConfig = {
  name: "get",
  aliases: ['g','get', 'info'],
  description: "Gets GSC user info",
  usage: "!get <user>",
  type: "gsc"
};