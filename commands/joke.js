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
  if (!args) {
    let jokeArray = Object.keys(jokeList);
    let joke = jokeArray[Math.floor(Math.random() * jokeArray.length)];
    jokeEmbed.addField(`${joke}`, `${}`)
  } else if (args !== args) {
    
  } else {
    
  }
};

exports.cmdConfig = {
  name: "joke",
  aliases: ['tellmeajoke'],
  description: "Tells a random joke.",
  usage: "joke",
  type: "fun"
};
