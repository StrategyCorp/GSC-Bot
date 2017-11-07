const request = require("request");

exports.run = (client, message, [search, resultNum]) => {
  if (!search) {
    message.channel.send(':negative_squared_cross_mark: What term would you like me to look up?');
  } else {
    const baseUrl = "http://api.urbandictionary.com/v0/define?term=";
    const theUrl = baseUrl + search;
    request({
      url: theUrl,
      json: true,
    }, (error, response, body) => {
      if (!resultNum) {
       resultNum = 0;
      } else if (resultNum > 1) {
        resultNum -= 1;
      }
      const result = body.list[resultNum];
      if (result) {
        const definition = `**Word:** ${search}\n\n**Definition:** ${resultNum += 1} out of ${body.list.length}\n_${result.definition}_\n\n**Example:**\n${result.example}\n<${result.permalink}>`;
        message.channel.send(definition).catch(err => client.funcs.log(err.stack, "error"));
      } else {
        message.channel.send("No entry found.").catch(err => client.funcs.log(err.stack, "error"));
      }
    });
  }
};

exports.cmdConfig = {
  name: "urban",
  aliases: [],
  description: "Searches the Urban Dictionary library for a definition to the search term.",
  usage: "urban <term>",
  type: "fun"
};
