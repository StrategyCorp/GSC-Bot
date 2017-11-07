const Discord = require('discord.js');

exports.run = (client, message, args) => {
  let manageMessages = message.member.hasPermission("KICK_MEMBERS");
  if (manageMessages === false) return message.channel.send(':negative_squared_cross_mark: You do not have permission. You need \`KICK_MEMBERS\`');
  let user = message.mentions.users.first();
  if (message.mentions.users.size < 1) return message.channel.send(':negative_squared_cross_mark: You must mention someone to kick them').catch(console.error);
  let reason = args.slice(1).join(' ');
  if (!reason) reason = "/shrug";
  if (!message.guild.member(user).kickable) return message.channel.send(':negative_squared_cross_mark: I cannot kick that member');
  let modlog = client.channels.find('name', 'mod-log');
  message.guild.member(user).kick();
  if (!modlog) {
    return message.channel.send(`:negative_squared_cross_mark: \`${user.username}\` was kicked but i couldn't log it because you don't have a channel named \`mod-log\``);
  } else {
    const settings = client.settings.get(message.guild.id);
    const kickEmbed = new Discord.RichEmbed()
    .setColor(settings.embedColour)
    .setThumbnail(user.avatarURL)
    .setTimestamp()
    .addField('Action: kick', `User: ${user.username}#${user.discriminator} (${user.id})\nModrator: ${message.author.username}#${message.author.discriminator} (${message.author.id})\nReason: ${reason}`);
  return client.channels.get(modlog.id).send({embed: kickEmbed});
  }
};

exports.cmdConfig = {
  name: "kick",
  aliases: [],
  description: "Kicks the mentioned user",
  usage: "kick <@user> [reason]",
  type: "mod"
};
