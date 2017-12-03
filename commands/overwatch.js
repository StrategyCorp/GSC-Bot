const Discord = require('discord.js');
const request = require('request');

exports.run = async (client, message, [search, ...args]) => {
  search = search ? search.toLowerCase() : "help";
  var cmdList = [];
  var cmdArray = [
    ["player", "<battletag> [platform && region]", "Displays a players stats", "Who would you like me to look up?"]
  ];
  const settings = client.settings.get(message.guild.id);
  const helpEmbed = new Discord.RichEmbed()
    .setColor(settings.embedColour)
    .setTitle('**Overwatch Help**');
  for (let [cmdName, cmdUsage, cmdDesc, cmdError] of cmdArray) {
    cmdList.push(cmdName);
    helpEmbed.addField(cmdName, `${settings.prefix}smite ${cmdName} ${cmdUsage}\n${cmdDesc}`);
  }
  if (search === "help") {
    return message.channel.send({embed: helpEmbed});
  }
  var aliaseObj = {
    "profile": "player"
  };
  var aliaseArray = Object.keys(aliaseObj);
  if (!args[0]) {
    for (let [cmdName, cmdUsage, cmdDesc, cmdError] of cmdArray) {
      if (search === cmdName) return message.channel.send(`:negative_squared_cross_mark: ${cmdError}`);
    }
  }
  if (client.isInArray(aliaseArray, search) === true) search = aliaseObj[search];
  if (client.isInArray(cmdList, search) === false) return message.channel.send(':negative_squared_cross_mark: Unknown command');
  var rankObj = {
    "unranked" : [0, 0],
    "bronze": [1, 1499],
    "silver": [1500, 1999],
    "gold": [2000, 2499],
    "platinum": [2500, 2999],
    "diamond": [3000, 2499],
    "master": [3500, 3999],
    "grand master": [4000, 5000]
  };
  var rankArray = Object.keys(rankObj);
  var prestigeObj = {
    "bronze" : ["#c0392b", 0, 6],
    "silver": ["#979a9a", 7, 12],
    "gold": ["#d4ac0d ", 13, 18],
    "platinum": ["#e5e8e8", 19, 24],
    "error": ["#512e5f", 25, 1000]
  };
  var prestigeArray = Object.keys(prestigeObj);
  var platformObj = {
    "psn": "psn",
    "ps": "psn",
    "ps4": "psn",
    "xbl": "xbl",
    "xbox": "xbl",
    "pc": "pc"
  };
  var platformArray = Object.keys(platformObj);
  var regionObj = {
    "us": "us",
    "na": "us",
    "america": "us",
    "eu": "eu",
    "europe": "eu",
    "kr": "kr",
    "asia": "kr"
  }
  var regionArray = Object.keys(regionObj);
  var player = args[0].split('#');
  if (!player[1]) return message.channel.send(':negative_squared_cross_mark: You must include your whole battletag. Example: name#1234');
  var platform = !args[args.length-1] ? "pc" : (client.isInArray(platformArray, args[args.length-1])) ? args[args.length-1] : (!args[args.length-2]) ? "pc" : (client.isInArray(platformArray, args[args.length-2])) ? args[args.length-2] : "pc";
  var region = !args[args.length-1] ? "us" : (client.isInArray(regionArray, args[args.length-1])) ? args[args.length-1] : (!args[args.length-2]) ? "us" : (client.isInArray(regionArray, args[args.length-2])) ? args[args.length-2] : "us";
  request.get({
    url: `https://owapi.net/api/v3/u/${player[0]}-${player[1]}/blob?platform=${platform}`,
    json: true,
    headers: {'User-Agent': 'request'}
  }, (err, res, data) => {
    if (err) {
      return message.channel.send(':negative_squared_cross_mark: Error: ' + err);
    } else if (res.statusCode !== 200) {
      return message.channel.send(':negative_squared_cross_mark: Status: ' + res.statusCode);
    } else {
      data = data[region];
      if (search === "player") {    
        var p = data.stats.competitive.overall_stats;
        for (let rankRank of rankArray) {
          if (client.between(p.comprank, rankObj[rankRank][0], rankObj[rankRank][1])) {
            var rank = rankRank;
          }
        }
        for (let prestigePrestige of prestigeArray) {
          if (client.between(p.prestige, prestigeObj[prestigePrestige][1], prestigeObj[prestigePrestige][2])) {
            var prestigeColour = prestigeObj[prestigePrestige][0];
          }
        }
        let main = [
          `**Level:** ${p.prestige}-${p.level} (${parseInt((p.prestige * 100) + p.level)})`,
          `**Rank:** ${rank.toProperCase()} - ${p.comprank}`
        ];
        const statGame = (p) => {
          let total = [
            `- Kills: ${p.eliminations}`,
            `- Last Hits: ${p.final_blows}`,
            `- Melee: ${p.melee_final_blows}`,  
            `- Solo: ${p.solo_kills}`, 
            `- Objective: ${p.objective_kills}`,  
            `- Multikills: ${p.multikills}`,
            `- Offensive Assists: ${p.offensive_assists}`,
            `- Defensive Assists: ${p.defensive_assists}`,
            `- Recon Assits: ${p.recon_assists}`,
            `- Healing: ${p.healing_done}`,
            `- Damage Done: ${p.all_damage_done}`
            `- Barrier Damage Done: ${p.barrier_damage_done}`,
            `- Time on Fire: ${client.roundToTwo(p.time_spent_on_fire)}`
          ];
          let most = [
            `- Kills: ${p.eliminations_most_in_game}`,
            `- Last Hits: ${p.final_blows_most_in_game}`,
            `- Melee: ${p.melee_final_blow_most_in_game}`,
            `- Solo: ${p.solo_kills_most_in_game}`,
            `- Objective: ${p.objective_kills_most_in_game}`, 
            `- Multikills: ${p.multikills_most_in_game}`,
            `- Offensive Assists: ${p.offensive_assists_most_in_game}`,
            `- Defensive Assists: ${p.defensive_assists_most_in_game}`,
            `- Recon Assits: ${p.recon_assists_most_in_game}`,
            `- Healing: ${p.healing_done}`,
            `- Damage Done: ${p.all_damage_done_most_in_game}`,
            `- Barrier Damage Done: ${p.barrier_damage_done_most_in_game}`,
            `- Time on Fire: ${client.roundToTwo(p.time_spent_on_fire_most_in_game)}`
          ];
          let stats = [
            `**Total:** ${total.join('\n')}`,
            `**Most in One Match:** ${most.join('\n')}`,
            `**Time Played:** ${p.time_played} Hours`,
            `**Kills per Death:** ${p.kpd}`,
            `**Deaths:** ${p.deaths}`,
            `**Best Multi Kill:** ${p.multikill_best} People`,
            `**Best Kill Streak:** ${p.kill_streak_best}`,
            `**Medals:** Bronze: ${p.medals_bronze} / Silver: ${p.medals_silver} / Gold: ${p.medals_gold} / Total: ${p.medals}`,
            `**Cards:** ${p.cards}`
          ];
          stats = stats.join('\n');
          return stats;
        };
        const statAva = (p) => {
          let stats = [
            
          ];
          stats = stats.join('\n');
          return stats;
        };
        const playerEmbed = new Discord.RichEmbed()
          .setColor(prestigeColour)
          .setThumbnail(p.avatar)
          .addField(`${player[0]}#${player[1]}`, main.join('\n'))
          .addField(`Quick Play`, statGame(data.stats.quickplay.game_stats))
          .addField(`Competitive`, statGame(data.stats.competitive.game_stats));
        return message.channel.send({embed: playerEmbed});
      }
    }
  });
};

exports.cmdConfig = {
  name: "overwatch",
  aliases: ['ow'],
  description: "Gives Overwatch stats",
  usage: "overwatch",
  type: "info"
};
