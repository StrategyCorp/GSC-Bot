exports.run = (client, message, args) => {
  if (!client.hasOwnProperty('fight')) client.fight = {};
  if (!client.fight.hasOwnProperty(message.guild.id)) {client.fight[message.guild.id] = {active: false};};
  if (client.fight[message.guild.id].active === true) return message.channel.send(`:negative_squared_cross_mark: A fight is already taking place between **${client.users.get(client.fight[message.guild.id].first).username}** and **${client.users.get(client.fight[message.guild.id].second).username}**. We don't want it to be a bloodbath, do we?`);
  let rounds = args[0] ? (/^\d+$/.test(args[0]) ? (1 < args[0] ? (20 > args[0] ? (args[0] % 2 === 0 ? parseInt(args[0]) + 1 : args[0]) : 3) : 3) : 3) : 3;
  let user = message.mentions.users.first();
  if (user.id === message.author.id) return message.channel.send(':negative_squared_cross_mark: You may not fight yourself');
  if (message.mentions.users.size < 1) return message.channel.send(':negative_squared_cross_mark: You must mention someone to fight them');
  message.channel.send(`:crossed_swords: **${message.author.username}** has challenged **${user.username}** to a fight for **${rounds}** rounds, <@${user.id}> do you accept? (yes/no)`);
  const startCollector = message.channel.createMessageCollector(message => message);
  startCollector.on('collect', m => {
    if (m.content.startsWith('no') && m.author.id === user.id) {
      startCollector.stop('declined');
      return message.channel.send(`:crossed_swords: **${user.username}** has declined the fight`);
    } else if (m.content.startsWith('yes') && m.author.id === user.id) {
      message.channel.send(':crossed_swords: The fight will now commence! Both parties need to say `roll` to get their scores for the round');
      client.fight[message.guild.id] = {
        active: true,
        first: message.author.id,
        firstScore: null,
        second: user.id,
        secondScore: null,
        rounds: rounds,
        needed: Math.ceil(rounds / 2),
        round: 1,
        score: [0, 0]
      };
      makeRound();
      function makeRound () {
        const collector = message.channel.createMessageCollector(message => message);
        collector.on('collect', msg => {
          if (msg.content.startsWith('roll') && (msg.author.id === client.fight[message.guild.id].first || msg.author.id === client.fight[message.guild.id].second)) {
            let person = msg.author.id === client.fight[message.guild.id].first ? 'first' : 'second';
            if (client.fight[message.guild.id][person + 'Score'] === null) {
              let score = client.randomNum(1, 100);
              client.fight[message.guild.id][person + 'Score'] = score;
              message.channel.send(`:crossed_swords: **${msg.author.username}** has rolled \`${score}\``);
              console.log(client.fight[message.guild.id]);
              if (client.fight[message.guild.id].firstScore !== null && client.fight[message.guild.id].secondScore !== null) {
                const endMessage = (name) => {
                  let theMessage = [
                    ':crossed_swords:',
                    `**${name}** has won round ${client.fight[message.guild.id].round}.`,
                    `The score is now \`${client.fight[message.guild.id].score[0]} - ${client.fight[message.guild.id].score[1]}\`\n`,
                    `Total rounds: ${client.fight[message.guild.id].rounds} (First to ${client.fight[message.guild.id].needed})`
                  ];
                  return theMessage.join(' ');
                }
                if (client.fight[message.guild.id].firstScore === client.fight[message.guild.id].secondScore) {
                  message.channel.send(':crossed_swords: The round was a draw and will be redone');                                                                                        
                } else if (client.fight[message.guild.id].firstScore > client.fight[message.guild.id].secondScore) {
                  client.fight[message.guild.id].score[0] = client.fight[message.guild.id].score[0] + 1;
                  message.channel.send(endMessage(client.users.get(client.fight[message.guild.id].first).username));
                } else if (client.fight[message.guild.id].firstScore < client.fight[message.guild.id].secondScore) {
                  client.fight[message.guild.id].score[1] = client.fight[message.guild.id].score[1] + 1;
                  message.channel.send(endMessage(client.users.get(client.fight[message.guild.id].second).username));
                }
                collector.stop('roundEnd');
              }
            } else {
              message.channel.send(`:crossed_swords: You have already rolled for this round. You scored \`${client.fight[message.guild.id][person + 'Score']}\``);
            }
          }
        });
        collector.on('end', (collected, reason) => {
          if (reason === 'roundEnd') {
            
          }
        });
      }
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
