const Canvas = require('canvas');
const canvas = new Canvas(320, 320);
const ctx = canvas.getContext('2d');
var fs = require('fs');
var path = require('path');

exports.run = (client, message, args) => {
  canvas.createPNGStream().pipe(fs.createWriteStream(path.join(__dirname, 'clock.png')))
}

exports.cmdConfig = {
  name: "test",
  aliases: [],
  description: "test, go away",
  usage: "test",
  type: "client"
};
