const Discord = require("discord.js");
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const Enmap = require("enmap");
const EnmapLevel = require("enmap-level");
const client = new Discord.Client();
var fs = require('fs');
module.exports.run = async (userg, message, args) => {
if(message.member.roles.find("name", "Bot Admin")){
var userg= message.mentions.members.first();
var roleArray = userg.roles.filter(r => r.id !== message.guild.id).map(role => role.name).join(', ');
if(roleArray.includes("IN-Processing")){
userg.setUsername(`[GS-01] BFO ${userg}`)
userg.addRole(message.guild.roles.find("name", "Clearance Level -1 (CL-1)"))
userg.addRole(message.guild.roles.find("name", "[GS-01] Basic Field Officer")) 
userg.removeRole(message.guild.roles.find("name", "IN-Processing"))
userg.addRole(message.guild.roles.find("name", "BE ADVISED!!!!"))
userg.addRole(message.guild.roles.find("name", "GSC"))
userg.addRole(message.guild.roles.find("name", "All-Callsigns-CMD") )
  var file_path = `/app/.data/${userg}`;
  fs.appendFile(`${file_path}`,"\n")
  var date = new Date().toLocaleString("en-US", {timeZone: "America/Denver"});
  var dataf = date+" MDT "+"RankUp to 01"+`\` log from \`${message.author}`
  var datafs = dataf.replace(/,/g," ");
  fs.appendFile(`${file_path}`, datafs , function (err) {
  if (err) throw err;
  console.log(`Saved! ${userg}`);
});
}else{
if(roleArray.includes("[GS-01] Basic Field Officer")){
userg.setUsername(`[GS-02] FO ${userg}`)
userg.addRole(message.guild.roles.find("name", "[GS-02]  Field Officer") )
userg.removeRole(message.guild.roles.find("name", "[GS-01] Basic Field Officer"))
  var file_path = `/app/.data/${userg}`;
  fs.appendFile(`${file_path}`,"\n")
  var date = new Date().toLocaleString("en-US", {timeZone: "America/Denver"});
  var dataf = date+" MDT "+"RankUp to GSC-02"+`\` log from \`${message.author}`
  var datafs = dataf.replace(/,/g," ");
  fs.appendFile(`${file_path}`, datafs , function (err) {
  if (err) throw err;
  console.log(`Saved! ${userg}`);
});
}else{
if(roleArray.includes("[GS-02]  Field Officer")){
userg.setUsername(`[GS-03] FO ${userg}`)
userg.addRole(message.guild.roles.find("name", "[GS-03]  Field Officer")) 
userg.removeRole(message.guild.roles.find("name", "[GS-02]  Field Officer"))
  var file_path = `/app/.data/${userg}`;
  fs.appendFile(`${file_path}`,"\n")
  var date = new Date().toLocaleString("en-US", {timeZone: "America/Denver"});
  var dataf = date+" MDT "+"RankUp to GSC-03"+`\` log from \`${message.author}`
  var datafs = dataf.replace(/,/g," ");
  fs.appendFile(`${file_path}`, datafs , function (err) {
  if (err) throw err;
  console.log(`Saved! ${userg}`);
  });
}else{
if(roleArray.includes("[GS-03]  Field Officer")){
userg.setUsername(`[GS-04] FO ${userg}`)
userg.addRole(message.guild.roles.find("name", "[GS-04]  Field Officer")) 
userg.removeRole(message.guild.roles.find("name", "[GS-03]  Field Officer"))
    var file_path = `/app/.data/${userg}`;
  fs.appendFile(`${file_path}`,"\n")
  var date = new Date().toLocaleString("en-US", {timeZone: "America/Denver"});
  var dataf = date+" MDT "+"RankUp to GSC-04"+`\` log from \`${message.author}`
  var datafs = dataf.replace(/,/g," ");
  fs.appendFile(`${file_path}`, datafs , function (err) {
  if (err) throw err;
  console.log(`Saved! ${userg}`);
    });
}else{
if(roleArray.includes("[GS-04]  Field Officer")){
userg.user.setUsername(`[GS-05] FS ${userg}`)
userg.addRole(message.guild.roles.find("name", "[GS-05]  Field Specialist")) 
userg.removeRole(message.guild.roles.find("name", "[GS-04]  Field Officer"))
      var file_path = `/app/.data/${userg}`;
  fs.appendFile(`${file_path}`,"\n")
  var date = new Date().toLocaleString("en-US", {timeZone: "America/Denver"});
  var dataf = date+" MDT "+"RankUp to GSC-05"+`\` log from \`${message.author}`
  var datafs = dataf.replace(/,/g," ");
  fs.appendFile(`${file_path}`, datafs , function (err) {
  if (err) throw err;
  console.log(`Saved! ${userg}`);
    });
  }else{
if(roleArray.includes("[GS-05]  Field Specialist")){
message.guild.member(`${userg}`).setNickname(`[GS-06] FS ${userg}`)
  userg.addRole(message.guild.roles.find("name", "[GS-06]  Field Coordinator")) 
  userg.addRole(message.guild.roles.find("name", "Clearance Level -2 (CL-2)")) 
  userg.removeRole(message.guild.roles.find("name", "[GS-05]  Field Specialist"))
  userg.removeRole(message.guild.roles.find("name", "Clearance Level -1 (CL-1)"))
      var file_path = `/app/.data/${userg}`;
  fs.appendFile(`${file_path}`,"\n")
  var date = new Date().toLocaleString("en-US", {timeZone: "America/Denver"});
  var dataf = date+" MDT "+"RankUp to GSC-06"+`\` log from \`${message.author}`
  var datafs = dataf.replace(/,/g," ");
  fs.appendFile(`${file_path}`, datafs , function (err) {
  if (err) throw err;
  console.log(`Saved! ${userg}`);
    });
  }else{
if(roleArray.includes("[GS-06]  Field Coordinator")){
  userg.addRole(message.guild.roles.find("name", "[GS-07]  Field Coorinator 2"))
  userg.addRole(message.guild.roles.find("name", "Clearance Level -2 (CL-2)")) 
  userg.removeRole(message.guild.roles.find("name", "Clearance Level -1 (CL-1)"))
      var file_path = `/app/.data/${userg}`;
  fs.appendFile(`${file_path}`,"\n")
  var date = new Date().toLocaleString("en-US", {timeZone: "America/Denver"});
  var dataf = date+" MDT "+"RankUp to GSC-07"+`\` log from \`${message.author}`
  var datafs = dataf.replace(/,/g," ");
  fs.appendFile(`${file_path}`, datafs , function (err) {
  if (err) throw err;
  console.log(`Saved! ${userg}`);
    });
  }else{
if(roleArray.includes("[GS-07]  Field Coorinator 2")){
  userg.addRole(message.guild.roles.find("name", "[GS-08] Field Operations Officer"))
  userg.removeRole(message.guild.roles.find("name", "[GS-07]  Field Coorinator 2")) 
        var file_path = `/app/.data/${userg}`;
  fs.appendFile(`${file_path}`,"\n")
  var date = new Date().toLocaleString("en-US", {timeZone: "America/Denver"});
  var dataf = date+" MDT "+"RankUp to GSC-08"+`\` log from \`${message.author}`
  var datafs = dataf.replace(/,/g," ");
  fs.appendFile(`${file_path}`, datafs , function (err) {
  if (err) throw err;
  console.log(`Saved! ${userg}`);
    });
  }else{
if(roleArray.includes("[GS-08] Field Operations Officer")){
  userg.addRole(message.guild.roles.find("name", "[GS-09] Duty Ops Officer"))
  userg.removeRole(message.guild.roles.find("name", "[GS-08] Field Operations Officer")) 
        var file_path = `/app/.data/${userg}`;
  fs.appendFile(`${file_path}`,"\n")
  var date = new Date().toLocaleString("en-US", {timeZone: "America/Denver"});
  var dataf = date+" MDT "+"RankUp to GSC-09"+`\` log from \`${message.author}`
  var datafs = dataf.replace(/,/g," ");
  fs.appendFile(`${file_path}`, datafs , function (err) {
  if (err) throw err;
  console.log(`Saved! ${userg}`);
    });
}else{
if(roleArray.includes("[GS-09] Duty Ops Officer")){
  userg.addRole(message.guild.roles.find("name", "[GS-10] Field Training Officer"))
  userg.removeRole(message.guild.roles.find("name", "[GS-09] Duty Ops Officer")) 
        var file_path = `/app/.data/${userg}`;
  fs.appendFile(`${file_path}`,"\n")
  var date = new Date().toLocaleString("en-US", {timeZone: "America/Denver"});
  var dataf = date+" MDT "+"RankUp to GSC-10"+`\` log from \`${message.author}`
  var datafs = dataf.replace(/,/g," ");
  fs.appendFile(`${file_path}`, datafs , function (err) {
  if (err) throw err;
  console.log(`Saved! ${userg}`);
    });
}else{
if(roleArray.includes("[GS-10] Field Training Officer")){
  userg.addRole(message.guild.roles.find("name", "[GS-11] Admin Support Staff 3"))
  userg.addRole(message.guild.roles.find("name", "ADMIN Staff"))
  userg.removeRole(message.guild.roles.find("name", "Clearance Level -2 (CL-2)")) 
  userg.addRole(message.guild.roles.find("name", "Clearance Level -3 (CL-3)"))
  userg.removeRole(message.guild.roles.find("name", "[GS-10] Field Training Officer")) 
        var file_path = `/app/.data/${userg}`;
  fs.appendFile(`${file_path}`,"\n")
  var date = new Date().toLocaleString("en-US", {timeZone: "America/Denver"});
  var dataf = date+" MDT "+"RankUp to GSC-11 Admin Support Staff 3"+`\` log from \`${message.author}`
  var datafs = dataf.replace(/,/g," ");
  fs.appendFile(`${file_path}`, datafs , function (err) {
  if (err) throw err;
  console.log(`Saved! ${userg}`);
    });
}else{
if(roleArray.includes("[GS-11] Admin Support Staff 3")){
  userg.addRole(message.guild.roles.find("name", "[GS-11] Admin Support Staff 2"))
  userg.removeRole(message.guild.roles.find("name", "[GS-11] Admin Support Staff 2")) 
        var file_path = `/app/.data/${userg}`;
  fs.appendFile(`${file_path}`,"\n")
  var date = new Date().toLocaleString("en-US", {timeZone: "America/Denver"});
  var dataf = date+" MDT "+"RankUp to GSC-11 Support Staff 2"+`\` log from \`${message.author}`
  var datafs = dataf.replace(/,/g," ");
  fs.appendFile(`${file_path}`, datafs , function (err) {
  if (err) throw err;
  console.log(`Saved! ${userg}`);
    });
}else{
if(roleArray.includes("[GS-11] Admin Support Staff 2")){
  userg.addRole(message.guild.roles.find("name", "[GS-11] Admin Support Staff 1"))
  userg.removeRole(message.guild.roles.find("name", "[GS-11] Admin Support Staff 1")) 
        var file_path = `/app/.data/${userg}`;
  fs.appendFile(`${file_path}`,"\n")
  var date = new Date().toLocaleString("en-US", {timeZone: "America/Denver"});
  var dataf = date+" MDT "+"RankUp to GSC-11 Support Staff 2"+`\` log from \`${message.author}`
  var datafs = dataf.replace(/,/g," ");
  fs.appendFile(`${file_path}`, datafs , function (err) {
  if (err) throw err;
  console.log(`Saved! ${userg}`);
    });
}else{
if(roleArray.includes("[GS-11] Admin Support Staff 1")){
  userg.addRole(message.guild.roles.find("name", "[GS-12] Unit Management"))
  userg.removeRole(message.guild.roles.find("name", "[GS-11] Admin Support Staff 1"))
          var file_path = `/app/.data/${userg}`;
  fs.appendFile(`${file_path}`,"\n")
  var date = new Date().toLocaleString("en-US", {timeZone: "America/Denver"});
  var dataf = date+" MDT "+"RankUp to GSC-12 Unit Management"+`\` log from \`${message.author}`
  var datafs = dataf.replace(/,/g," ");
  fs.appendFile(`${file_path}`, datafs , function (err) {
  if (err) throw err;
  console.log(`Saved! ${userg}`);
    });
}else{
if(roleArray.includes("[GS-12] Unit Management")){
  userg.addRole(message.guild.roles.find("name", "[GS-12] Unit Advisory Officer"))
  userg.removeRole(message.guild.roles.find("name", "[GS-12] Unit Management")) 
            var file_path = `/app/.data/${userg}`;
  fs.appendFile(`${file_path}`,"\n")
  var date = new Date().toLocaleString("en-US", {timeZone: "America/Denver"});
  var dataf = date+" MDT "+"RankUp to GSC-12 Unit Advisory Officer"+`\` log from \`${message.author}`
  var datafs = dataf.replace(/,/g," ");
  fs.appendFile(`${file_path}`, datafs , function (err) {
  if (err) throw err;
  console.log(`Saved! ${userg}`);
    });
}else{
message.channel.send(`Your going to have to rank up ${userg} manually I can't rankup that auto rankup high! `);
}
message.channel.send(`Rank-Up for ${userg} complete and logged in user data`);
}
  }
  }
  }
  }
  }
    }
    }
    }
    }
  }
  }
  }
  }
  }
  }
exports.cmdConfig = {
  name: "rankup",
  aliases: ['rup','rankup', 'r'],
  description: "Auto Changes roles to the next rank for the user",
  usage: "!rankup <user>",
  type: "gsc"
};