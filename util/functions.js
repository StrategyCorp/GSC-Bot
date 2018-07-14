const moment = require('moment');


module.exports = (client) => {
  client.log = (message) => {
    console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
  };

  
  client.replyArray = (client, message) => {
    if (message.channel.type !== 'text') return;
    if (client.config.replyObj[message.content.toLowerCase()]) {
      message.channel.send(client.config.replyObj[message.content.toLowerCase()]);
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

  client.randomNum = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  
  client.roundToTwo = (number) => {
    return +(Math.round(number + "e+2")  + "e-2");
  };
  
  client.isInArray = (array, string) => {
    return array.indexOf(string) > -1;
  };
  
  client.searchArrayOfObjects = (array, key, value) => {
    for (var i=0; i < array.length; i++) {
      if (array[i][key] === value) {
        return array[i];
      }
    }
  };
  
  client.removeObjectFromArrayOfObjectsFromKeyAndValue = (array, key, value) => {
    var i = array.length;
    while (i--) {
      if (array[i] && array[i].hasOwnProperty(key) && (arguments.length > 2 && array[i][key] === value)) {
        array.splice(i, 1);
      }
    }
    return array;
  };
  
  client.chunkArray = (array, chunkSize) => {
    var results = [];
    while (array.length) {
      results.push(array.splice(0, chunkSize));
    }
    return results;
  };
  
  client.between = (x, min, max) => {
    return x >= min && x <= max;
  };
  
  client.romanize = (number) => {
    if (number === 0) return 0;
    if (!+number) return NaN;
    var digits = String(+number).split("");
    var key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM","","X","XX","XXX","XL","L","LX","LXX","LXXX","XC","","I","II","III","IV","V","VI","VII","VIII","IX"];
    var roman = "";
    var i = 3;
    while (i--) {
      roman = (key[+digits.pop() + (i * 10)] || "") + roman;
    }  
    return Array(+digits.join("") + 1).join("M") + roman;
  };
  
  Array.prototype.random = function() {
    return this[Math.floor(Math.random() * this.length)]
  };
  
  Array.prototype.contains = function(obj) {
    return this.indexOf(obj) > -1;
  };
  
  String.prototype.toProperCase = function() {
    return this.replace(/([^\W_]+[^\s-]*) */g, function(txt) {return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  };
  
  String.prototype.toMemeCase = function() {
    return this.split('').map((v, i) => i % 2 == 0 ? v.toLowerCase() : v.toUpperCase()).join('');
  };
  
  Object.prototype.getKeyByValue = function(value) {
    for (var prop in this) {
      if (this.hasOwnProperty(prop)) {
        if (this[prop] === value) {
          return prop;
        }
      }
    }
  };
  
  Array.min = function(array) {
    return Math.min.apply(Math, array);
  };
  
  Array.max = function(array) {
    return Math.max.apply(Math, array);
  };
  
  process.on("uncaughtException", (err) => {
    const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, "g"), "./");
    console.error("Uncaught Exception: ", errorMsg);
    process.exit(1);
  });

  process.on("unhandledRejection", err => {
    console.error("Uncaught Promise Error: ", err);
  });
};
