var fs = require('fs');
module.exports.run = async (userg, message, args) => {
if(message.member.roles.find("name", "Bot Admin")){
var userg= message.mentions.members.first();
if(userg.guild.roles.find("name", "IN-Processing")){
userg.addRole(`${userg}`, "Clearance Level -1 (CL-1)")
userg.addRole("name", "[GS-01] Basic Field Officer") 
userg.removeMemberFromRole("name", "IN-Processing")
userg.addRole("name", "BE ADVISED!!!!")
userg.addRole("name", "GSC")
userg.addRole("name", "All-Callsigns-CMD") 
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
if(userg.guild.roles.find("name", "[GS-01] Basic Field Officer")){
userg.addRole("name", "[GS-02]  Field Officer") 
userg.removeMemberFromRole("name", "[GS-01] Basic Field Officer")
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
if(userg.guild.roles.find("name", "[GS-02]  Field Officer")){
userg.addRole("name", "[GS-03]  Field Officer") 
userg.removeMemberFromRole("name", "[GS-02]  Field Officer")
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
if(userg.guild.roles.find("name", "[GS-03]  Field Officer")){
userg.addRole("name", "[GS-04]  Field Officer") 
userg.removeMemberFromRole("name", "[GS-03]  Field Officer")
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
if(userg.guild.roles.find("name", "[GS-04]  Field Officer")){
userg.addRole("name", "[GS-05]  Field Specialist") 
userg.removeMemberFromRole("name", "[GS-04]  Field Officer")
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
if(userg.guild.roles.find("name", "[GS-05]  Field Specialist")){
  userg.addRole("name", "[GS-06]  Field Coordinator") 
  userg.addRole("name", "Clearance Level -2 (CL-2)") 
  userg.removeMemberFromRole("name", "[GS-05]  Field Specialist")
  userg.removeMemberFromRole("name", "Clearance Level -1 (CL-1)")
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
if(userg.guild.roles.find("name", "[GS-06]  Field Coordinator")){
  userg.addRole("name", "[GS-07]  Field Coorinator 2")
  userg.addRole("name", "Clearance Level -2 (CL-2)") 
  userg.removeMemberFromRole("name", "Clearance Level -1 (CL-1)")
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
if(userg.guild.roles.find("name", "[GS-07]  Field Coorinator 2")){
  userg.addRole("name", "[GS-08] Field Operations Officer")
  userg.removeMemberToRole("name", "[GS-07]  Field Coorinator 2") 
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
if(userg.guild.roles.find("name", "[GS-08] Field Operations Officer")){
  userg.addRole("name", "[GS-09] Duty Ops Officer")
  userg.removeMemberToRole("name", "[GS-08] Field Operations Officer") 
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
if(userg.guild.roles.find("name", "[GS-09] Duty Ops Officer")){
  userg.addRole("name", "[GS-10] Field Training Officer")
  userg.removeMemberToRole("name", "[GS-09] Duty Ops Officer") 
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
if(userg.guild.roles.find("name", "[GS-10] Field Training Officer")){
  userg.addRole("name", "[GS-11] Admin Support Staff 3")
  userg.addRole("name", "ADMIN Staff")
  userg.removeMemberToRole("name", "Clearance Level -2 (CL-2)") 
  userg.addRole("name", "Clearance Level -3 (CL-3)")
  userg.removeMemberToRole("name", "[GS-10] Field Training Officer") 
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
if(userg.guild.roles.find("name", "[GS-11] Admin Support Staff 3")){
  userg.addRole("name", "[GS-11] Admin Support Staff 2")
  userg.removeMemberToRole("name", "[GS-11] Admin Support Staff 2") 
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
if(userg.guild.roles.find("name", "[GS-11] Admin Support Staff 2")){
  userg.addRole("name", "[GS-11] Admin Support Staff 1")
  userg.removeMemberToRole("name", "[GS-11] Admin Support Staff 1") 
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
if(userg.guild.roles.find("name", "[GS-11] Admin Support Staff 1")){
  userg.addRole("name", "[GS-12] Unit Management")
  userg.removeMemberToRole("name", "[GS-11] Admin Support Staff 1")
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
if(userg.guild.roles.find("name", "[GS-12] Unit Management")){
  userg.addRole("name", "[GS-12] Unit Advisory Officer")
  userg.removeMemberToRole("name", "[GS-12] Unit Management") 
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