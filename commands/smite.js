const Discord = require('discord.js');
const request = require('request');
const moment = require('moment');
const md5 = require('md5');
const { inspect } = require("util");
const builds = require('../data/smitebuilds');

exports.run = async (client, message, [search, ...args]) => {
  const settings = client.settings.get(message.guild.id);
  search = search ? search.toLowerCase() : "help";
  var cmdObj = {
    "ability": {
      "name": "ability",
      "aliase": [],
      "usage": "<god> <ability number>",
      "desc": "Not sure yet, not done",
      "args": "Which God would you like me to look up?",
      "api": true,
      "method": "getgods",
      "parameter": "1"
    },
    "builds": {
      "name": "builds",
      "aliase": ["build"],
      "usage": "<god> <gamemode>",
      "desc": "Looks up a build for a God",
      "args": "Which God would you like builds for?",
      "api": true,
      "method": "getitems",
      "parameter": "1"
    },
    "god": {
      "name": "god",
      "aliase": ["gods"],
      "usage": "<god>",
      "desc": "Displays infomation on a chosen God",
      "args": "Which God would you like me to look up?",
      "api": true,
      "method": "getgods",
      "parameter": "1"
    },
    "friends": {
      "name": "friends",
      "aliase": ["friend"],
      "usage": "<player> [console]",
      "desc": "Displayes a list of the users friends (without private profiles)",
      "args": "Who would you like me to look up?",
      "api": true,
      "method": "getfriends",
      "parameter": args.join('-=++').replace(/_/g, ' ').split('-=++')
    },
    "help": {
      "name": "help",
      "aliase": ["h"],
      "usage": "",
      "desc": "Displayes all smite commands and how to use them",
      "args": null,
      "api": false
    },
    "item": {
      "name": "item",
      "aliase": ["items"],
      "usage": "<item || term>",
      "desc": "Displayes an item or a list of items",
      "args": "Which item or term would you like me to look up?",
      "api": true,
      "method": "getitems",
      "parameter": "1"
    },
    "joke": {
      "name": "joke",
      "aliase": [],
      "usage": "[number]",
      "desc": "Tells you a smite joke",
      "args": null,
      "api": false
    },
    "mastery": {
      "name": "mastery",
      "aliase": ["masteries"],
      "usage": "<player> [console] [number]",
      "desc": "Displays a players highest masteried Gods",
      "args": "Who would you like me to look up?",
      "api": true,
      "method": "getgodranks",
      "parameter": args.join('-=++').replace(/_/g, ' ').split('-=++')
    },
    "player": {
      "name": "player",
      "aliase": ["profile"],
      "usage": "<player> [console]",
      "desc": "Displays a players stats",
      "args": "Who would you like me to look up?",
      "api": true,
      "method": "getplayer",
      "parameter": args.join('-=++').replace(/_/g, ' ').split('-=++')
    }
  };
  var cmdArray = Object.keys(cmdObj);
  for (let cmd of cmdArray) {
    for (let i = 0; i < cmdObj[cmd]["aliase"].length; i++) {
      if (search === cmdObj[cmd].aliase[i]) search = cmd;
    }
  }
  if (client.isInArray(cmdArray, search) === false) return message.channel.send(':negative_squared_cross_mark: Unknown command');
  if (cmdObj[search].args !== null && !args[0]) return message.channel.send(cmdObj[search].args);
  var platformObj = {
    "pc": "pc",
    "psn": "ps4",
    "ps": "ps4",
    "ps4": "ps4",
    "xbox": "xbox",
    "xbox1": "xbox"
  };
  var platformArray = Object.keys(platformObj);
  var platform = client.isInArray(platformArray, args[args.length - 1]) ? platformObj[args[args.length - 1]] : (client.isInArray(platformArray, args[args.length - 2])) ? platformObj[args[args.length - 2]] : "pc";
  var domain = platform === "xbox" ? "http://api.xbox.smitegame.com/smiteapi.svc/" : (platform === "ps4") ? "http://api.ps4.smitegame.com/smiteapi.svc/" : "http://api.smitegame.com/smiteapi.svc/";
  var devID = process.env.SMITEDEVID;
  var timestamp = moment().format('YYYYMMDDHHmmss');
  var authKey = process.env.SMITEAUTHID;
  function createSignature(method) {
    return md5(`${devID}${method}${authKey}${timestamp}`);
  }
  var rankedTierObj = {
    "Unranked": "#ff0000",
    "Bronze V": "#a0460a",
    "Bronze IV": "#a0460a",
    "Bronze III": "#a0460a",
    "Bronze II": "#a0460a",
    "Bronze I": "#a0460a",
    "Silver V": "#a0a0a0",
    "Silver IV": "#a0a0a0",
    "Silver III": "#a0a0a0",
    "Silver II": "#a0a0a0",
    "Silver I": "#a0a0a0",
    "Gold V": "#dca032",
    "Gold IV": "#dca032",
    "Gold III": "#dca032",
    "Gold II": "#dca032",
    "Gold I": "#dca032",
    "Platinum V": "#508c28",
    "Platinum IV": "#508c28",
    "Platinum III": "#508c28",
    "Platinum II": "#508c28",
    "Platinum I": "#508c28",
    "Diamond V": "#2864c8",
    "Diamond IV": "#2864c8",
    "Diamond III": "#2864c8",
    "Diamond II": "#2864c8",
    "Diamond I": "#2864c8",
    "Masters": "#ff00ff"
  };
  var rankedTierArray = Object.keys(rankedTierObj);
  var roleObj = {
    "assassin": "#ffff00",
    "guardian": "#14ff00",
    "hunter": "#ff6400",
    "mage": "#ff00ff",
    "warrior": "#ff0000"
  };
  var itemObj = {
    "starter": ["StartingItem", true],
    "tier 1": ["ItemTier", 1, "StartingItem", false, "Type", "Item"],
    "tier 2": ["ItemTier", 2, "Type", "Item"],
    "tier 3": ["ItemTier", 3],
    "physical power": ["Physical Power"],
    "magical power": ["Magical Power"],
    "attack speed": ["Attack Speed"],
    "physical lifesteal": ["Physical Lifesteal"],
    "magical lifesteal": ["Magical Lifesteal"],
    "physical penetration": ["Physical Penetration"],
    "magical penetration": ["Magical Penetration"],
    "crit": ["Critical Strike Chance"],
    "crit chance": ["Critical Strike Chance"],
    "physical protection": ["Physical Protection"],
    "magical protection": ["Magical Protection"],
    "health": ["Health"],
    "ccr": ["Crowd Control Reduction"],
    "crowd control reduction": ["Crowd Control Reduction"],
    "hp5": ["HP5"],
    "health per 5": ["HP5"],
    "health per five": ["HP5"],
    "movement": ["Movement Speed"],
    "movement speed": ["Movement Speed"],
    "cooldown": ["Cooldown Reduction"],
    "cooldown %": ["Cooldown Reduction"],
    "cool down": ["Cooldown Reduction"],
    "mana": ["Mana"],
    "mana per 5": ["MP5"],
    "mana per five": ["MP5"],
    "relic": ["Type", "Active", "ItemTier", 2],
    "relics": ["Type", "Active", "ItemTier", 2],
    "consumable": ["Type", "Consumable"],
    "consumables": ["Type", "Consumable"]
  };
  var itemArray = Object.keys(itemObj);
  var gamemodeObj = {
    "arena": "normalArena",
    "assault": "normalAssault",
    "joust": "normalJoust",
    "siege": "normalSiege",
    "conq": "normalConquest",
    "conquest": "normalConquest",
    "clash": "normalClash",
    "rConq": "rankedConquest",
    "rConquest": "rankedConquest",
    "rDuels": "rankedDuels",
    "rJoust": "rankedJoust"
  };
  var gamemodeArray = Object.keys(gamemodeObj);
  if (cmdObj[search].api === true) {
    requestData(cmdObj[search].method, cmdObj[search].parameter);
  } else {
    commands();
  }
  function commands() {
    if (search === "help") {
      const helpEmbed = new Discord.RichEmbed()
        .setColor(settings.embedColour)
        .setTitle('**Smite Help**');
      for (let cmd of cmdArray) {
        helpEmbed.addField(cmdObj[cmd].name, `${settings.prefix}smite ${cmdObj[cmd].usage}\n${cmdObj[cmd].desc}`);
      }
      return message.channel.send({embed: helpEmbed});
    } else if (search === "joke") {
      var jokeArrayArray = [
        ["Why does everyone think Bacchus is so annoying?", "Because he's always whining", "/u/MaggehG"],
        ["What is Sol's favourite movie?", "Twilight: Breaking Down", "/u/MaggehG"],
        ["Why does everyone think that Xing Tian uses drugs?", "Because he's always Xing things", "/u/MaggehG"],
        ["What type of camera does Vulcan use?", "A cannon", "/u/barblebapkins"],
        ["Why does Medusa make the best weed dealer?", "She loves to help people get stoned", "/u/barblebapkins"],
        ["Did you hear He Bo used to be a celebrity?", "Now he's all washed up", "/u/barblebapkins"],
        ["I told a joke about Awilix to my friend,", "but it went over his head", "/u/barblebapkins"],
        ["Why isn't Sobek ever in a serious relationship?", "Because all he's ever looking for is a fling", "/u/xdapenguinx"],
        ["What's Bellona's favourite restaurant?", "Taco Bellona", "/u/MaggehG"],
        ["Rexsi's winrate", "166641492113358848"]
      ];
      let jokeArray = Object.keys(jokeArrayArray);
      let jokeNumber = /^\d+$/.test(args[0]) ? (jokeArrayArray.length < args[0]) ? client.randomNum(1, jokeArrayArray.length) : args[0] : client.randomNum(1, jokeArrayArray.length);
      let credit = /^\d+$/.test(jokeArrayArray[jokeNumber - 1][jokeArrayArray[jokeNumber - 1].length - 1]) ? `${client.users.get(jokeArrayArray[jokeNumber - 1][jokeArrayArray[jokeNumber - 1].length - 1]).username}#${client.users.get(jokeArrayArray[jokeNumber - 1][jokeArrayArray[jokeNumber - 1].length - 1]).discriminator}` : jokeArrayArray[jokeNumber - 1][jokeArrayArray[jokeNumber - 1].length - 1];
      const jokeEmbed = new Discord.RichEmbed()
        .setColor(settings.embedColour)
        .setFooter(`#${jokeNumber} credit: ${credit}`);
      if (jokeArrayArray[jokeNumber - 1].length === 2) jokeEmbed.setTitle(jokeArrayArray[jokeNumber - 1][0]);
      if (jokeArrayArray[jokeNumber - 1].length === 3) jokeEmbed.addField(`:regional_indicator_q: ${jokeArrayArray[jokeNumber - 1][0]}`, `:regional_indicator_a: ${jokeArrayArray[jokeNumber - 1][1]}`);
      return message.channel.send({embed: jokeEmbed});
    }
  }
  function testSession() {
    var signature = createSignature("testsession");
    request.get({
      url: domain + `testsessionJson/${devID}/${signature}/${client.session.get(`session{platform}`)}/${timestamp}`,
      json: true,
      headers: {'User-Agent': 'request'}
    }, (err, res, data) => {
      if (err) {
        return message.channel.send(':negative_squared_cross_mark: Error: ' + err);
      } else if (res.statusCode !== 200) {
        return message.channel.send(':negative_squared_cross_mark: Status: ' + res.statusCode);
      } else {
        let message = data.split(' ');
        message = message[0] + message[1] + message[2];
        if (message === "Invalidsessionid.") {
          createSession();
        } else if (message === "Invalidsignature.Your") {
          return message.channel.send(':negative_squared_cross_mark: Invaid signature? If this error pops up the bot is really broken. Lets hope i never have to read this again!');
        }
      }
    });
  };
  function createSession () {
    var signature = createSignature("createsession");
    request.get({
      url: domain + `createsessionJson/${devID}/${signature}/${timestamp}`,
      json: true,
      headers: {'User-Agent': 'request'}
    }, (err, res, data) => {
      if (err) {
        return message.channel.send(':negative_squared_cross_mark: Error: ' + err);
      } else if (res.statusCode !== 200) {
        return message.channel.send(':negative_squared_cross_mark: Status: ' + res.statusCode);
      } else {
        client.session.set(`session${platform}`, data.session_id);
      }
    });
  };
  async function requestData (method, parameters) {
    testSession();
    await client.wait(1000);
    var signature = createSignature(method);
    let url = domain + `${method}Json/${devID}/${signature}/${client.session.get(`session${platform}`)}/${timestamp}/${parameters}`;
    request.get({
      url: url,
      json: true,
      headers: {'User-Agent': 'request'}
    }, (err, res, data) => {
      if (err) {
        return message.channel.send(':negative_squared_cross_mark: Error: ' + err);
      } else if (res.statusCode !== 200) {
        return message.channel.send(':negative_squared_cross_mark: Status: ' + res.statusCode);
      } else {
        if (search === "builds") {
          let gm =  ? (args[args.length - 2].toLowerCase() === "ranked") ? args.splice(args.length - 2) : args.splice(args.length - 1) : ""
          gm = gm.length === 2 ? 'r' + gm[1].toProperCase() : gm[0].toLowerCase();
          if (!builds[args.join(' ')]) return message.channel.send(`:negative_squared_cross_mark: \`${args.join(' ').toProperCase()}\` is not a God`);
          if (client.isInArray(gamemodeArray, gm) === false) return (`:negative_squared_cross_mark: \`${gm}\` is not a gamemode`);
          if (gm) return
          const buildEmbed = new Discord.RichEmbed()
            .setColor(settings.embedColour)
            .setTitle(`Builds for ${args.join(' ').toProperCase()}`)
        } else if (search === "player") {
          if (!data[0]) return message.channel.send(`:negative_squared_cross_mark: I could not find that player. Either \`${args[0].replace(/_/g, ' ')}\` is wrong or the profile is private`);
          var p = data[0];
          if (p["Name"].startsWith('[') === true) {
            var name = p["Name"].replace('[', '').split(']');
            var clan = `[${name[0]}] ${p.Team_Name}`;
            name = name[1];
          } else {
            var name = p.Name;
            var clan = 'Not in a clan';
          }
          let main = [
            `**Level:** ${p.Level}`,
            `**Status:** ${p.Personal_Status_Message}`,
            `**Clan:** ${clan}`,
            `**Region:** ${p.Region}`,
            `**Mastery:** ${p.MasteryLevel} Gods, ${p.Total_Worshippers} total Worshippers`,
            `**Account Created:** ${p.Created_Datetime}`,
            `**Last Login:** ${p.Last_Login_Datetime}`,
            `**Achievements:** ${p.Total_Achievements}`
          ];
          let winrate = [
            `**Winrate:** ${parseInt(p.Wins) / (parseInt(p.Wins) + parseInt(p.Losses)) * 100}%`,
            `**Total Games Played:** ${parseInt(p.Wins) + parseInt(p.Losses)}`,
            `**Wins:** ${p.Wins}`,
            `**Losses:** ${p.Losses}`,
            `**Matches Left:** ${p.Leaves}`
          ];
          let ranked = [
            `**Conquest:** ${rankedTierArray[p.Tier_Conquest]}`,
            `**Duel:** ${rankedTierArray[p.Tier_Duel]}`,
            `**Joust:** ${rankedTierArray[p.Tier_Joust]}`
          ];
          let rankColour = [p.Tier_Conquest, p.Tier_Duel, p.Tier_Joust];
          rankColour = rankedTierObj[rankedTierArray[Math.max.apply(Math, rankColour)]];
          const playerEmbed = new Discord.RichEmbed()
            .setColor(rankColour)
            .setThumbnail(p.Avatar_URL)
            .addField(name, main.join('\n'))
            .addField('Games', winrate.join('\n'))
            .addField('Ranked', ranked.join('\n'));
          return message.channel.send({embed: playerEmbed});
        } else if (search === "mastery") {
          if (!data[0]) return message.channel.send(`:negative_squared_cross_mark: I could not find that player. Either \`${args[0].replace(/_/g, ' ')}\` is wrong or the profile is private`);
          var m = data;
          let s = args[0].replace(/_/g, ' ').substr(args.length - 1) === "s" ? "" : "s";
          const masteryEmbed = new Discord.RichEmbed()
            .setColor(settings.embedColour)
            .setTitle(`${args.join(' ')}'${s} Masteries`);
          let number = /^\d+$/.test(args[args.length - 1]) ? (args[args.length - 1] > 19) ? 20 : args[args.length - 1] : 5;
          for (var i = 0; i < number; i++) {
            if (m.length > 0) {
              var hm = m.reduce(function(l, e) {
              return e.Worshippers > l.Worshippers ? e : l;
            });
            let main = [
              `**Mastery:** ${client.romanize(hm.Rank)}`,
              `**Worshippers:** ${hm.Worshippers}`,
              `**Win / Lose:** ${hm.Wins} / ${hm.Losses}`,
              `**K / D / A:** ${hm.Kills} / ${hm.Deaths} / ${hm.Assists}`,
              `**Minion Kills:** ${hm.MinionKills}`
            ];
            masteryEmbed.addField(hm.god, main.join('\n'));
            client.removeObjectFromArrayOfObjectsFromKeyAndValue(m, "god", hm.god);
            }
          }
          return message.channel.send({embed: masteryEmbed});
        } else if (search === "god") {
          const findGod = (searchGod) => {
            return searchGod["Name"].toLowerCase() === args.join(' ').toLowerCase();
          }
          var g = data.find(findGod);
          if (!g) return message.channel.send(`:negative_squared_cross_mark: \`${args.join(' ').toProperCase()}\` is not a God`);
          let rotation = g.OnFreeRotation === "true" ? "Yes" : "No";
          let main = [
            `**Role:**${g.Roles}`,
            `**Pantheon:** ${g.Pantheon}`,
            `**Attack Type:**${g.Type}`,
            `**Pros:**${g.Pros}`,
            `**Free Rotation:** ${rotation}`
          ];
          if (g.latestGod === "y") main.push(`Currently the newest God`);
          let abilities = [
            `**P:** ${g.Ability1}`,
            `**1:** ${g.Ability2}`,
            `**2:** ${g.Ability3}`,
            `**3:** ${g.Ability4}`,
            `**4:** ${g.Ability5}`
          ];
          let stats = [
            [`**Attack Speed:** ${g.AttackSpeed}`, g.AttackSpeedPerLevel],
            [`**Health:** ${g.Health}`, g.HealthPerLevel],
            [`**HP5:** ${g.HealthPerFive}`, g.HP5PerLevel],
            [`**Mana:** ${g.Mana}`, g.ManaPerLevel],
            [`**MP5:** ${g.ManaPerFive}`, g.MP5PerLevel],
            [`**Magical Protection:** ${g.MagicProtection}`, g.MagicProtectionPerLevel],
            [`**Physical Protection:** ${g.PhysicalProtection}`, g.PhysicalProtectionPerLevel]
          ];
          if (g.MagicalPower === 0) {
            stats.unshift([`**Physical Power:** ${g.PhysicalPower}`, g.PhysicalPowerPerLevel]);
          } else {
            stats.unshift([`**Magical Power:** ${g.MagicalPower}`, g.MagicalPowerPerLevel]);
          }
          let basicDamage = g.basicAttack.itemDescription.menuitems[0].value;
          basicDamage = basicDamage.replace('/', ' ').split(' ');
          stats.push([`**Basic Damage:** ${basicDamage[0]} ${basicDamage[4].replace('(', '')}`, basicDamage[2]]);
          let baseStats = [];
          let perLevel = [];
          for (let [base, level] of stats) {
            baseStats.push(base);
            perLevel.push(level);
          }
          const godEmbed = new Discord.RichEmbed()
            .setColor(roleObj[g["Roles"].replace(' ', '').toLowerCase()])
            .setThumbnail(g.godIcon_URL)
            .addField(`${g.Name} - ${g.Title}`, main.join('\n'))
            .addField('Abilities', abilities.join('\n'))
            .addField("Base Stats", baseStats.join('\n'), true)
            .addField("Per level", perLevel.join('\n'), true);
          return message.channel.send({embed: godEmbed});
        } else if (search === "ability") {
          return message.channel.send('WIP');
        } else if (search === "item") {
          if (args.join(' ').toLowerCase() === "fatalis") return message.channel.send('aids');
          if (client.isInArray(itemArray, args.join(' ')) === true) {
            var filterItemArray = [];
              for (const item of data) {
                if (itemObj[args.join(' ')].length === 1) {
                  item.ItemDescription["Menuitems"].forEach(function(stat) {
                    if (stat.Description === itemObj[args.join(' ')][0]) filterItemArray.push(item.DeviceName);
                  });
                } else if (itemObj[args.join(' ')].length === 2) {
                  if (item[itemObj[args.join(' ')][0]] === itemObj[args.join(' ')][1]) filterItemArray.push(item.DeviceName);
                } else if (itemObj[args.join(' ')].length === 4) {
                  if (item[itemObj[args.join(' ')][0]] === itemObj[args.join(' ')][1] && item[itemObj[args.join(' ')][2]] === itemObj[args.join(' ')][3]) filterItemArray.push(item.DeviceName);
                } else if (itemObj[args.join(' ')].length === 6) {
                  if (item[itemObj[args.join(' ')][0]] === itemObj[args.join(' ')][1] && item[itemObj[args.join(' ')][2]] === itemObj[args.join(' ')][3] && item[itemObj[args.join(' ')][4]] === itemObj[args.join(' ')][5]) filterItemArray.push(item.DeviceName);
                }
              }
            return message.channel.send(`**[${filterItemArray.length}] ${args.join(' ').toProperCase()}:**\n` + filterItemArray.sort().join(', '));
          } else {
            const findItemByName = (searchItem) => {
              return searchItem["DeviceName"].toLowerCase() === args.join(' ').toLowerCase();
            };
            var i = data.find(findItemByName);
            if (!i) return message.channel.send(`:negative_squared_cross_mark: \`${args.join(' ').toProperCase()}\` is not an item or a searchable term`);
            if (i.Type === "Item") {
              let stats = [];
              for (let stat of i.ItemDescription.Menuitems) {
                stats.push(`${stat.Value} ${stat.Description}`);
              }
              let main = [
                `**Stats:**\n${stats.join('\n')}`
              ];
              var child = client.searchArrayOfObjects(data, "ItemId", i.ChildItemId);
              var root = client.searchArrayOfObjects(data, "ItemId", i.RootItemId);
              if (i.StartingItem) {
                main.unshift(`**Item Tier:** Starter`);
                main.unshift(`**Price:** ${i.Price}`);
              } else {
                main.unshift(`**Item Tier:** ${i.ItemTier}`);
                if (i.ItemTier === 1) {
                  main.unshift(`**Price:** ${i.Price}`);
                } else if (i.ItemTier === 2) {
                  main.unshift(`**Price:** ${i.Price} (${child.Price})`);
                } else if (i.ItemTier === 3) {
                  main.unshift(`**Price:** ${i.Price} (${parseInt(child.Price) + parseInt(root.Price)})`);
                }
              }
              if (i.ItemDescription.SecondaryDescription !== "" && i.ItemDescription.SecondaryDescription !== null) {
                main.unshift(`**Effect:** ${i.ItemDescription.SecondaryDescription}`);
              } else if (i.ItemDescription.Description !== "" && i.ItemDescription.Description !== null) {
                main.unshift(`**Effect:** ${i.ItemDescription.Description}`);
              } else if (i.ShortDesc !== "" && i.ShortDesc !== null) {
                main.unshift(`**Effect:** ${i.ShortDesc}`);
              }
              const itemEmbed = new Discord.RichEmbed()
                .setThumbnail(i.itemIcon_URL)
                .addField(i.DeviceName, main.join('\n'));
              let colour;
              i.ItemDescription["Menuitems"].forEach(function(stat) {
                colour = stat["Description"].split(' ').includes("Physical") ? '#ff0000': (stat["Description"].split(' ').includes("Magical")) ? '#0050ff' : '#ff00ff'
                itemEmbed.setColor(colour)
              });
              return message.channel.send({embed: itemEmbed});
            } else if (i.Type === "Active") {
              let desc = i.ItemDescription["SecondaryDescription"].replace("<font color='#FFFF00'>", '').replace("</font>", '').split(' Cooldown - ');
              const relicEmbed = new Discord.RichEmbed()
                .setColor('#14ff00')
                .setThumbnail(i.itemIcon_URL)
                .addField(i.DeviceName, `**Effect:** ${desc[0]}\n**Cooldown:** ${desc[1]}`);
              return message.channel.send({embed: relicEmbed});
            } else if (i.Type === "Consumable") {
              const consumableEmbed = new Discord.RichEmbed()
                .setColor('#ff6400')
                .setThumbnail(i.itemIcon_URL)
                .addField(i.DeviceName, `**Effect:** ${i.ItemDescription.SecondaryDescription}\n**Cost:** ${i.Price}`);
              return message.channel.send({embed: consumableEmbed});
            }
          }
        } else if (search === "friends") {
          var f = data;
          if (!f) return message.channel.send(`:negative_squared_cross_mark: I could not find that player. Either \`${args[0].replace(/_/g, ' ')}\` is wrong or the profile is private`);
          let friendsArray = [];
          for (let name of f) {
            if (name.name !== "") friendsArray.push(name.name)
          }
          return message.channel.send(`== ${args[0].replace(/_/g, ' ')} ==\n[Total Friends - ${f.length}]\n\n${friendsArray.join(', ')}`, {code: "asciidoc"});
        }
      }
    });
  }
};

exports.cmdConfig = {
  name: "smite",
  aliases: ['smit'],
  description: "Work in progress",
  usage: "smite <command> [arguments]",
  type: "info"
};
