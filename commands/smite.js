// get the discord.js lib so that we can actually do stuff
const Discord = require('discord.js');
// require so that we can make GET requests
const request = require('request');
// require moment so that we can get the date and time for the smite api easily
const moment = require('moment');
// require md5 so that we can hash our signature for the smite api
const md5 = require('md5');
// require util so that we can send the data in discord chat so we know the paths
const { inspect } = require("util");

// make it asynchronous so that later we can wait for the GET request data
exports.run = async (client, message, [search, ...args]) => {
  
  /*
      Help Section
  */
  
  // make search lowercase so when we use it it won't be case sensative
  if (search) search = search.toLowerCase();
  // make an empty array that we can add all the command names to later
  var cmdList = [];
  // here we have all the commands, there usage and a description
  var cmdArray = [
    ["player", "<player>", "Displays a players stats"],
    ["god", "<god>", "Displays infomation on a chosen God"],
    ["ability", "<god> <ability number>", "Displays the God ability"],
    ["item", "<item | term>", "not sure yet"],
    ["friends", "<player>", "Lists all of there friends without private profiles"]
  ];
  // we get the server settings so we know what embed colour they want on the help embed
  const settings = client.settings.get(message.guild.id);
  // make the help embed that will show all the command infomation on smite
  const helpEmbed = new Discord.RichEmbed()
    // set the colour to whatever the server setting colour it
    .setColor(settings.embedColour)
    // make the title 'smite help' so they know what the commands are for
    .setTitle('**Smite Help**');
  // we loop through all the commands. i could have used forEach maybe? i don't really know how to use that so i went for a for loop
  for (let [cmdName, cmdUsage, cmdDesc] of cmdArray) {
    // add the command name to the empty array we made earlier
    cmdList.push(cmdName);
    // make a new field for each of the commands showing the name, usage and description
    helpEmbed.addField(cmdName, `${settings.prefix}smite ${cmdName} ${cmdUsage}\n${cmdDesc}`);
  }
  // if they requested for the help command or if they didn't request for anything then it shows the list of commands
  if (search === "help" || search === undefined) {
    // sending the help embed. i returned it here because we don't need the rest of the code; we are done
    return message.channel.send({embed: helpEmbed});
  }
  // here is where i make aliases for some of the commands so that it is easier to use
  var aliaseObj = {
    "gods": "god",
    "items": "item"
  };
  // i make the aliases into an array so that it can be searched easier (a)
  var aliaseArray = Object.keys(aliaseObj);
  if (client.isInArray(aliaseArray, search) === true) search = aliaseObj[search];
  if (client.isInArray(cmdList, search) === false) return message.channel.send(':negative_squared_cross_mark: Unknown command');
  const domain = "http://api.smitegame.com/smiteapi.svc/";
  const devID = process.env.SMITEDEVID;
  let timestamp = moment().format('YYYYMMDDHHmmss');
  const authKey = process.env.SMITEAUTHID;
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
    "starter": "tier",
    "tier 1": "tier",
    "tier 2": "tier",
    "tier 3": "tier",
    "physical power": "offensive",
    "magical power": "offensive",
    "attack speed": "offensive",
    "physical lifesteal": "offensive",
    "magical lifesteal": "offensive",
    "physical penetration": "offensive",
    "magical penetration": "offensivce",
    "crit": "offensive",
    "crit chance": "offensive",
    "physical protection": "defensive",
    "magical protection": "defensive",
    "health": "defensive",
    "ccr": "defensive",
    "crowd control reduction": "defensive",
    "hp5": "defensive",
    "health per 5": "defensive",
    "health per five": "defensive",
    "movement": "utility",
    "movement speed": "utility",
    "cooldown": "utility",
    "cooldown %": "utility",
    "cool down": "utility",
    "mana": "utility",
    "mana per 5": "utility",
    "mana per five": "utility",
    "relic": "relic",
    "relics": "relic",
    "base": "relic",
    "upgraded": "relic",
    "consumable": "consumable",
    "consumables": "consumable"
  };
  var itemArray = Object.keys(itemObj);
  const testSession = async () => {
    var signature = createSignature("testsession");
    request.get({
      url: domain + `testsessionJson/${devID}/${signature}/${client.session.get("sessionID")}/${timestamp}`,
      json: true,
      headers: {'User-Agent': 'request'}
    }, (err, res, data) => {
      if (err) {
        return message.channel.send(':negative_squared_cross_mark: Error:' + err);
      } else if (res.statusCode !== 200) {
        return message.channel.send(':negative_squared_cross_mark: Status:' + res.statusCode);
      } else {
        // console.log(data);
        let message = data.split(' ');
        message = message[0] + message[1] + message[2];
        if (message === "Invalidsessionid.") {
          createSession();
          // console.log("A new session is being created");
        } else if (message === "Invalidsignature.Your") {
          // console.log("The signature was rejected");
          return message.channel.send(':negative_squared_cross_mark: Invaid signature? If this error pops up the bot is really broken. Lets hope i never have to read this again!');
        } else if (message === "Thiswasa") {
          // console.log("we good!");
        }
      }
    });
  };
  const createSession = async () => {
    var signature = createSignature("createsession");
    request.get({
      url: domain + `createsessionJson/${devID}/${signature}/${timestamp}`,
      json: true,
      headers: {'User-Agent': 'request'}
    }, (err, res, data) => {
      if (err) {
        return message.channel.send(':negative_squared_cross_mark: Error:' + err);
      } else if (res.statusCode !== 200) {
        return message.channel.send(':negative_squared_cross_mark: Status:' + res.statusCode);
      } else {
        client.session.set("sessionID", data.session_id);
      }
    });
  };
  testSession();
  await client.wait(1000);
  if (search === "player") {
    if (!args[0]) return message.channel.send(':negative_squared_cross_mark: Status: Who would you like me to look up?');
    requestData("getplayer", args[0]);
  } else if (search === "god" || search === "ability") {
    if (!args[0]) return message.channel.send(':negative_squared_cross_mark: Status: Which God would you like me to look up?');
    requestData("getgods", "1");
  } else if (search === "item") {
    if (!args[0]) return message.channel.send(':negative_squared_cross_mark: Status: Which item would you like me to look up?');
    requestData("getitems", "1");
  } else if (search === "friends") {
    if (!args[0]) return message.channel.send(':negative_squared_cross_mark: Status: Who would you like me to look up?');
    requestData("getfriends", args[0]);
  }
  function requestData(method, parameters) {
    var signature = createSignature(method);
    let url = domain + `${method}Json/${devID}/${signature}/${client.session.get("sessionID")}/${timestamp}`
    if (parameters) url += `/${parameters}`;
    // console.log(url);
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
        if (search === "player") {
          var p = data[0];
          if (!p) return message.channel.send(`:negative_squared_cross_mark: I could not find that player. Either \`${args[0]}\` is wrong or the profile is private`);
          let name = p["Name"].replace('[', '').split(']');
          let main = [
            `**Level:** ${p.Level}`,
            `**Status:** ${p.Personal_Status_Message}`,
            `**Clan:** [${name[0]}] ${p.Team_Name}`,
            `**Region:** ${p.Region}`,
            `**Mastery:** ${p.MasteryLevel} Gods, ${p.Total_Worshippers} total Worshippers`,
            `**Account Created:** ${p.Created_Datetime}`,
            `**Last Login:** ${p.Last_Login_Datetime}`,
            `**Achievements:** ${p.Total_Achievements}`
          ];
          let winrate = [
            `**Winrate:** ${parseInt(p.Wins) / (parseInt(p.Wins) + parseInt(p.Losses)) * 100}%\n**Wins:** ${p.Wins}`,
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
            .addField(name[1], main.join('\n'))
            .addField('Games', winrate.join('\n'))
            .addField('Ranked', ranked.join('\n'));      
          return message.channel.send({embed: playerEmbed});
        } else if (search === "god") {
          const findGod = (searchGod) => {
            return searchGod["Name"].toLowerCase() === args.join(' ').toLowerCase();
          }
          var g = data.find(findGod);
          if (!g) return message.channel.send(`:negative_squared_cross_mark: \`${args.join(' ')}\` is not a God`);
          let main = [
            `**Role:**${g.Roles}`,
            `**Pantheon:** ${g.Pantheon}`,
            `**Attack Type:**${g.Type}`,
            `**Pros:**${g.Pros}`
          ];
          if (g.OnFreeRotation === "true") {
            main.push(`**Free Rotation:** True`)
          } else {
            main.push(`**Free Rotation:** False`)
          }
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
          if (client.isInArray(itemArray, args.join(' ')) === true) {
            if (itemObj[args.join(' ')] === "tier") {
              return;
            }
          } else {
            const findItemByName = (searchItem) => {
              return searchItem["DeviceName"].toLowerCase() === args.join(' ').toLowerCase();
            };
            var i = data.find(findItemByName);
            if (!i) return message.channel.send(`:negative_squared_cross_mark: \`${args.join(' ')}\` is not an item or a searchable term`);
            if (i.Type === "item") {
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
              return message.channel.send({embed: itemEmbed});
            }
          }
        } else if (search === "friends") {
          var f = data;
          if (!f) return message.channel.send(`:negative_squared_cross_mark: I could not find that player. Either \`${args[0]}\` is wrong or the profile is private`);
          let friendsArray = [];
          for (let name of f) {
            if (name.name !== "") friendsArray.push(name.name)
          }
          return message.channel.send(`== ${args[0]} ==\n[Total Friends - ${f.length}]\n\n${friendsArray.join(', ')}`, {code: "asciidoc"});
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
