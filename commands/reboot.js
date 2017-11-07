exports.run = (client, message) => {
  if (message.author.id !== client.config.ownerId) return;
  const collector = message.channel.createCollector(msg => msg.author === message.author, {
    time: 10000
  });
  message.channel.send('are you sure?');
  collector.on('message', msg => {
    if (msg.content === 'no') collector.stop('aborted');
    if (msg.content === 'yes') collector.stop('success');
  });
  collector.on('end', (collected, reason) => {
    if (reason === 'time') return message.channel.send('The prompt timed out...');
    if (reason === 'aborted') return message.channel.send('The reboot has been aborted');
    if (reason === 'success') {
      message.channel.send('Rebooting...').then(() => {
        process.exit();
      }).catch(e => {
        console.error(e);
      });
    }
  });
};

exports.cmdConfig = {
  name: 'reboot',
  aliases: ['restart'],
  description: 'Turns off the bot.',
  usage: 'reboot',
  type: "client"
};
