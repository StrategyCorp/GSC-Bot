if (process.version.slice(1).split(".")[0] < 8) throw new Error("Node 8.0.0 or higher is required. Update Node on your system.");

const Discord = require("discord.js");
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const Enmap = require("enmap");
const EnmapLevel = require("enmap-level");
const client = new Discord.Client();
client.config = require("./config.js");
require("./util/functions.js")(client);
client.commands = new Enmap();
client.aliases = new Enmap();
client.queue = new Enmap();
client.fight = new Enmap();
client.smite = new Enmap({provider: new EnmapLevel({name: "smite"})});
client.settings = new Enmap({provider: new EnmapLevel({name: "settings"})});
client.gpoints = new Enmap({provider: new EnmapLevel({name: "gpoints"})});
client.spoints = new Enmap({provider: new EnmapLevel({name: "spoints"})});

const mysql = require('mysql');


var con = mysql.createConnection({
  host: "gscstorage.c6yizf7g9gif.us-east-2.rds.amazonaws.com",
  user: "chickenbone",
  password: "m4290fIm1dg5y7!h2002",
  database: "storage"
});
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected! To mysql database!");
  var sql = "INSERT INTO users (name, address) VALUES ('test', 'test')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
});

const init = async () => {
  const cmdFiles = await readdir("./commands/");
  client.log(`Loading a total of ${cmdFiles.length} commands`);
  cmdFiles.forEach(f => {
    if (!f.endsWith(".js")) return;
    const response = client.loadCommand(f);
    if (response) console.log(response);
  });
  const evtFiles = await readdir("./events/");
  client.log(`Loading a total of ${evtFiles.length} events`);
  evtFiles.forEach(file => {
    const eventName = file.split(".")[0];
    const event = require(`./events/${file}`);
    client.on(eventName, event.bind(null, client));
    delete require.cache[require.resolve(`./events/${file}`)];
  });
  client.login(process.env.TOKEN);
};

init();
