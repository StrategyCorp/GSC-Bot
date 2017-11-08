module.exports = (client, guild) => {
  client.settings.set(guild.id, client.config.serverSettings);
  client.points.set(guild.id, client.points.point);
}
