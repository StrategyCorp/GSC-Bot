const canvas = require('canvas');
const fs = require('fs');

exports.run = (client, message, args) => {
  if (!args[0]) {
    
    // return message.channel.send('HELP WIP');
  } else {
    let imageObj = {
    "bonobo": "1",
    "test": "2",
    "anothertest": "3"
    }
    let imageArray = Object.keys(imageObj);
    if (imageArray.indexOf(args.slice(1).join(' ')) > -1) {
      
    } else {

    }
  }
};

exports.cmdConfig = {
  name: "image",
  aliases: [],
  description: "WIP.",
  usage: "image",
  type: "fun"
};
