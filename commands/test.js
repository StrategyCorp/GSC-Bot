var Canvas = require('canvas')
  , Image = Canvas.Image
  , canvas = new Canvas(200, 200)
  , ctx = canvas.getContext('2d');
var fs = require('fs');
var path = require('path');

exports.run = (client, message, args) => {
  ctx.font = '30px Impact';
  ctx.rotate(.1);
  ctx.fillText("Awesome!", 50, 100);

  var te = ctx.measureText('Awesome!');
  ctx.strokeStyle = 'rgba(0,0,0,0.5)';
  ctx.beginPath();
  ctx.lineTo(50, 102);
  ctx.lineTo(50 + te.width, 102);
  ctx.stroke();
  console.log(`${canvas.toDataURL()}`);
  //const pngStream = canvas.createPNGStream().pipe(fs.createWriteStream(path.join(__dirname, 'export.png')))
}

exports.cmdConfig = {
  name: "test",
  aliases: [],
  description: "test, go away",
  usage: "test",
  type: "client"
};
