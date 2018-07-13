
module.exports = async client => {
  await client.wait(1000);
  client.log(`${client.user.tag}, ready to serve ${client.users.size} users in ${client.guilds.size} servers.`);
  client.guilds.filter(g => !client.settings.has(g.id)).forEach(g => client.settings.set(g.id, client.config.serverSettings));
  client.guilds.filter(g => !client.spoints.has(g.id)).forEach(g => client.spoints.set(g.id, client.config.serverPoints));
  client.user.setActivity(`Serving ${client.guilds.size} GSC servers`);
};