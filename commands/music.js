const yt = require('ytdl-core');

exports.run = (client, message, [search, ...args]) => {
  const settings = client.settings.get(message.guild.id);
  let queue = {};
  if (search === "play") {
    if (queue[message.guild.id] === undefined) return message.channel.send(`Add some songs to the queue first with ${settings.prefix}add`);
    if (!message.guild.voiceConnection) return;
    if (queue[message.guild.id].playing) return message.channel.send('Already Playing');
    let dispatcher;
    queue[message.guild.id].playing = true;
    (function play(song) {
      if (song === undefined) return message.channel.send('Queue is empty').then(() => {
        queue[message.guild.id].playing = false;
        message.member.voiceChannel.leave();
      });
      message.channel.send(`Playing: **${song.title}** as requested by: **${song.requester}**`);
      dispatcher = message.guild.voiceConnection.playStream(yt(song.url, { audioonly: true }), { passes : client.config.musicPasses });
      let collector = message.channel.createCollector(m => m);
      collector.on('message', m => {
        if (m.content.startsWith(settings.prefix + 'pause')) {
          message.channel.send('paused').then(() => {dispatcher.pause();});
        } else if (m.content.startsWith(settings.prefix + 'resume')){
          message.channel.send('resumed').then(() => {dispatcher.resume();});
        } else if (m.content.startsWith(settings.prefix + 'skip')){
          message.channel.send('skipped').then(() => {dispatcher.end();});
        } else if (m.content.startsWith('volume+')){
          if (Math.round(dispatcher.volume*50) >= 100) return message.channel.send(`Volume: ${Math.round(dispatcher.volume*50)}%`);
          dispatcher.setVolume(Math.min((dispatcher.volume*50 + (2*(m.content.split('+').length-1)))/50,2));
          message.channel.send(`Volume: ${Math.round(dispatcher.volume*50)}%`);
        } else if (m.content.startsWith('volume-')){
          if (Math.round(dispatcher.volume*50) <= 0) return message.channel.send(`Volume: ${Math.round(dispatcher.volume*50)}%`);
          dispatcher.setVolume(Math.max((dispatcher.volume*50 - (2*(m.content.split('-').length-1)))/50,0));
          message.channel.send(`Volume: ${Math.round(dispatcher.volume*50)}%`);
        } else if (m.content.startsWith(settings.prefix + 'time')){
          message.channel.send(`time: ${Math.floor(dispatcher.time / 60000)}:${Math.floor((dispatcher.time % 60000)/1000) <10 ? '0'+Math.floor((dispatcher.time % 60000)/1000) : Math.floor((dispatcher.time % 60000)/1000)}`);
        }
      });
      dispatcher.on('end', () => {
        collector.stop();
        play(queue[message.guild.id].songs.shift());
      });
      dispatcher.on('error', (err) => {
        return message.channel.send('error: ' + err).then(() => {
          collector.stop();
          play(queue[message.guild.id].songs.shift());
        });
      });
    })(queue[message.guild.id].songs.shift());
  } else if (search === "join") {
    return new Promise((resolve, reject) => {
			const voiceChannel = message.member.voiceChannel;
			if (!voiceChannel || voiceChannel.type !== 'voice') return message.reply('I couldn\'t connect to your voice channel...');
			voiceChannel.join().then(connection => resolve(connection)).catch(err => reject(err));
    });
  } else if (search === "add") {
    let url = args.toString();
		if (url == '' || url === undefined) return message.channel.send(`You must add a YouTube video url, or id after ${settings.prefix}add`);
		yt.getInfo(url, (err, info) => {
			if(err) return message.channel.send('Invalid YouTube Link: ' + err);
			if (!queue.hasOwnProperty(message.guild.id)) queue[message.guild.id] = {}, queue[message.guild.id].playing = false, queue[message.guild.id].songs = [];
			queue[message.guild.id].songs.push({url: url, title: info.title, requester: message.author.username});
			message.channel.send(`added **${info.title}** to the queue`);
    });
  } else if (search === "queue") {
    if (queue[message.guild.id] === undefined) return message.channel.send(`Add some songs to the queue first with ${settings.prefix}add`);
		let tosend = [];
		queue[message.guild.id].songs.forEach((song, i) => { tosend.push(`${i+1}. ${song.title} - Requested by: ${song.requester}`);});
    message.channel.send(`__**${message.guild.name}'s Music Queue:**__ Currently **${tosend.length}** songs queued ${(tosend.length > 15 ? '*[Only next 15 shown]*' : '')}\n\`\`\`${tosend.slice(0,15).join('\n')}\`\`\``);
  } else {
    message.channel.send('else');
  }
};


exports.cmdConfig = {
  name: "music",
  aliases: [],
  description: "WIP",
  usage: "msuic",
  type: "fun"
};