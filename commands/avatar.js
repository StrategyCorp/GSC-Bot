// just the standard
exports.run = (client, message, args) => {
  
  // so this is a neat little treat that i should use more often but done
  // if the first value is not undefined then it uses it
  // if it is then it uses the second value
  // so if a person was mentioned then the user object of the mentioned person would be present so it uses it
  // if nobody is mentioned use the message authors user object
  let user = message.mentions.users.first() || message.author;
  
  // so if the person have never changed their avatar and uses the defualt one then avatarURL comes back null
  // we are just going to return an err message here
  if (user.avatarURL === null) return message.channel.send(`:negative_squared_cross_mark: \`${user.username}\` does not have an avatar`);
  
  if (user.username.substr(user.username.length - 1) === "e") return message.channel.send("2");
  message.channel.send(`**${user.username}'s** avatar URL: ${user.avatarURL}`);
};

exports.cmdConfig = {
  name: "avatar",
  aliases: ['ava'],
  description: "Displays a users avatar.",
  usage: "avatar [@user]",
  type: "info"
};
