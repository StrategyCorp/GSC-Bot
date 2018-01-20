exports.run = (client, message, args) => {
  if (!client.hasOwnProperty('fight')) client.fight = {};
  if (!client.fight.hasOwnProperty(message.guild.id)) {client.fight[message.guild.id] = {active: false};};
  console.log(client.fight[message.guild.id]);
  if (client.fight[message.guild.id].active === true) return message.channel.send(`:negative_squared_cross_mark: A fight is already taking place between **${client.users.get(client.fight[message.guild.id].first).username}** and **${client.users.get(client.fight[message.guild.id].second).username}**. We don't want it to be a bloodbath, do we?`);
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
        firstScore: null,
        second: user.id,
        secondScore: null,
        rounds: rounds,
        round: 1,
        score: [0, 0]
      };
      console.log(client.fight[message.guild.id]);
      const collector = message.channel.createMessageCollector(message => message);
      collector.on('collect', msg => {
        if (msg.content.startsWith('roll') && (msg.author.id === client.fight[message.guild.id].first || msg.author.id === client.fight[message.guild.id].second)) {
          let person = msg.author.id === client.fight[message.guild.id].first ? 'first' : 'second';
          if (client.fight[message.guild.id][person + 'Score'] === null) {
            let score = client.randomNum(1, 100);
            client.fight[message.guild.id][person + 'Score'] = score;
            message.channel.send(`**${msg.author.username}** has rolled \`${score}\``);
            console.log(client.fight[message.guild.id]);
          } else {
            message.channel.send(`You have already rolled for this round. You scored \`${client.fight[message.guild.id][person + 'Score']}\``);
          }
        }
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
