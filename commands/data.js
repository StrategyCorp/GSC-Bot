var fs = require('fs');
module.exports.run = async (bot, message, args) => {
if(message.member.roles.find("name", "Data Admin")){
    
var user = message.mentions.members.first();

  fs.appendFile(`${user}`,"\n")
  var date = new Date();
  var dataf = date+args+`\` log from \`${message.author}`
  var datafs = dataf.replace(/,/g," ");
  message.channel.send(`${user} Data Has been saved with this data \n ${datafs}`);
  fs.appendFile(`${user}`, datafs , function (err) {
  if (err) throw err;
  console.log(`Saved! ${user}`);
});
}else{
  message.channel.send(`${message.author} You do not have the required permissions to do this!`);
}}
exports.cmdConfig = {
  name: "data",
  aliases: ['d','data', 'ort'],
  description: "Manages GSC User Data",
  usage: "!data <user> <data>",
  type: "gsc"
};