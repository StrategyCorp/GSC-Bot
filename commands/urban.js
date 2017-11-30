const request = require("request");

exports.run = (client, message, args) => {
  if (!args[0]) {
    message.channel.send(':negative_squared_cross_mark: What term would you like me to look up?');
  } else {
    var offset = args[args.length - 1];
    if (/^\d+$/.test(offset)) {
      args.pop();
    } else {
      offset = 1;
    }
    const url = "http://api.urbandictionary.com/v0/define?term=" + args.join(' ');
    const urbanRequest = () => {
      request.get({
        url: url,
        json: true,
        headers: {'User-Agent': 'request'}
      }, (err, res, data) => {
        if (err) {
          return message.channel.send(':negative_squared_cross_mark: Error: ' + err);
        } else if (res.statusCode !== 200) {
          return message.channel.send(':negative_squared_cross_mark: Status: ' + res.statusCode);
        }
        const result = data.list[offset];
        if (result) {
          const definition = `**Word:** ${args.join(' ')}\n\n**Definition:** ${offset} out of ${data.list.length}\n_${result.definition}_\n\n**Example:**\n${result.example}\n<${result.permalink}>`;
          message.channel.send(definition);
        } else {
          message.channel.send(":negative_squared_cross_mark: No entry found.");
        }
      });
    };
    urbanRequest();
  }
};

exports.cmdConfig = {
  name: "urban",
  aliases: [],
  description: "Searches the Urban Dictionary library for a definition to the search term.",
  usage: "urban <term> [number]",
  type: "fun"
};
