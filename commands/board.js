const Discord = require('discord.js');

exports.run = (client, message, [search, ...note]) => {
  const settings = client.settings.get(message.guild.id);
  const board = client.board.get(message.guild.id);
  if (search === "view") {
    const boardEmbed = new Discord.RichEmbed()
      .setColor(settings.embedColour);
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
