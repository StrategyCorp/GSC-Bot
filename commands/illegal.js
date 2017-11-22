const request = require('request');

exports.run = async (client, message, word) => {
  if (!word[0]) return message.channel.send(':negative_squared_cross_mark: What would you like to be illegal?');
  let url = `https://is-now-illegal.firebaseio.com/gifs/${word.join('').toUpperCase()}.json`;
  request.get({
      url: url,
      json: true,
      headers: {'User-Agent': 'request'}
    }, (err, res, data) => {
      if (err) {
        console.log('Error:', err);
      } else if (res.statusCode !== 200) {
        console.log('Status:', res.statusCode);
      } else {
        if (data === null) {
          request.post({
            url: 'https://is-now-illegal.firebaseio.com/queue/tasks.json',
            form: {
              task: 'gif',
              word: word.join('').toUpperCase()
            }
          });
        } else {
          return message.channel.send({'files': [data.url]});
        }      
      }
  });
};

exports.cmdConfig = {
  name: "illegal",
  aliases: ['isn', 'isnowillegal'],
  description: "Makes a given thing illegal",
  usage: "illegal <word>",
  type: "fun"
};
