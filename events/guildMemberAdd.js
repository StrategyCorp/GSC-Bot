  bot.on('guildMemberAdd', guildMember => {
      db.fetchObject(`autoRole_$(guildMember.guild.id)`).then(i => {
        if (!i.text || i.text.toLowerCase() === 'none') return
        else {
          try{
          }catch (e) {
            console.log"Auto Role Failed
  