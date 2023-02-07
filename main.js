const Discord = require('discord.js');
const client = new Discord.Client();
const ytdl = require('ytdl-core');

client.on('ready', () => {
    console.log('Ready!');
});

client.on('message', message => {
    if (message.content.startsWith('!play')) {
        const voiceChannel = message.member.voiceChannel;
        if (!voiceChannel) {
            return message.reply('Please join a voice channel first!');
        }
        voiceChannel.join().then(connection => {
            const stream = ytdl(message.content.split(' ')[1], { filter : 'audioonly' });
            const dispatcher = connection.playStream(stream);
            dispatcher.on('end', () => voiceChannel.leave());
        });
    }
});

client.login('YOUR_TOKEN');
