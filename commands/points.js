exports.run = (client, message, args) => {
  const scorePoints = client.points.get(message.author.id).points;
  const scoreLevel = client.points.get(message.author.id).level;
  !scorePoints ? message.channel.send('You have no points yet.') : message.channel.send(`You are level ${scoreLevel} with ${scorePoints} points!`);
};

exports.cmdConfig = {
  name: "points",
  aliases: ['point', 'level', 'levels'],
  description: "Displays a users points",
  usage: "points [@user]",
  type: "info"
};