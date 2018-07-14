module.exports.run = async (client, message, args) => {
if(message.member.roles.find("name", "Bot Admin")){
var userg= message.mentions.members.first();
if(client.memberHasRole(`${userg}`, "IN-Processing")){
client.addMemberToRole(`${userg}`, "Clearance Level -1 (CL-1)")
client.addMemberToRole(`${userg}`, "[GS-01] Basic Field Officer") 
client.removeMemberFromRole(`${userg}`, "IN-Processing")
client.addMemberToRole(`${userg}`, "BE ADVISED!!!!")
client.addMemberToRole(`${userg}`, "All-Callsigns-CMD") 
}else{
if(client.memberHasRole(`${userg}`, "[GS-01] Basic Field Officer")){
client.addMemberToRole(`${userg}`, "[GS-02]  Field Officer") 
client.removeMemberFromRole(`${userg}`, "[GS-01] Basic Field Officer")
}else{
if(client.memberHasRole(`${userg}`, "[GS-02]  Field Officer")){
client.addMemberToRole(`${userg}`, "[GS-03]  Field Officer") 
client.removeMemberFromRole(`${userg}`, "[GS-02]  Field Officer")
}else{
if(client.memberHasRole(`${userg}`, "[GS-03]  Field Officer")){
client.addMemberToRole(`${userg}`, "[GS-04]  Field Officer") 
client.removeMemberFromRole(`${userg}`, "[GS-03]  Field Officer")
}else{
if(client.memberHasRole(`${userg}`, "[GS-04]  Field Officer")){
client.addMemberToRole(`${userg}`, "[GS-05]  Field Specialist") 
client.removeMemberFromRole(`${userg}`, "[GS-04]  Field Officer")
  }else{
if(client.memberHasRole(`${userg}`, "[GS-05]  Field Specialist")){
  client.addMemberToRole(`${userg}`, "[GS-06]  Field Coordinator") 
  client.addMemberToRole(`${userg}`, "Clearance Level -2 (CL-2)") 
  client.removeMemberFromRole(`${userg}`, "[GS-05]  Field Specialist")
  client.removeMemberFromRole(`${userg}`, "Clearance Level -1 (CL-1)")
  }else{
if(client.memberHasRole(`${userg}`, "[GS-06]  Field Coordinator")){
  client.addMemberToRole(`${userg}`, "[GS-06]  Field Coordinator")
  client.addMemberToRole(`${userg}`, "Clearance Level -2 (CL-2)") 
  client.removeMemberFromRole(`${userg}`, "Clearance Level -1 (CL-1)")
  }else{
if(client.memberHasRole(`${userg}`, "[GS-07]  Field Coorinator 2")){
  client.addMemberToRole(`${userg}`, "[GS-08] Field Operations Officer")
  client.removeMemberToRole(`${userg}`, "[GS-07]  Field Coorinator 2") 
  }else{
if(client.memberHasRole(`${userg}`, "[GS-08] Field Operations Officer")){
  client.addMemberToRole(`${userg}`, "[GS-09] Duty Ops Officer")
  client.removeMemberToRole(`${userg}`, "[GS-08] Field Operations Officer") 
}else{
if(client.memberHasRole(`${userg}`, "[GS-09] Duty Ops Officer")){
  client.addMemberToRole(`${userg}`, "[GS-10] Field Training Officer")
  client.removeMemberToRole(`${userg}`, "[GS-09] Duty Ops Officer") 
}else{
if(client.memberHasRole(`${userg}`, "[GS-10] Field Training Officer")){
  client.addMemberToRole(`${userg}`, "[GS-11] Admin Support Staff 3")
  client.addMemberToRole(`${userg}`, "ADMIN Staff")
  client.removeMemberToRole(`${userg}`, "Clearance Level -2 (CL-2)") 
  client.addMemberToRole(`${userg}`, "Clearance Level -3 (CL-3)")
  client.removeMemberToRole(`${userg}`, "[GS-10] Field Training Officer") 
}else{
if(client.memberHasRole(`${userg}`, "[GS-11] Admin Support Staff 3")){
  client.addMemberToRole(`${userg}`, "[GS-11] Admin Support Staff 2")
  client.removeMemberToRole(`${userg}`, "[GS-11] Admin Support Staff 3") 
}else{
if(client.memberHasRole(`${userg}`, "[GS-11] Admin Support Staff 2")){
  client.addMemberToRole(`${userg}`, "[GS-11] Admin Support Staff 1")
  client.removeMemberToRole(`${userg}`, "[GS-11] Admin Support Staff 2") 
}else{
if(client.memberHasRole(`${userg}`, "[GS-11] Admin Support Staff 1")){
  client.addMemberToRole(`${userg}`, "[GS-12] Unit Management")
  client.removeMemberToRole(`${userg}`, "[GS-11] Admin Support Staff 1") 
}else{
if(client.memberHasRole(`${userg}`, "[GS-12] Unit Management")){
  client.addMemberToRole(`${userg}`, "[GS-12] Unit Advisory Officer")
  client.removeMemberToRole(`${userg}`, "[GS-12] Unit Management") 
}else{
message.channel.send(`Your going to have to rank up ${userg} manually I can't rankup that auto rankup high! `);
}
message.channel.send("Rank-Up complete ");
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