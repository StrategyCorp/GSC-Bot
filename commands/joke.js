const Discord = require('discord.js');

exports.run = (client, message, args) => {
  const settings = client.settings.get(message.guild.id);
  let jokeList = {
    "Why does everyone think Bacchus is so annoying?": "Because he's always whining",
    "What is Sol's favourite movie?": "Twilight: Breaking Down",
    "Why does everyone think that Xing Tian uses drugs?": "Because he's always Xing things."
  };
  let jokeArray = Object.keys(jokeList);
  if (jokeArray[parseInt(args)] !== undefined) {
    console.log("1");
  }
  return;
  var joke = jokeArray[Math.floor(Math.random() * jokeArray.length)];
  const jokeEmbed = new Discord.RichEmbed()
    .setColor(settings.embedColour)
    .addField(`:regional_indicator_q: ${joke}`, `:regional_indicator_a: ${jokeList[joke]}`)
    .setFooter(`#${jokeList[joke]}`);
  return message.channel.send({embed: jokeEmbed});
};

exports.cmdConfig = {
  name: "joke",
  aliases: ['tellmeajoke'],
  description: "Tells a random joke.",
  usage: "joke [jokenumber]",
  type: "fun"
};
