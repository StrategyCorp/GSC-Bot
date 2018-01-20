exports.run = (client, message, args) => {
  if (!args[0]) return message.channel.send(':negative_squared_cross_mark: You must say have many rounds you want it');
  let user = message.mentions.users.first();
  if (message.mentions.users.size < 1) return message.channel.send(':negative_squared_cross_mark: You must mention someone to challenge them');
  message.channel.send(
};

exports.cmdConfig = {
  name: "fight",
  aliases: [],
  description: "fight",
  usage: "fight <rounds> <@user>",
  type: "fun"
};
