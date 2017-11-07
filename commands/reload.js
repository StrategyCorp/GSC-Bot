exports.run = (client, message, args) => {
  if (message.author.id !== client.config.ownerId) return;
  let command;
  if (client.commands.has(args[0])) {
    command = args[0];
  } else if (client.aliases.has(args[0])) {
    command = client.aliases.get(args[0]);
  }
  if (!command) {
    return message.channel.send(`:negative_squared_cross_mark: I cannot find the command: ${args[0]}`);
  } else {
    message.channel.send(`Reloading: ${command}`).then(m => {
      client.reload(command).then(() => {
        m.edit(`:white_check_mark: Successfully reloaded: ${command}`);
      }).catch(e => {
        m.edit(`:negative_squared_cross_mark: Command reload failed: ${command}\n\`\`\`${e.stack}\`\`\``);
      });
    });
  }
};

exports.cmdConfig = {
  name: "reload",
  aliases: [],
  description: "Reloads the command file, if it's been updated or modified.",
  usage: "reload <commandname>",
  type: "client"
};
