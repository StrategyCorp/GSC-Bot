const Discord = require('discord.js');
const sql = require('sqlite');
sql.open('../data/points.sqlite');

exports.run = (client, message, args) => {
  let user;
  if (message.mentions.users.size === 0) user = message.author;
  if (message.mentions.users.size === 1) user = message.mentions.users.first();
  const settings = client.settings.get(message.guild.id);
  sql.get(`SELECT * FROM ${message.guild.id} WHERE id = '${user.id}'`).then(row => {
    if (!row) sql.run(`INSERT INTO ${message.guild.id} (id, points) VALUES (?, ?)`, [message.author.id, 1]);
    let points = row.points;
    let level = Math.floor(Math.sqrt(points));
    const pointsEmbed = new Discord.RichEmbed()
      .setColor(settings.embedColor)
      .setThumbnail(user.avatarURL)
      .addField(user.username, `Level: ${level}\nPoints: ${points}`);
    message.channel.send({embed: pointsEmbed});
  }).catch(() => {
    console.error;
    sql.run(`CREATE TABLE IF NOT EXISTS ${message.guild.id} (id TEXT, points INTEGER)`).then(() => {
      sql.run(`INSERT INTO ${message.guild.id} (id, points) VALUES (?, ?)`, [message.author.id, 1]);
    });
  });
};

exports.cmdConfig = {
  name: "points",
  aliases: ['point', 'level', 'levels'],
  description: "Displays a users points",
  usage: "points",
  type: "info"
};