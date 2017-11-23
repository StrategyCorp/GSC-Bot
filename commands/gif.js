const request = require("request");

exports.run = (client, message, [search, resultNum]) => {
  if (!search) return message.channel.send(':negative_squared_cross_mark: What term would you like me to look up?');
  
  let url = ``;
  request({
    url: url,
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
      message.channel.send(":negative_squared_cross_mark: No entry found.").catch(err => client.funcs.log(err.stack, "error"));
    }
  });
};

exports.cmdConfig = {
  name: "gif",
  aliases: ['giphy'],
  description: "Searches giphy for a gif.",
  usage: "gif <term> [number]",
  type: "fun"
};
