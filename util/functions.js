const moment = require('moment');
const smite = require('../data/smite.json');

module.exports = (client) => {
  client.log = (message) => {
    console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
  };

  client.vgs = (client, message) => {
    if (message.channel.type !== 'text') return;
    if (smite.vgs[message.content.toLowerCase()]) {
      message.channel.send(smite.vgs[message.content.toLowerCase()]);
    }
  };
  
  client.pointsMonitor = (client, message) => {
    if (message.channel.type !=='text') return;
    const settings = client.settings.get(message.guild.id);
    if (message.content.startsWith(settings.prefix)) return;
    const score = client.points.get(message.author.id) || { points: 0, level: 0 };
    score.points++;
    const curLevel = Math.floor(0.1 * Math.sqrt(score.points));
    if (score.level < curLevel) score.level = curLevel;
    client.points.set(message.author.id, score);
  };

  client.poll = async (client, message) => {
    if (message.channel.type !== 'text') return;
    if (!message.content.startsWith('poll: ')) return;
    let reactionArray = ['👍', '👎', '🤷'];
    for (const react of reactionArray) {
      await message.react(react);
    }
  };
  
  client.awaitReply = async (msg, question, limit = 60000) => {
    const filter = m => m.author.id = msg.author.id;
    await msg.channel.send(question);
    try {
      const collected = await msg.channel.awaitMessages(filter, { max: 1, time: limit, errors: ["time"] });
      return collected.first().content;
    } catch (e) {
      return false;
    }
  };

  client.clean = async (client, text) => {
    if (text && text.constructor.name == "Promise") {
      text = await text;
    }
    if (typeof evaled !== "string") {
      text = require("util").inspect(text, {depth: 0});
    }

    text = text
      .replace(/`/g, "`" + String.fromCharCode(8203))
      .replace(/@/g, "@" + String.fromCharCode(8203))
      .replace(client.token, "mfa.VkO_2G4Qv3T--NO--lWetW_tjND--TOKEN--QFTm6YGtzq9PH--4U--tG0");

    return text;
  };

  client.loadCommand = (commandName) => {
    try {
      const props = require(`../commands/${commandName}`);
      client.log(`Loading Command: ${props.cmdConfig.name}`);
      if (props.init) {
        props.init(client);
      }
      client.commands.set(props.cmdConfig.name, props);
      props.cmdConfig.aliases.forEach(alias => {
        client.aliases.set(alias, props.cmdConfig.name);
      });
      return false;
    } catch (e) {
      return `Unable to load command ${commandName}: ${e}`;
    }
  };

  client.unloadCommand = async (commandName) => {
    let command;
    if (client.commands.has(commandName)) {
      command = client.commands.get(commandName);
    } else if (client.aliases.has(commandName)) {
      command = client.commands.get(client.aliases.get(commandName));
    }
    if (!command) return `The command \`${commandName}\` doesn"t seem to exist, nor is it an alias. Try again!`;

    if (command.shutdown) {
      await command.shutdown(client);
    }
    delete require.cache[require.resolve(`../commands/${commandName}.js`)];
    return false;
  };

  client.wait = require("util").promisify(setTimeout);

  String.prototype.toProperCase = function() {
    return this.replace(/([^\W_]+[^\s-]*) */g, function(txt) {return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  };

  Array.prototype.random = function() {
    return this[Math.floor(Math.random() * this.length)]
  };
  
  client.randomNum = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  process.on("uncaughtException", (err) => {
    const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, "g"), "./");
    console.error("Uncaught Exception: ", errorMsg);
    process.exit(1);
  });

  process.on("unhandledRejection", err => {
    console.error("Uncaught Promise Error: ", err);
  });
};
