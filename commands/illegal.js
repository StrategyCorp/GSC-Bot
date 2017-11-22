const request = require('request');

exports.run = async (client, message, word) => {
  if (!word[0]) return message.channel.send(':negative_squared_cross_mark: What would you like to be illegal?');
  if (word.join('').length > 17) return message.channel.send(`:negative_squared_cross_mark: \`${word.join('')}\` is too long. Max 18 charaters.`);
  const requestIllegal = async (url) => {
    request.get({
      url: url,
      json: true,
      headers: {'User-Agent': 'request'}
    }, (err, res, data) => {
      if (err) {
        return message.channel.send(':negative_squared_cross_mark: Error:', err);
      } else if (res.statusCode !== 200) {
        return message.channel.send(':negative_squared_cross_mark: Status:', res.statusCode);
      } else {
        if (data === null) {
          var postData = {
            task: 'gif',
            word: word.join('').toUpperCase()
          };
          var options = {
            method: 'post',
            body: postData,
            json: true,
            url: 'https://is-now-illegal.firebaseio.com/queue/tasks.json'
          };
          request(options, function (err, res, body) {
            if (err) {
              return message.channel.send(':negative_squared_cross_mark: Error:', err);
            } else if (res.statusCode !== 200) {
              return message.channel.send(':negative_squared_cross_mark: Status:', res.statusCode);
            }
            console.log(word.join('').toUpperCase());
            let url = `https://is-now-illegal.firebaseio.com/gifs/${word.join('').toUpperCase()}.json`;
            setTimeout(function() {
              requestIllegal(url);
            }, 5000)
          });
        } else {
          return message.channel.send({'files': [data.url]});
        }      
      }
    });
  }
  let url = `https://is-now-illegal.firebaseio.com/gifs/${word.join('').toUpperCase()}.json`;
  requestIllegal(url);
};

exports.cmdConfig = {
  name: "illegal",
  aliases: ['isn', 'isnowillegal'],
  description: "Makes a given thing illegal",
  usage: "illegal <word>",
  type: "fun"
};
