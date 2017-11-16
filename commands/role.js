const Discord = require('discord.js');

exports.run = (client, message, args) => {
  let manageMessages = message.member.hasPermission("KICK_MEMBERS");
  if (manageMessages === false) return message.channel.send(':negative_squared_cross_mark: You do not have permission. You need \`KICK_MEMBERS\`');
  let user = message.mentions.users.first();
  if (message.mentions.users.size < 1) return message.channel.send(':negative_squared_cross_mark: You must mention someone to kick them').catch(console.error);
};

exports.cmdConfig = {
  name: "role",
  aliases: ['roles'],
  description: "Gives a user a role. Permission needed: KICK_MEMBERS.",
  usage: "roles <@user> <role>",
  type: "mod"
};
