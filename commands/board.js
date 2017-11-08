const Discord = require('discord.js');

exports.run = (client, message, [search, ...note]) => {
  const settings = client.settings.get(message.guild.id);
  const board = client.board.get(message.guild.id);
  if (search === "view") {
    if (!board) return message.channel.send(':negative_squared_cross_mark: You have no notes!')
    const boardEmbed = new Discord.RichEmbed()
      .setColor(settings.embedColour)
      .addField(`${message.guild.name}'s Message Board`, );
    message.channel.send({embed: boardEmbed});
  } else if (search === "add") {
    
  }
};

exports.cmdConfig = {
  name: "board",
  aliases: [],
  description: "WIP",
  usage: "board",
  type: "info"
};
