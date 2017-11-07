const Discord = require('discord.js');

exports.run = (client, message, args) => {
  if (!args[0]) {
    /*
    let currentCategory = "";
    let output = `= Command List =\n\n[Use ${settings.prefix}help <commandname> for details]\n`;
    const sorted = myCommands.array().sort((p, c) => p.cmdConfig.type > c.cmdConfig.type ? 1 :  p.cmdConfig.name > c.cmdConfig.name && p.cmdConfig.type === c.cmdConfig.type ? 1 : -1 );
    sorted.forEach( c => {
      const cat = c.cmdConfig.type.toProperCase();
      if (currentCategory !== cat) {
        output += `\n== ${cat} ==\n`;
        currentCategory = cat;
      }
      output += `${settings.prefix}${c.cmdConfig.name}${" ".repeat(longest - c.cmdConfig.name.length)} :: ${c.cmdConfig.description}\n`;
    });
    message.channel.send(output, {code:"asciidoc"});
    */
    const settings = client.settings.get(message.guild.id);
    const myCommands = client.commands;
    const commandNames = myCommands.keyArray();
    const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
    const helpEmbed = new Discord.RichEmbed()
      .setColor(settings.embedColour)
      .addField('Command List', `Use ${settings.prefix}help [command] for more details`);
    let cmdArray = new Array();
    let currentCategory = "";
    const sorted = myCommands.array().sort((p, c) => p.cmdConfig.type > c.cmdConfig.type ? 1 :  p.cmdConfig.name > c.cmdConfig.name && p.cmdConfig.type === c.cmdConfig.type ? 1 : -1 );
    sorted.forEach(c => {
      const cat = c.cmdConfig.type.toProperCase();
      if (currentCategory !== cat) {
        helpEmbed.addField(cat, cmdArray);
        cmdArray = [];
        currentCategory = cat;
      } else {
        cmdArray.push(c.cmdConfig.name);
      }
    });
    message.channel.send({embed: helpEmbed});
  } else {
    let command = args[0];
    if (client.commands.has(command)) {
      command = client.commands.get(command);
      message.channel.send(`= ${command.cmdConfig.name} = \n${command.cmdConfig.description}\nusage::${command.cmdConfig.usage}`, {code:"asciidoc"});
    }
  }
};

exports.cmdConfig = {
  name : "help",
  aliases: ['h', 'halp', 'command', 'commands'],
  description: "A help command that list all the bots commands and gives infomation about how to use them.",
  usage: "help [command]",
  type: "core"
};
