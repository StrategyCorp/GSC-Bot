exports.run = (client, message, args) => {
  if (!args[0]) return message.channel.send(':negative_squared_cross_mark: you must give me text to mock');
  if (args[0].length === 18) console.log("2");
  return message.channel.send(args.join(' ').toMemeCase());
};

exports.cmdConfig = {
  name: "mock",
  aliases: ['toMemeCase'],
  description: "Mocks somebody by turning their message into meme case",
  usage: "mock <text>",
  type: "fun"
};
