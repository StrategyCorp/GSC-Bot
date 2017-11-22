exports.run = (client, message, args) => {
  if (!args[0]) return message.channel.send(':negative_squared_cross_mark: You must give me text to mock');
  if (args[0].length === 18 && /^\d+$/.test(args[0])) {
    message.channel.fetchMessage(args[0]).then(msg => {
      let messageToMock = msg.content;
      return message.channel.send(messageToMock.toMemeCase());
    });
  } else {
    return message.channel.send(args.join(' ').toMemeCase());
  }
  return message.channel.send(':negative_squared_cross_mark: ')
};

exports.cmdConfig = {
  name: "mock",
  aliases: ['toMemeCase'],
  description: "Mocks somebody by turning their message into meme case",
  usage: "mock <text>",
  type: "fun"
};
