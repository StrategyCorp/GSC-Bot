exports.run = (client, message, args) => {
  if (!args[0]) {
    message.channel.fetchMessage(message.channel.lastMessageID).then(msg => {
      console.log(msg.content);
    })
  } else if (args[0].length === 18 && /^\d+$/.test(args[0])) {
    message.channel.fetchMessage(args[0]).then(msg => {
      let messageToMock = msg.content;
      return message.channel.send(messageToMock.toMemeCase());
    });
  } else {
    return message.channel.send(args.join(' ').toMemeCase());
  }
};

exports.cmdConfig = {
  name: "mock",
  aliases: ['toMemeCase'],
  description: "Mocks somebody by turning their message into meme case",
  usage: "mock <text>",
  type: "fun"
};
