module.exports = async client => {
  await client.wait(1000);
  client.log(`${client.user.tag}, ready to serve ${client.users.size} users in ${client.guilds.size} servers.`);
  client.guilds.filter(g => !client.settings.has(g.id)).forEach(g => client.settings.set(g.id, client.config.serverSettings));
  let games = client.config.games;
  games = games[Math.floor(Math.random() * games.length)];
  client.user.setGame(games);
};

const http = require('http');
const express = require('express');
const app = express();

app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});

app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);
