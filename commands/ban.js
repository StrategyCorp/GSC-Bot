// get the discord.js lib so that we can actually do stuff
const Discord = require('discord.js');

// just the standard
exports.run = (client, message, args) => {
  
  // we want to know if the person that is trying to ban has the ban permission
  // we are going to make it into a variable just because we can; i don't know
  let hasPermission = message.member.hasPermission("BAN_MEMBERS");
  
  // we are going to check if they have the permission
  // if they don't then we return a message saying they don't have permission
  if (hasPermission === false) return message.channel.send(':negative_squared_cross_mark: You do not have permission. You need \`BAN_MEMBERS\`');
  
  // 
  let user = message.mentions.users.first();
  if (message.mentions.users.size < 1) return message.channel.send(':negative_squared_cross_mark: You must mention someone to ban them');
  let reason = args.slice(1).join(' ');
  if (!reason) reason = "/shrug";
  if (!message.guild.member(user).bannable) return message.channel.send(':negative_squared_cross_mark: I cannot ban that member, their role might be higher than mine');
  message.guild.ban(user, 2);
  const settings = client.settings.get(message.guild.id);
  if (settings.modlogEnable !== "true") return;
  let modlog = client.channels.find("name", settings.modlogChannel);
  if (!modlog) return message.channel.send(`:negative_squared_cross_mark: I couldn't find a modlog channel by the name of \`${settings.modlogChannel}\``);
  const banEmbed = new Discord.RichEmbed()
    .setColor(settings.embedColour)
    .setThumbnail(user.avatarURL)
    .setTimestamp()
    .addField('Action: ban', `User: ${user.username}#${user.discriminator} (${user.id})\nModrator: ${message.author.username}#${message.author.discriminator} (${message.author.id})\nReason: ${reason}`);
  return client.channels.find("name", settings.modlogChannel).send({embed: banEmbed});
};

exports.cmdConfig = {
  name: "ban",
  aliases: ['vac'],
  description: "Bans the mentioned user and deletes their messages from the last 2 days. Permission needed: BAN_MEMBERS.",
  usage: "Ban <@user> [reason]",
  type: "mod"
};
