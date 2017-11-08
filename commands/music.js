const yt = require('ytdl-core');

exports.run = (client, message, [search, ...args]) => {
  const settings = client.settings.get(message.guild.id);
  let queue = {};
  function musicPlay(message) {
    if (queue[message.guild.id] === undefined) return message.channel.sendMessage(`Add some songs to the queue first with ${settings.prefix}add`);
      if (!message.guild.voiceConnection) return musicJoin(message).then(() => musicPlay(message));
      if (queue[message.guild.id].playing) return message.channel.sendMessage('Already Playing');
      let dispatcher;
      queue[message.guild.id].playing = true;
      (function play(song) {
        if (song === undefined) return message.channel.sendMessage('Queue is empty').then(() => {
          queue[message.guild.id].playing = false;
          message.member.voiceChannel.leave();
        });
        message.channel.sendMessage(`Playing: **${song.title}** as requested by: **${song.requester}**`);
        dispatcher = message.guild.voiceConnection.playStream(yt(song.url, { audioonly: true }), { passes : client.config.musicPasses });
        let collector = message.channel.createCollector(m => m);
        collector.on('message', m => {
          if (m.content.startsWith(settings.prefix + 'pause')) {
            message.channel.sendMessage('paused').then(() => {dispatcher.pause();});
          } else if (m.content.startsWith(settings.prefix + 'resume')){
            message.channel.sendMessage('resumed').then(() => {dispatcher.resume();});
          } else if (m.content.startsWith(settings.prefix + 'skip')){
            message.channel.sendMessage('skipped').then(() => {dispatcher.end();});
          } else if (m.content.startsWith('volume+')){
            if (Math.round(dispatcher.volume*50) >= 100) return message.channel.sendMessage(`Volume: ${Math.round(dispatcher.volume*50)}%`);
            dispatcher.setVolume(Math.min((dispatcher.volume*50 + (2*(m.content.split('+').length-1)))/50,2));
            message.channel.sendMessage(`Volume: ${Math.round(dispatcher.volume*50)}%`);
          } else if (m.content.startsWith('volume-')){
            if (Math.round(dispatcher.volume*50) <= 0) return message.channel.sendMessage(`Volume: ${Math.round(dispatcher.volume*50)}%`);
            dispatcher.setVolume(Math.max((dispatcher.volume*50 - (2*(m.content.split('-').length-1)))/50,0));
            message.channel.sendMessage(`Volume: ${Math.round(dispatcher.volume*50)}%`);
          } else if (m.content.startsWith(settings.prefix + 'time')){
            message.channel.sendMessage(`time: ${Math.floor(dispatcher.time / 60000)}:${Math.floor((dispatcher.time % 60000)/1000) <10 ? '0'+Math.floor((dispatcher.time % 60000)/1000) : Math.floor((dispatcher.time % 60000)/1000)}`);
          }
        });
        dispatcher.on('end', () => {
          collector.stop();
          play(queue[message.guild.id].songs.shift());
        });
        dispatcher.on('error', (err) => {
          return message.channel.sendMessage('error: ' + err).then(() => {
            collector.stop();
            play(queue[message.guild.id].songs.shift());
          });
        });
      })(queue[message.guild.id].songs.shift());
    }
  function musicJoin(message) {
    return new Promise((resolve, reject) => {
			const voiceChannel = message.member.voiceChannel;
			if (!voiceChannel || voiceChannel.type !== 'voice') return message.reply('I couldn\'t connect to your voice channel...');
			voiceChannel.join().then(connection => resolve(connection)).catch(err => reject(err));
    });
  }
  function musicAdd(message) {
    let url = message.content.split(' ')[1];
		if (url == '' || url === undefined) return message.channel.sendMessage(`You must add a YouTube video url, or id after ${settings.prefix}add`);
		yt.getInfo(url, (err, info) => {
			if(err) return message.channel.sendMessage('Invalid YouTube Link: ' + err);
			if (!queue.hasOwnProperty(message.guild.id)) queue[message.guild.id] = {}, queue[message.guild.id].playing = false, queue[message.guild.id].songs = [];
			queue[message.guild.id].songs.push({url: url, title: info.title, requester: message.author.username});
			message.channel.sendMessage(`added **${info.title}** to the queue`);
    });
  }
  function musicQueue(message) {
    if (queue[message.guild.id] === undefined) return message.channel.sendMessage(`Add some songs to the queue first with ${settings.prefix}add`);
		let tosend = [];
		queue[message.guild.id].songs.forEach((song, i) => { tosend.push(`${i+1}. ${song.title} - Requested by: ${song.requester}`);});
    message.channel.sendMessage(`__**${message.guild.name}'s Music Queue:**__ Currently **${tosend.length}** songs queued ${(tosend.length > 15 ? '*[Only next 15 shown]*' : '')}\n\`\`\`${tosend.slice(0,15).join('\n')}\`\`\``);
  }
  if (search === "play") {
    musicPlay(args);
  } else if (search === "join") {
    musicJoin(args);
  } else if (search === "add") {
    musicAdd()
  }
};


exports.cmdConfig = {
  name: "music",
  aliases: [],
  description: "WIP",
  usage: "msuic",
  type: "fun"
};