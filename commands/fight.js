exports.run = (client, message, args) => {
  if (client.fight[message.author.id].active === true) return message.channel.send(`:negative_squared_cross_mark: A fight is already taking place between **${client.fight[message.author.id].first}**`)
  let rounds = args[0] ? (/^\d+$/.test(args[0]) ? (1 < args[0] ? (20 > args[0] ? args[0] : 3) : 3) : 3) : 3;
  let user = message.mentions.users.first();
  if (user.id === message.author.id) return message.channel.send(':negative_squared_cross_mark: You may not fight yourself');
  if (message.mentions.users.size < 1) return message.channel.send(':negative_squared_cross_mark: You must mention someone to fight them');
  message.channel.send(`**${message.author.username}** has challenged **${user.username}** to a fight for **${rounds}** rounds, <@${user.id}> do you accept? (yes/no)`);
  const startCollector = message.channel.createMessageCollector(message => message);
  startCollector.on('collect', m => {
    if (m.content.startsWith('no') && m.author.id === user.id) {
      startCollector.stop();
      return message.channel.send('ended');
    } else if (m.content.startsWith('yes') && m.author.id === user.id) {
      message.channel.send('The fight will now commence! Both parties need to say `roll` to get their scores for the round');
      client.fight[message.guild.id] = {
        active: true,
        first: message.author.id,
        second: user.id,
        rounds: rounds,
        round: 1,
        score: [0, 0]
      }
      const collector = message.channel.createMessageCollector(message => message);
      collector.on('collect', msg => {
        
      });
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
