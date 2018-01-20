exports.run = (client, message, args) => {
  let rounds = args[0] ? (/^\d+$/.test(args[0]) ? (1 < args[0] ? (20 > args[0] ? args[0] : 3) : 3) : 3) : 3;
  let user = message.mentions.users.first();
  if (user.id === message.author.id) return message.channel.send(':negative_squared_cross_mark: You may not fight yourself');
  if (message.mentions.users.size < 1) return message.channel.send(':negative_squared_cross_mark: You must mention someone to fight them');
  message.channel.send(`**${message.author.username}** has challenged **${user.username}** to a fight, <@${user.id}> do you accept? (yes/no)`);
  const collector = message.channel.createMessageCollector(message => message);
  collector.on('collect', m => {
    if (m.content.startsWith('no') && m.author.id === user.id) {
      collector.stop();
      return message.channel.send('ended');
    } else if (m.content.startsWith('yes') && m.author.id === user.id) {
      message.channel.send('The fight will now commence! Both parties need to say `roll` to get their scores for the round');
    }
  });
};

exports.cmdConfig = {
  name: "fight",
  aliases: [],
  description: "fight",
  usage: "fight [rounds] <@user>",
  type: "fun"
};
