exports.run = (client, message, args) => {
  if (!args[0]) return message.channel.send(':negative_squared_cross_mark: You must say have many rounds you want it');
  let user = message.mentions.users.first();
  if (message.mentions.users.size < 1) return message.channel.send(':negative_squared_cross_mark: You must mention someone to challenge them');
  message.channel.send(`**${message.author.username}** has challenged **${user.username}** to a fight, <@${user.id}> do you accept? (yes/no)`);
  const collector = message.channel.createMessageCollector(message => message, {time: 15000});
  collector.on('collect', m => {
    if (m.content.startsWith('no')) {
      collector.stop();
      return message.channel.send('ended');
    } else if (m.content.startsWith('yes')) {
      return message.channel.send('▶ Resumed');
    }
  });
};

exports.cmdConfig = {
  name: "fight",
  aliases: [],
  description: "fight",
  usage: "fight <rounds> <@user>",
  type: "fun"
};
