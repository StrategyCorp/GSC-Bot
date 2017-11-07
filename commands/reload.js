exports.run = async (client, message, args) => {
  if (message.author.id !== client.config.ownerId) return;
  if (!args || args.size < 1) return message.reply('"':negative_squared_cross_mark:Must provide a command to reload.");
  let response = await client.unloadCommand(args[0]);
  if (response) return message.reply(`Error Unloading: ${response}`);
  response = client.loadCommand(args[0]);
  if (response) return message.reply(`Error Loading: ${response}`);
  message.reply(`The command \`${args[0]}\` has been reloaded`);
};

exports.cmdConfig = {
  name: "reload",
  aliases: [],
  description: "Reloads the command file, if it's been updated or modified.",
  usage: "reload <commandname>",
  type: "client"
};
