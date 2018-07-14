var fs = require('fs');
module.exports.run = async (userg, message, args) => {
if(message.member.hasPermission("MANAGE_ROLES") == true){
let userg = message.mentions.members.first();
if(userg.member.roles.find("IN-Processing") == true){
userg.addRole(`${userg}`, "Clearance Level -1 (CL-1)")
userg.addRole("[GS-01] Basic Field Officer") 
userg.removeRole("IN-Processing")
userg.addRole("BE ADVISED!!!!")
userg.addRole("GSC")
userg.addRole("All-Callsigns-CMD") 
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
if(userg.member.roles.find("[GS-01] Basic Field Officer") == true){
userg.addRole("[GS-02]  Field Officer") 
userg.removeRole("[GS-01] Basic Field Officer")
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
if(userg.member.roles.find("[GS-02]  Field Officer") == true){
userg.addRole("[GS-03]  Field Officer") 
userg.removeRole("[GS-02]  Field Officer")
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
if(userg.member.roles.find("[GS-03]  Field Officer") == true){
userg.addRole("[GS-04]  Field Officer") 
userg.removeRole("[GS-03]  Field Officer")
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
if(userg.member.roles.find("[GS-04]  Field Officer") == true){
userg.addRole("[GS-05]  Field Specialist") 
userg.removeRole("[GS-04]  Field Officer")
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
if(userg.member.roles.find("[GS-05]  Field Specialist") == true){
  userg.addRole("[GS-06]  Field Coordinator") 
  userg.addRole("Clearance Level -2 (CL-2)") 
  userg.removeRole("[GS-05]  Field Specialist")
  userg.removeRole("Clearance Level -1 (CL-1)")
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
if(userg.member.roles.find("[GS-06]  Field Coordinator") == true){
  userg.addRole("[GS-07]  Field Coorinator 2")
  userg.addRole("Clearance Level -2 (CL-2)") 
  userg.removeRole("Clearance Level -1 (CL-1)")
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
if(userg.member.roles.find("[GS-07]  Field Coorinator 2") == true){
  userg.addRole("[GS-08] Field Operations Officer")
  userg.removeMemberToRole("[GS-07]  Field Coorinator 2") 
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
if(userg.member.roles.find("[GS-08] Field Operations Officer") == true){
  userg.addRole("[GS-09] Duty Ops Officer")
  userg.removeMemberToRole("[GS-08] Field Operations Officer") 
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
if(userg.member.roles.find("[GS-09] Duty Ops Officer") == true){
  userg.addRole("[GS-10] Field Training Officer")
  userg.removeMemberToRole("[GS-09] Duty Ops Officer") 
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
if(userg.member.roles.find("[GS-10] Field Training Officer") == true){
  userg.addRole("[GS-11] Admin Support Staff 3")
  userg.addRole("ADMIN Staff")
  userg.removeMemberToRole("Clearance Level -2 (CL-2)") 
  userg.addRole("Clearance Level -3 (CL-3)")
  userg.removeMemberToRole("[GS-10] Field Training Officer") 
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
if(userg.member.roles.find("[GS-11] Admin Support Staff 3") == true){
  userg.addRole("[GS-11] Admin Support Staff 2")
  userg.removeMemberToRole("[GS-11] Admin Support Staff 2") 
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
if(userg.member.roles.find("[GS-11] Admin Support Staff 2") == true){
  userg.addRole("[GS-11] Admin Support Staff 1")
  userg.removeMemberToRole("[GS-11] Admin Support Staff 1") 
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
if(userg.member.roles.find("[GS-11] Admin Support Staff 1") == true){
  userg.addRole("[GS-12] Unit Management")
  userg.removeMemberToRole("[GS-11] Admin Support Staff 1")
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
if(userg.member.roles.find("[GS-12] Unit Management") == true){
  userg.addRole("[GS-12] Unit Advisory Officer")
  userg.removeMemberToRole("[GS-12] Unit Management") 
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