const Discord = require('discord.js');

exports.run = (client, message, args) => {
  const settings = client.settings.get(message.guild.id);
  let jokeList = {
    "EA": "1",
    "test": "2",
    "test 2": "3"
  };
  const jokeEmbed = new Discord.RichEmbed()
    .setColor(settings.embedColour);
  let isNan = parseInt(args);
  if (!args[0] || isNan !== isNan) {
    let jokeArray = Object.keys(jokeList);
    let joke = jokeArray[Math.floor(Math.random() * jokeArray.length)];
    jokeEmbed.addField(`${joke}`, `#${jokeList[joke]}`);
    return message.channel.send({embed: jokeEmbed});
  } else {
    
  }
};

exports.cmdConfig = {
  name: "joke",
  aliases: ['tellmeajoke'],
  description: "Tells a random joke.",
  usage: "joke[jokenumber]",
  type: "fun"
};
