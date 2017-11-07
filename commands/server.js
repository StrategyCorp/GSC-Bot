const Discord = require('discord.js');

exports.run = (client, message, args) => {
  if (message.guild.available === true) {
    const settings = client.settings.get(message.guild.id);
    const serverEmbed = new Discord.RichEmbed()
      .setColor(settings.embedColour)
      .setThumbnail(message.guild.iconURL)
      .addField(message.guild.name, `ID: ${message.guild.id}\nRegion: ${message.guild.region}\n`)
      .addField('Id', message.guild.id)
      .addField('Region', message.guild.region)
      .addField('Age', message.guild.createdAt.toUTCString())
      .addField('Member Count', message.guild.memberCount)
      .addField('Owner', `Name: ${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}\nOwner ID: ${message.guild.ownerID}`);
    message.channel.send({embed: serverEmbed});
  } else {
    message.channel.send(':negative_squared_cross_mark: Guild is not available?');
  }
};

exports.cmdConfig = {
  name: "avatar",
  aliases: ['ava'],
  description: "Displays a users avatar.",
  usage: "avatar [@user]",
  type: "info"
};