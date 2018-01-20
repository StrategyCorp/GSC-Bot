exports.run = (client, message, args) => {
  if (!client.hasOwnProperty('fight')) client.fight = {};
  if (!client.fight.hasOwnProperty(message.guild.id)) {client.fight[message.guild.id] = {active: false};};
  if (client.fight[message.guild.id].active === true) return message.channel.send(`:negative_squared_cross_mark: A fight is already taking place between **${client.users.get(client.fight[message.guild.id].first).username}** and **${client.users.get(client.fight[message.guild.id].second).username}**. We don't want it to be a bloodbath, do we?`);
  let rounds = args[0] ? (/^\d+$/.test(args[0]) ? (0 < args[0] ? (23 > args[0] ? (args[0] % 2 === 0 ? parseInt(args[0]) + 1 : args[0]) : 3) : 3) : 3) : 3;
  let user = message.mentions.users.first();
  if (user.id === message.author.id) return message.channel.send(':negative_squared_cross_mark: You may not fight yourself');
  if (message.mentions.users.size < 1) return message.channel.send(':negative_squared_cross_mark: You must mention someone to fight them');
  message.channel.send(`:crossed_swords: **${message.author.username}** has challenged **${user.username}** to a fight for **${rounds}** rounds, <@${user.id}> do you accept? (yes/no)`);
  const startCollector = message.channel.createMessageCollector(message => message, 
                                                                {time: 30000}
                                                               );
  startCollector.on('collect', m => {
    if (m.content.startsWith('no') && m.author.id === user.id) {
      startCollector.stop('declined');
    } else if (m.content.startsWith('yes') && m.author.id === user.id) {
      message.channel.send(':crossed_swords: The fight will now commence! Both parties need to say `roll` to get their scores for the round');
      client.fight[message.guild.id] = {
        active: true,
        first: message.author.id,
        firstScore: null,
        firstPoint: 0,
        second: user.id,
        secondScore: null,
        secondPoint: 0,
        rounds: rounds,
        needed: Math.ceil(rounds / 2),
        round: 0
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
              if (client.fight[message.guild.id].firstScore !== null && client.fight[message.guild.id].secondScore !== null) {
                const endMessage = (player) => {
                  console.log(client.fight[message.guild.id]);
                  client.fight[message.guild.id].firstScore = null;
                  client.fight[message.guild.id].secondScore = null;
                  client.fight[message.guild.id][player + 'Point'] = client.fight[message.guild.id][player + 'Point'] + 1;
                  client.fight[message.guild.id].round = client.fight[message.guild.id].round + 1;
                  let name = client.users.get(client.fight[message.guild.id][player]).username;
                  let theMessage = [
                    ':crossed_swords:',
                    `**${name}** has won round ${client.fight[message.guild.id].round}.`,
                    `The score is now \`${client.fight[message.guild.id].firstPoint} - ${client.fight[message.guild.id].secondPoint}\`\n`       
                  ];
                  if (client.fight[message.guild.id].firstPoint === client.fight[message.guild.id].needed || client.fight[message.guild.id].secondPoint === client.fight[message.guild.id].needed) {
                    collector.stop('gameEnd');
                    theMessage.push(`**${name}** has won the fight!`);
                  } else {
                    collector.stop('roundEnd');
                    theMessage.push(`Total rounds: ${client.fight[message.guild.id].rounds} (First to ${client.fight[message.guild.id].needed})`);
                  }
                  console.log(client.fight[message.guild.id]);
                  return theMessage.join(' ');
                }
                if (client.fight[message.guild.id].firstScore === client.fight[message.guild.id].secondScore) {
                  message.channel.send(':crossed_swords: The round was a draw and will be redone');                                                                                        
                } else {
                  let winner = client.fight[message.guild.id].firstScore > client.fight[message.guild.id].secondScore ? 'first' : 'second';
                  message.channel.send(endMessage(winner));  
                }
              }
            } else {
              message.channel.send(`:crossed_swords: You have already rolled for this round. You scored \`${client.fight[message.guild.id][person + 'Score']}\``);
            }
          }
        });
        collector.on('end', (collected, reason) => {
          if (reason === 'gameEnd') {
            client.fight[message.guild.id] = {active: false};
            return;
          }
        });
      }
    }
  });
  startCollector.on('end', (collected, reason) => {
    if (reason === 'declined') return message.channel.send(`:crossed_swords: **${user.username}** has declined the fight`);
    if (reason === 'time') return message.channel.send(`:crossed_swords: **${user.username}** has ran out of time`);
  });
};

exports.cmdConfig = {
  name: "fight",
  aliases: [],
  description: "fight",
  usage: "fight [rounds] <@user>",
  type: "fun"
};
