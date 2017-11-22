exports.run = (client, message, args) => {
  if (!args[0]) return message.channel.send(':negative_squared_cross_mark: you must give me text to mock');
  if (args[0].length === 18 && /^\d+$/.test(args[0])) {
    message.channel.fetchMessages({around: args[0], limit: 1}).then(messages => {
      var fetchedMessage = messages.first();
      var messageToMock = fetchedMessage.content;
      return message.channel.send(messageToMock);
    });
  }
  // return message.channel.send(args.join(' ').toMemeCase());
};

exports.cmdConfig = {
  name: "mock",
  aliases: ['toMemeCase'],
  description: "Mocks somebody by turning their message into meme case",
  usage: "mock <text>",
  type: "fun"
};
