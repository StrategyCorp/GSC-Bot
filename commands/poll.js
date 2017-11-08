const Discord = require('discord.js');

exports.run = async (client, message, [type, ...question]) => {
  let normalReact = ['0⃣', '1⃣', '2⃣', '3⃣', '4⃣', '5⃣', '6⃣', '6⃣', '7⃣', '8⃣', '9⃣'];
  message.channel.send('test').then(mReact => {
    for (const react of normalReact) {
      await mReact
    }
  })
};

exports.cmdConfig = {
  name: "poll",
  aliases: [],
  description: "Test.",
  usage: "poll <type> <question>",
  type: "fun"
};
