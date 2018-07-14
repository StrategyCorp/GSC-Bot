var fs = require('fs');
module.exports.run = async (userg, message, args) => {
if(message.member.roles.find("name", "Bot Admin")){
var userg= message.mentions.members.first();
if(userg.guild.roles.find(`${userg}`, "IN-Processing")){
userg.addMemberToRole(`${userg}`, "Clearance Level -1 (CL-1)")
userg.addMemberToRole(`${userg}`, "[GS-01] Basic Field Officer") 
userg.removeMemberFromRole(`${userg}`, "IN-Processing")
userg.addMemberToRole(`${userg}`, "BE ADVISED!!!!")
userg.addMemberToRole(`${userg}`, "GSC")
userg.addMemberToRole(`${userg}`, "All-Callsigns-CMD") 
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
if(userg.guild.roles.find(`${userg}`, "[GS-01] Basic Field Officer")){
userg.addMemberToRole(`${userg}`, "[GS-02]  Field Officer") 
userg.removeMemberFromRole(`${userg}`, "[GS-01] Basic Field Officer")
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
if(userg.guild.roles.find(`${userg}`, "[GS-02]  Field Officer")){
userg.addMemberToRole(`${userg}`, "[GS-03]  Field Officer") 
userg.removeMemberFromRole(`${userg}`, "[GS-02]  Field Officer")
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
if(userg.guild.roles.find(`${userg}`, "[GS-03]  Field Officer")){
userg.addMemberToRole(`${userg}`, "[GS-04]  Field Officer") 
userg.removeMemberFromRole(`${userg}`, "[GS-03]  Field Officer")
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
if(userg.guild.roles.find(`${userg}`, "[GS-04]  Field Officer")){
userg.addMemberToRole(`${userg}`, "[GS-05]  Field Specialist") 
userg.removeMemberFromRole(`${userg}`, "[GS-04]  Field Officer")
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
if(userg.guild.roles.find(`${userg}`, "[GS-05]  Field Specialist")){
  userg.addMemberToRole(`${userg}`, "[GS-06]  Field Coordinator") 
  userg.addMemberToRole(`${userg}`, "Clearance Level -2 (CL-2)") 
  userg.removeMemberFromRole(`${userg}`, "[GS-05]  Field Specialist")
  userg.removeMemberFromRole(`${userg}`, "Clearance Level -1 (CL-1)")
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
if(userg.guild.roles.find(`${userg}`, "[GS-06]  Field Coordinator")){
  userg.addMemberToRole(`${userg}`, "[GS-07]  Field Coorinator 2")
  userg.addMemberToRole(`${userg}`, "Clearance Level -2 (CL-2)") 
  userg.removeMemberFromRole(`${userg}`, "Clearance Level -1 (CL-1)")
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
if(userg.guild.roles.find(`${userg}`, "[GS-07]  Field Coorinator 2")){
  userg.addMemberToRole(`${userg}`, "[GS-08] Field Operations Officer")
  userg.removeMemberToRole(`${userg}`, "[GS-07]  Field Coorinator 2") 
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
if(userg.guild.roles.find(`${userg}`, "[GS-08] Field Operations Officer")){
  userg.addMemberToRole(`${userg}`, "[GS-09] Duty Ops Officer")
  userg.removeMemberToRole(`${userg}`, "[GS-08] Field Operations Officer") 
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
if(userg.guild.roles.find(`${userg}`, "[GS-09] Duty Ops Officer")){
  userg.addMemberToRole(`${userg}`, "[GS-10] Field Training Officer")
  userg.removeMemberToRole(`${userg}`, "[GS-09] Duty Ops Officer") 
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
if(userg.guild.roles.find(`${userg}`, "[GS-10] Field Training Officer")){
  userg.addMemberToRole(`${userg}`, "[GS-11] Admin Support Staff 3")
  userg.addMemberToRole(`${userg}`, "ADMIN Staff")
  userg.removeMemberToRole(`${userg}`, "Clearance Level -2 (CL-2)") 
  userg.addMemberToRole(`${userg}`, "Clearance Level -3 (CL-3)")
  userg.removeMemberToRole(`${userg}`, "[GS-10] Field Training Officer") 
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
if(userg.guild.roles.find(`${userg}`, "[GS-11] Admin Support Staff 3")){
  userg.addMemberToRole(`${userg}`, "[GS-11] Admin Support Staff 2")
  userg.removeMemberToRole(`${userg}`, "[GS-11] Admin Support Staff 2") 
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
if(userg.guild.roles.find(`${userg}`, "[GS-11] Admin Support Staff 2")){
  userg.addMemberToRole(`${userg}`, "[GS-11] Admin Support Staff 1")
  userg.removeMemberToRole(`${userg}`, "[GS-11] Admin Support Staff 1") 
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
if(userg.guild.roles.find(`${userg}`, "[GS-11] Admin Support Staff 1")){
  userg.addMemberToRole(`${userg}`, "[GS-12] Unit Management")
  userg.removeMemberToRole(`${userg}`, "[GS-11] Admin Support Staff 1")
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
if(userg.guild.roles.find(`${userg}`, "[GS-12] Unit Management")){
  userg.addMemberToRole(`${userg}`, "[GS-12] Unit Advisory Officer")
  userg.removeMemberToRole(`${userg}`, "[GS-12] Unit Management") 
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