exports.run = (client, message, [search, ...args]) => {
  if (message.author.id !== client.config.ownerId) return;
  if (!args) return message.channel.send(':negative_squared_cross_mark: !args');
  if (search === "say") {
    message.delete()
    message.channel.send(args.join(' '));
  } else if (search === "game") {
    client.user.setGame(`${args.join(' ')}`);
    message.channel.send(`:white_check_mark: game changed to \`${args.join(' ')}\``);
  } else if (search === "avatar") {
    client.user.setGame(`${args.join(' ')}`);
    message.channel.send(`:white_check_mark: avatar changed`);
  } else if (search === "status") {
    args = args.toString().toLowerCase();
    if (args.match(/^(online|idle|invisible|dnd)$/)) {
      client.user.setStatus(args);
      message.channel.send(`:white_check_mark: status changed to \`${args}\``);
    }
  } else if (search === "username") {
    client.user.setUsername(`${args.join(' ')}`);
    message.channel.send(`:white_check_mark: username changed to ${args.join(' ')}`);
  } else if (search === "points") {
    let srch = args[0];
    if (!srch) return message.channel.send(':negative_squared_cross_mark: !srch');
    let user = args[1];
    if (!user || user.length !== 18) return message.channel.send(':negative_squared_cross_mark: !user || user.length !== 18');
    client.users.get(user);
    let points = args[2];
    if (!points) return message.channel.send(':negative_squared_cross_mark: !points');
    const score = client.points.get(user) || { points: 0, level: 0 };
    if (srch === "set") {
      score.points = points;
      score.level = Math.floor(0.1 * Math.sqrt(score.points));
      client.points.set(user, score);
      message.channel.send(`:white_check_mark: ${user.username}`);
    }
  } else {
    message.channel.send(':negative_squared_cross_mark: else')
  }
}

exports.cmdConfig = {
  name: "client",
  aliases: [],
  description: "go away",
  usage: "client <command> [args]",
  type: "client"
};
