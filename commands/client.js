const sql = require("sqlite");

exports.run = (client, message, [search, ...args]) => {
  if (message.author.id !== client.config.ownerId) return;
  if (!args) return message.channel.send(':negative_squared_cross_mark: !args');
  if (search === "say") {
    message.delete()
    message.channel.send(args.join(' '));
  } else if (search === "game") {
    client.user.setGame(`${args.join(' ')}`);
    return message.channel.send(`:white_check_mark: game changed to \`${args.join(' ')}\``);
  } else if (search === "avatar") {
    client.user.setGame(`${args.join(' ')}`);
    return message.channel.send(`:white_check_mark: avatar changed`);
  } else if (search === "status") {
    args = args.toString().toLowerCase();
    if (args.match(/^(online|idle|invisible|dnd)$/)) {
      client.user.setStatus(args);
      return message.channel.send(`:white_check_mark: status changed to \`${args}\``);
    }
  } else if (search === "username") {
    client.user.setUsername(`${args.join(' ')}`);
    return message.channel.send(`:white_check_mark: username changed to ${args.join(' ')}`);
  } else if (search === "points") {
    let srch = args[0];
    if (!srch) return message.channel.send(':negative_squared_cross_mark: !srch');
    let user = args[1];
    if (!user || user.length !== 18) return message.channel.send(':negative_squared_cross_mark: !user || user.length !== 18');
    let userObject = client.users.get(user);
    let points = args[2];
    if (!points || points !== points) return message.channel.send(':negative_squared_cross_mark: !points || points !== points');
    const score = client.points.get(user) || { points: 0, level: 0 };
    if (srch === "set") {
      score.points = points;
      score.level = Math.floor(0.1 * Math.sqrt(score.points));
      client.points.set(user, score);
      return message.channel.send(`:white_check_mark: \`${userObject.username}'s\` has been set to \`${points}\``);
    } else if (srch === "add") {
      score.points = parseInt(score.points) + parseInt(points);
      score.level = Math.floor(0.1 * Math.sqrt(score.points));
      client.points.set(user, score);
      return message.channel.send(`:white_check_mark: \`${points}\` points have been added to \`${userObject.username}\``);
    } else if (srch === "remove") {
      score.points = parseInt(score.points) - parseInt(points);
      score.level = Math.floor(0.1 * Math.sqrt(score.points));
      client.points.set(user, score);
      return message.channel.send(`:white_check_mark: \`${points}\` points have been removed from \`${userObject.username}\``)
    }
  } else if (search === "test") {
    // sql.get(`SELECT * FROM ${message.guild.id} WHERE userId ="${message.author.id}"`).then(row => {
    //   if (!row) return message.reply("sadly you do not have any points yet!");
    //   message.reply(`you currently have ${row.points} points, good going!`);
    // });
    //return message.channel.send('ok');
    message.channel.send(args.join(' ').toMemeCase());
  } else {
    return message.channel.send(':negative_squared_cross_mark: else');
  }
}

exports.cmdConfig = {
  name: "client",
  aliases: [],
  description: "go away",
  usage: "client <command> [args]",
  type: "client"
};
