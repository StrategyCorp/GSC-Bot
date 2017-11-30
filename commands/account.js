// get the discord.js lib so that we can actually do stuff
const Discord = require('discord.js');

// just a standard setup
exports.run = (client, message, args) => {
  
  // i know there is like 1000 better ways of doing this but this is the lazy way so it is the one i chose
  // first we are checking to see if the user has mentioned anybody
  if (message.mentions.users.size === 0) {
    
    // we want to user object to be the message authors
    var user = message.author
    
    // we want the guild member object to also be the message authors
    var usergm = message.member;
    
  // if somebody was mentioned . . .
  } else {
    
    // the user object will be whomever the user mentioned
    var user = message.mentions.users.first();
    
    // the guild member object will also be whomever they mentioned
    var usergm = message.guild.member(message.mentions.users.first());
  }
  
  // now we check to see if they have any roles
  // not
  if (usergm.roles.array().length === 1) {
    var colour = "#FFFFFF";
    var roleNumber = "Role [0]";
    var roleArray = "no roles yet . . .";
  } else {
    var colour = usergm.highestRole.hexColor;
    var roleNumber = `Role [${usergm.roles.array().length - 1}]`;
    var roleArray = usergm.roles.filter(r => r.id !== message.guild.id).map(role => role.name).join(', ');
  }
  // const statusColours = {
  //   online: 0x23DF49,
  //   idle: 0xffe523,
  //   dnd: 0xff1414,
  //   streaming: 0x930de0,
  //   offline: 0x0,
  // };
  const accEmbed = new Discord.RichEmbed()
    // .setColor(statusColours[user.presence.status])
    .setColor(colour)
    .setThumbnail(user.avatarURL)
    .setAuthor(`${user.username}#${user.discriminator}`, user.avatarURL)
    .addField('ID', user.id)
    .addField('Status', user.presence.status)
    .addField('Account Created', user.createdAt.toUTCString())
    .addField('Date Joined Server', usergm.joinedAt.toUTCString())
    .addField('Nickname', usergm.displayName)
    .addField(roleNumber, roleArray);
  message.channel.send({embed: accEmbed});
};

exports.cmdConfig = {
  name: "account",
  aliases: ['acc'],
  description: "Displays infomation about a person.",
  usage: "account [@user]",
  type: "info"
};