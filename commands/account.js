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
  // note that @everybody counts as a role so even if they didn't have anyroles the .length would be equal to 1
  if (usergm.roles.array().length === 1) {
    
    // we are setting the colour of the highest role to be the side colour of the embed
    // if they don't have any roles we just make the side colour black
    var colour = "#FFFFFF";
    
    // we may have problems getting the length of the array later so i just made this
    var roleNumber = "Role [0]";
    
    // we don't want it to just be blank so we fill the space with this
    var roleArray = "no roles yet . . .";
    
  // this is if they have atleast 1 role that isn't @everybody
  } else {
    
    // so we want the colour to be the highest role
    var colour = usergm.highestRole.hexColor;
    
    // we make all of their roles into an array and get the length of it
    // we take one away because we don' want to include @everybody
    var roleNumber = `Role [${usergm.roles.array().length - 1}]`;
    
    // so this maybe a little hard to explain but bare with me
    // first we get all of the users roles in an object
    // then we filter it so it only shows roles from the server that we are in
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