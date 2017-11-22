exports.run = (client, message, args) => {
  if (!args[0]) {
    return message.channel.send('HELP WIP');
  }
  
};

exports.cmdConfig = {
  name: "image",
  aliases: [],
  description: "WIP.",
  usage: "image",
  type: "fun"
};
