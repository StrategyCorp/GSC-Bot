// get the discord.js lib so that we can actually do stuff
const Discord = require("discord.js");

// require so that we can make GET requests
const request = require("request");

// we want to search for different commands then make everything else args
exports.run = (client, message, [search, ...args]) => {
  
/*
    Setup Variables Section
*/
  
  // we just want to make a variable for the api key that we can use multiple times
  // i am using glitch.com to host the bot at the moment so it is in the .env file for safety
  const apiKey = process.env.GIPHY;
  
/*
    Help Section
*/
  
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
      
      // we are going to give each command there own field
       helpEmbed.addField(cmdName, `${settings.prefix}dashboard ${cmdName} ${cmdUsage}\n${cmdDesc}`);
    }
    
    // now we are sending the embed and returning
    return message.channel.send({embed: helpEmbed});
    
/*
    Search Section
*/
    
  } else if (search === "search") {
    
    // we want to check if they send an args
    // if they haven't return an error
    if (!args[0]) return message.channel.send(':negative_squared_cross_mark: You must give me a term to search');
    
    // ok we want to check if the last value in the array is a number
    // so we are making a variable which is the last value the in array
    var offset = args[args.length - 1];
    
    // we are going to use some RegEx to test if it is a number
    if (/^\d+$/.test(offset)) {
      
      // if the last value in the array is a number then pop it (remove it)
      args.pop();
      
      // when we send a GET request to the giphy api we ask for 25 objects back so we don't want any more then that
      if (offset > 24) offset = 25;
      
    // if it isn't a number . . .
    } else {
      
      // we just make the offset 1
      offset = 1;
    }
    
    // we join the arguments so we can request statements aswell as words
    // note that it doesn't include the number at the end if there was because it was popped
    var q = args.join(' ');
    
    // we take one away from the offset because arrays start at 0
    offset -= 1;
    
    // this is the search endpoint url
    var url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${q}&limit=25&offset=${offset}&rating=G&lang=en`;
    
/*
    
*/
    
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
