module.exports.run = async (client, message, args) => {
if(message.member.roles.find("name", "Bot Admin")){
var userg= message.mentions.members.first();
if(client.memberHasRole(`${userg}`, "IN-Processing")){
client.addMemberToRole(`${userg}`, "Clearance Level -1 (CL-1)")
client.addMemberToRole(`${userg}`, "[GS-01] Basic Field Officer") 
client.removeMemberFromRole(``${userg}, "IN-Processing")
client.addMemberToRole(`${userg}`, "BE ADVISED!!!!")
client.addMemberToRole(`${userg}`, "All-Callsigns-CMD") 
}
}
}