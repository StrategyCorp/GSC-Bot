exports.run = (client, message, args) => {
  let user = message.author;
  if (message.mentions.users.size >= 1) user = message.mentions.users.first();
  if (user.avatarURL === null) return message.channel.send(`:negative_squared_cross_mark: **${user.username}** does not have an avatar`);
  message.channel.send(`**${user.username}'s** avatar URL: ${user.avatarURL}`);
};

exports.cmdConfig = {
  name: "avatar",
  aliases: ['ava'],
  description: "Displays a users avatar.",
  usage: "avatar [@user]",
  type: "info"
};
