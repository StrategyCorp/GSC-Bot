// get the discord.js lib so that we can actually do stuff
const Discord = require("discord.js");

// require so that we can make GET requests
const request = require("request");

// we want to search for different commands then make everything else args
exports.run = (client, message, [search, ...args]) => {
  
  // we just want to make a variable for the api key that we can use multiple times
  // i am using glitch.com to host the bot at the moment so it is in the .env file for safety
  const apiKey = process.env.GIPHY;
  
  // if they didn't say which command they wanted or they asked for help then show them this
  if (search === "help" || search === undefined) {
    
    // this is an array of arrays which contain the command name, the usage and the description
    var cmdArray = [
      ["search", "<term> [number]", "Gives a gif from a given term"],
      ["trending", "[number]", "Gives the trending gifs on Giphy"],
      ["random", "<term>", "Gives a random gif from a given term"]
    ];
    
    // we load the server settings so that we know what colour they want their embeds
    const settings = client.settings.get(message.guild.id);
    
    // this is where we make the embed
    const helpEmbed = new Discord.RichEmbed()
    
      // just going to set the colour as what they want in the server settings
      .setColor(settings.embedColour)
    
      // we are making the title 'gif help' so they know what the commands are for
      .setTitle('**Gif Help**');
    
    // we are looping through the array of arrays and splitting it into 3 variables
    for (let [cmdName, cmdUsage, cmdDesc] of cmdArray) {
       helpEmbed.addField(cmdName, `${settings.prefix}dashboard ${cmdName} ${cmdUsage}\n${cmdDesc}`);
    }
    return message.channel.send({embed: helpEmbed});
  } else if (search === "search") {
    if (!args[0]) return message.channel.send(':negative_squared_cross_mark: You must give me a term to search');
    var offset = args[args.length - 1];
    if (/^\d+$/.test(offset)) {
      args.pop();
      if (offset > 24) offset = 25;
    } else {
      offset = 1;
    }
    var q = args.join(' ');
    offset = offset - 1;
    var url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${q}&limit=25&offset=${offset}&rating=G&lang=en`;
  } else if (search === "trending") {
    var q = "Trending";
    if (/^\d+$/.test(args[0])) {
      var offset = args[0];
      if (offset > 24) offset = 25;
    } else {
      var offset = 1;
    }
    offset = offset - 1;
    var url = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=25&rating=G`;
  } else if (search === "random") {
    if (!args[0]) return message.channel.send(':negative_squared_cross_mark: You must give me a term to search');
    var q = args.join(' ');
    var url = `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}&tag=${q}&rating=G`;
  }
  const requestGif = async () => {
    request.get({
      url: url,
      json: true,
      headers: {'User-Agent': 'request'}
    }, (err, res, data) => {
      if (err) {
        return message.channel.send(':negative_squared_cross_mark: Error: ' + err);
      } else if (res.statusCode !== 200) {
        return message.channel.send(':negative_squared_cross_mark: Status: ' + res.statusCode);
      } else {
        let title = `**${q.toProperCase()}**`;
        let number = ` #${parseInt(offset) + 1}`;
        if (search === "search" || search === "trending") {
          var gif = data.data[offset].url
          title += number;
        } else {
          var gif = data.data.url;
        }
        return message.channel.send(`${title}\n${gif}`);
      }
    });
  };
  requestGif();
};

exports.cmdConfig = {
  name: "gif",
  aliases: ['giphy'],
  description: "Searches giphy for a gif.",
  usage: "gif",
  type: "fun"
};
