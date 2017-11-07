exports.run = (client, message, args) => {
  let user;
  if (message.mentions.users.size === 0) user = message.author;
  if (message.mentions.users.size === 1) user = message.mentions.users.first();
  const scorePoints = client.points.get(user.id).points;
  const scoreLevel = client.points.get(user.id).level;
  !scorePoints ? message.channel.send('You have no points yet.') : message.channel.send(`You are level ${scoreLevel} with ${scorePoints} points!`);
};

exports.cmdConfig = {
  name: "points",
  aliases: ['point', 'level', 'levels'],
  description: "Displays a users points",
  usage: "points [@user]",
  type: "info"
};