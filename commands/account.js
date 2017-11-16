const Discord = require('discord.js');

exports.run = (client, message, args) => {
  let user;
  let usergm;
  if (message.mentions.users.size === 0) {
    user = message.author
    usergm = message.member;
  } else {
    user = message.mentions.users.first();
    usergm = message.guild.member(message.mentions.users.first());
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
    .setThumbnail(user.avatarURL)
    .setAuthor(`${user.username}#${user.discriminator}`, user.avatarURL)
    .addField('ID', user.id)
    .addField('Status', user.presence.status)
    .addField('Account Created', user.createdAt.toUTCString())
    .addField('Date Joined Server', usergm.joinedAt.toUTCString())
    .addField('Nickname', usergm.displayName)
    .addField(`Role [${usergm.roles.array().length - 1}]`, usergm.roles.filter(r => r.id !== message.guild.id).map(role => role.name).join(', '));
  message.channel.send({embed: accEmbed});
};

exports.cmdConfig = {
  name: "account",
  aliases: ['acc'],
  description: "Displays infomation about a person.",
  usage: "account [@user]",
  type: "info"
};