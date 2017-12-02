const Discord = require("discord.js");
const request = require("request");

exports.run = (client, message, [search, ...args]) => {
  const apiKey = process.env.GIPHY;
  if (search === "help" || search === undefined) {
    var cmdArray = [
      ["search", "<term> [number]", "Gives a gif from a given term"],
      ["trending", "[number]", "Gives the trending gifs on Giphy"],
      ["random", "<term>", "Gives a random gif from a given term"]
    ];
    const settings = client.settings.get(message.guild.id);
    const helpEmbed = new Discord.RichEmbed()
      .setColor(settings.embedColour)
      .setTitle('**Gif Help**');
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
    offset -= 1;
    var url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${q}&limit=25&offset=${offset}&rating=G&lang=en`;
  } else if (search === "trending") {
    var q = "Trending";
    if (/^\d+$/.test(args[0])) {
      var offset = args[0];
      if (offset > 24) offset = 25;
    } else {
      var offset = 1;
    }
    offset -= 1;
    var url = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=25&rating=G`;
 
  } else if (search === "random") {
    
    // this section is really short because we don't have to mess around with offsets
    // i don't really know why this endpoint is here because they send back an array of objects so it is very easy to pick a random on yourself
    
    // just going to return an error if there is no term to search
    if (!args[0]) return message.channel.send(':negative_squared_cross_mark: You must give me a term to search');
    
    // make the query the argument
    var q = args.join(' ');
    
    // the random endpoint url
    var url = `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}&tag=${q}&rating=G`;
  }
  
/*
    Request Data Section
*/
  
  // we are going to use request to make our GET requests
  request.get({
    
    // this url will be different depending on which if statement we went down
    url: url,
    
    // we want the response to be in JSON
    json: true,
    
    // still have no idea what this is for but i always have it in my GET request
    headers: {'User-Agent': 'request'}
    
  // we are declaring what the response are
  // err = error, res = response (status codes), data = the JSON
  }, (err, res, data) => {
    
    // if there are any errors . . .
    if (err) {
      
      // return the error into discord chat
      return message.channel.send(':negative_squared_cross_mark: Error: ' + err);
      
    // if the response code isn't 200 (OK) . . .
    } else if (res.statusCode !== 200) {
      
      // return what the status code was
      return message.channel.send(':negative_squared_cross_mark: Status: ' + res.statusCode);
    
    // if everything was ok . . .
    } else {
      
      // we don't use embed because there is a problem loading gifs in the setImage part of embeds so we use normal messages
      // first we make the title which will be at the top of the message
      // .toProperCase is a custom function not a vanilla javascript function
      let title = `**${q.toProperCase()}**`;
      
      // if the user used the search or the trending commands there would be a number asigned with the gif
      if (search === "search" || search === "trending") {
        
        // first we pick which gif to actually use
        var gif = data.data[offset].url
        
        // then we make a number variable so the user knows which gif they got
        let number = ` #${parseInt(offset) + 1}`;
        
        // we add the number to the end of the title
        title += number;
      
      // if they used the random command . . .
      } else {
        
        // there is only one object sent back
        var gif = data.data.url;
      }
      
      // we are just going to return the message with the gif and the title and be done
      return message.channel.send(`${title}\n${gif}`);
    }
  });
};

exports.cmdConfig = {
  name: "gif",
  aliases: ['giphy'],
  description: "Searches giphy for a gif.",
  usage: "gif",
  type: "fun"
};
