module.exports = (client, member) => {
  const settings = client.settings.get(member.guild.id);
  if (settings.welcomeEnabled === "true") {
    let welcomeMessage = settings.welcomeMessage
    welcomeMessage = welcomeMessage.replace("{{user}}", member.user.tag);
    welcomeMessage = welcomeMessage.replace("{{guild}}", member.guild.name);
    welcomeMessage = welcomeMessage.replace("{{memberCount}}", member.guild.memberCount);
    member.guild.channels.find("name", settings.defaultChannel).send(welcomeMessage);
  }
  if (settings.autoRole === "true") {
    let role = member.guild.roles.find("name", settings.autoRole);
    member.addRole(role);
  }
};
