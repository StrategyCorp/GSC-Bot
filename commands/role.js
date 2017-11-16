const Discord = require('discord.js');

exports.run = (client, message, args) => {
  let manageMessages = message.member.hasPermission("MANAGE_ROLES");
  if (manageMessages === false) return message.channel.send(':negative_squared_cross_mark: You do not have permission. You need \`MANAGE_ROLES\`');
  let user = message.mentions.users.first();
  if (message.mentions.users.size < 1) {
    let search = args[0];
    console.log("1");
  } else {
    let roleName = args.slice(1).join(' ');
    if (!roleName) return message.channel.send()
    let role = message.guild.roles.find("name", roleName);
    console.log(message.member.highestRole.comparePositionTo(role));
    //user.addRole(role);
  }
};

exports.cmdConfig = {
  name: "role",
  aliases: ['roles'],
  description: "Gives a user a role. Permission needed: MANAGE_ROLES.",
  usage: "roles <@user> <role>",
  type: "mod"
};
