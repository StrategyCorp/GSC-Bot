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
              console.error('error posting json: ', err);
              throw err
            }
            var headers = res.headers;
            var statusCode = res.statusCode;
            // console.log('headers: ', headers);
            // console.log('statusCode: ', statusCode);
            // console.log('body: ', body);
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
