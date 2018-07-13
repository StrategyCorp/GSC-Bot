const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
      const sayMessage = args.join(" ");
      message.delete().catch();
      bot.channels.get('467136562166235156').sendMessage(sayMessage)

}

exports.cmdConfig = {
  name: "say",
  aliases: ['s','announce', 'a'],
  description: "Creates an announcement on the announcements channel",
  usage: "!say <announcement>  \nAliases: s, announce, a",
  type: "gsc"
};