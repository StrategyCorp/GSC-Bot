const Discord = require('discord.js');
const db = require('../data/smite.json');

exports.run = (client, message, args) => {
  let search = args[0];
  if (search) search = search.toLowerCase();
  if (search === "help" || search === undefined) {
    var cmdArray = [
      ["god", "<god>", "Displays infomation on a chosen God"],
      ["ability", "<ability> <god>", "Displays infomation on a chosen Gods ability"],
      ["stats", "<lvl> <god>", "Displays the stats on a chosen God at a chosen level"],
      ["achievement", "[achievement] <god>", "Displays a random or chosen achievement for a chosen God"],
      ["details", "", "Displays which Gods have been added and what smite patch the stats are for"]
    ];
    const settings = client.settings.get(message.guild.id);
    const helpEmbed = new Discord.RichEmbed()
      .setColor(settings.embedColour)
      .setTitle('**Smite Help**');
    for (let [cmdName, cmdUsage, cmdDesc] of cmdArray) {
       helpEmbed.addField(cmdName, `${settings.prefix}smite ${cmdName} ${cmdUsage}\n${cmdDesc}`);
    }
    message.channel.send({embed: helpEmbed});
  } else if (search === "god" || search === "g") {
    let god = args.slice(1).join(' ');
    if (!god) return message.channel.send(':negative_squared_cross_mark: You must give me a God to search');
    god = db.gods[god.toLowerCase()];
    if (god === undefined) return message.channel.send(':negative_squared_cross_mark: That is not a recognised God');
    const godEmbed = new Discord.RichEmbed()
      .setColor(god.colour)
      .setThumbnail(god.pic)
      .addField(god.name, god.title)
      .addField('Pantheon', god.pan)
      .addField('Role', god.role)
      .addField('Cost', `Favor: ${god.favor}\nGems: ${god.gems}`)
      .addField('Release Date', god.release)
      .addField('Reveal Video', god.reveal)
      .addField('Wiki', god.wiki);
    message.channel.send({embed: godEmbed});
  } else if (search === "ability" || search === "a") {
    let ability = args[1];
    if (!ability) return message.channel.send(':negative_squared_cross_mark: You must give an ability (0/passeive, 1, 2, 3, 4/ult/ultimate)');
    const abl = {
      0: "passive",
      passive: "passive",
      1: "1",
      2: "2",
      3: "3",
      4: "4",
      ult: "4",
      ultimate: "4"
    };
    if (abl[ability] === undefined) return message.channel.send(':negative_squared_cross_mark: That is not an ability (0/passive, 1, 2, 3, 4/ultimate)');
    let god = args.slice(2).join(' ');
    if (!god) return message.channel.send(':negative_squared_cross_mark: You must give me a God to search');
    god = db.gods[god.toLowerCase()];
    if (god === undefined) return message.channel.send(':negative_squared_cross_mark: That is not a recognised God');
    god = god.abil[abl[ability]];
    const abilityEmbed = new Discord.RichEmbed()
      .setColor(db.gods[args.slice(2).join(' ').toLowerCase()].colour)
      .setThumbnail(god.pic)
      .addField(god.name, god.desc)
      .addField('Ability Type:', god.type)
      .addField('Stats', god.stats.join(',\n'))
      .addField('Mana Cost', god.cost.join('/') + ' Mana')
      .addField('Cooldown', god.cd.join('/') + ' Seconds')
      .addField('Video', god.vid);
    message.channel.send({embed: abilityEmbed});
  } else if (search === "stats" || search === "s") {
    let level = args[1];
    if (!level || isNaN(level)) return message.channel.send(":negative_squared_cross_mark: You must select a level between 1 and 20");
    level = parseInt(level);
    //if (1 <= level && level <= 20) return message.channel.send(":negative_squared_cross_mark: You must select a level between 1 and 20");
    let god = args.slice(2).join(' ');
    if (!god) return message.channel.send(':negative_squared_cross_mark: You must give me a God to search');
    god = db.gods[god.toLowerCase()];
    if (god === undefined) return message.channel.send(':negative_squared_cross_mark: That is not a recognised God');
    god = god.stats;
    function scale(base, scale) {
      base[0] + (level * scale[1]);
    }
    let health = god.stat.health[0] + (level * god.stat.health[1]);
    let mana = god.stat.mana[0] + (level * god.stat.mana[1]);
    let speed = god.stat.speed[0] + (level * god.stat.speed[1]);
    let damage = god.basic.damage[0] + (level * god.basic.damage[1]);
    let as = god.basic.as[0] + (level * god.basic.as[1]);
    let phys = god.prot.phys[0] + (level * god.prot.phys[1]);
    let magi = god.prot.magi[0] + (level * god.prot.magi[1]);
    let hp = god.regen.hp[0] + (level * god.regen.hp[1]);
    let mp = god.regen.mp[0] + (level * god.regen.mp[1]);
    const statEmbed = new Discord.RichEmbed()
      .setColor(db.gods[args.slice(2).join(' ').toLowerCase()].colour)
      .setThumbnail(db.gods[args.slice(2).join(' ').toLowerCase()].pic)
      .addField('Stats', `Health: ${health}\nMana: ${mana}\nMovement Speed: ${speed}\nRange: ${god.stat.range}`)
      .addField('Basic Attacks', `Damage: ${damage} + ${god.basic.damage[2]}%\nAttack Speed: ${as}\nProgression: ${god.basic.progression}`)
      .addField('Regen', `HP5: ${hp}\nMP5: ${mp}`);
    message.channel.send({embed: statEmbed});
  } else if (search === "detail" || search === "details" || search === "info" || search === 'infomation') {
    let godArray = new Array();
    for (var o in db.gods) {
      godArray.push(db.gods[o].name);
    }
    const settings = client.settings.get(message.guild.id);
    const detailEmbed = new Discord.RichEmbed()
      .setColor(settings.embedColour)
      .addField(`Smite Patch: ${db.patchVersion}`, godArray.join(', '));
    message.channel.send({embed: detailEmbed});
  }
};

exports.cmdConfig = {
  name: "smite",
  aliases: [],
  description: "Work in progress",
  usage: "smite",
  type: "info"
};
