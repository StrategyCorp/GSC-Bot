const Discord = require('discord.js');
const sql = require("sqlite");

exports.run = (client, message, args) => {
  const settings = client.settings.get(message.guild.id);
  var user = message.mentions.users.first() || message.author;
  let globalPoints = client.points.get(user.id).points;
  let globalLevel = client.points.get(user.id).level;
  if (!globalPoints) {
    globalPoints = 1;
    globalLevel = 0;
  }
  sql.open(`./data/points/${message.guild.id}.sqlite`);
  sql.get(`SELECT * FROM points WHERE id = '${user.id}'`).then(row => {
    if (!row) sql.run('INSERT INTO points (id, points) VALUES (?, ?)', [message.author.id, 1]);
    var serverPoints = row.points;
    var serverLevel = Math.floor(Math.sqrt(serverPoints));
    const pointsEmbed = new Discord.RichEmbed()
      .setColor(settings.embedColour)
      .setThumbnail(user.avatarURL)
      .setAuthor(`${user.username}#${user.discriminator}`, user.avatarURL)
      .addField(settings.currency, `Level: ${serverLevel}\nPoints: ${serverPoints}`)
      .addField('Global Points', `Level: ${globalLevel}\nPoints: ${globalPoints}`);
    return message.channel.send({embed: pointsEmbed});
  }).catch(() => {
    console.error;
    sql.run('CREATE TABLE IF NOT EXISTS points (id TEXT, points INTEGER)').then(() => {
      sql.run('INSERT INTO points (id, points) VALUES (?, ?)', [message.author.id, 1]);
    });
  });
};

exports.cmdConfig = {
  name: "points",
  aliases: ['point', 'level', 'levels'],
  description: "Displays a users points",
  usage: "points [@user]",
  type: "fun"
};
