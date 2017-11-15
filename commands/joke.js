const Discord = require('discord.js');

exports.run = (client, message, args) => {
  const settings = client.settings.get(message.guild.id);
  let jokeList = {
    "EA": "1",
    "test": "2",
    "test 2": "3"
  };
  let isNan = parseInt(args);
  if (!args[0] || isNan !== isNan) {
    let jokeArray = Object.keys(jokeList);
    const joke = jokeArray[Math.floor(Math.random() * jokeArray.length)];
  } else {
    const joke = jokeList.getKeyByValue(args[0]);
  }
  const jokeEmbed = new Discord.RichEmbed()
    .setColor(settings.embedColour)
    .addField(`${joke}`, `#${jokeList[joke]}`);
  return message.channel.send({embed: jokeEmbed});
};

exports.cmdConfig = {
  name: "joke",
  aliases: ['tellmeajoke'],
  description: "Tells a random joke.",
  usage: "joke [jokenumber]",
  type: "fun"
};
