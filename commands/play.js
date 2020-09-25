const { MessageEmbed } = require("discord.js");
const { play } = require("../core/music.js");
const ytdl = require("ytdl-core");
const YouTubeAPI = require("simple-youtube-api");
const config = require("../config/config.js");
const youtube = new YouTubeAPI(config.client.youtube_api_key);

// Okay, so, we getting TypeError: Cannot read property 'shift' of undefined
// Be right back. I'll leave my PC open.

// Im gonna sleep, gn!

// C:\Users\PC\Desktop\Dagger\node_modules\opusscript\build\opusscript_native_wasm.js:8

// I'll try to reinstall it.

// it was working before right so it must have to do with what you did recently
module.exports = {
    name: "play",
    aliases: ["lag"],
    category: "Music",
    description: "Play a song!",
    dev: false,
    checkArgs: args => !args.length,
    path: __filename,
    run: async (client, message, args) => {
        try {
            let embed1 = new MessageEmbed()
                .setColor('#0070fa')
                .setAuthor("Fetching the song, please wait!");
            message.channel.send(embed1).then(m => {
                setTimeout(function() {
                    m.delete()
                }, 2000)})
            let embed = new MessageEmbed();
            if(!args.length) {
                embed.setAuthor("An error occured!");
                embed.setDescription("No song was provided.");
                return message.channel.send(embed);
            }

            const { channel } = message.member.voice;

            if(!channel) {
                embed.setAuthor("An error occured!");
                embed.setDescription("You're not in a voice chat.");
                return message.channel.send(embed);
            }

            const songArg = args.join(" ");

            const videoPattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/+$/gi;

            const playlistPattern = /^.*(youtu.be\/|list=)([^#/&/?]*).*/gi;
        
            const playlist = playlistPattern.test(songArg);
            const check = videoPattern.test(songArg);

            if(!check && playlist) {
                embed.setAuthor("An error occured!");
                embed.setDescription("We can't really play playlists right now.");
                return message.channel.send(embed);
            }

            const serverQueue = message.client.queue.get(message.guild.id);

            const queueConstruct = {
                textChannel: message.channel,
                channel,
                connection: null,
                songs: [],
                loop: false,
                volume: 100,
                playing: true
            };

            let songData = null;
            let song = null;

            if(check) {
                try {
                    songData = await ytdl.getInfo(songArg);
                    song = {
                        title: songData.title,
                        url: songData.video_url,
                        duration: songData.length_seconds
                    };
                } catch(e) {
                    embed.setAuthor("An error occured!");
                    embed.setDescription(e.message);
                    return message.channel.send(embed);
                }
            } else {
                try {
                    const result = await youtube.searchVideos(songArg, 1);
                    songData = await ytdl.getInfo(result[0].url);
                    song = {
                        title: songData.videoDetails.title,
                        url: songData.videoDetails.video_url,
                        duration: songData.videoDetails.lengthSeconds
                    };
                } catch(e) {
                    embed.setAuthor("An error occured!");
                    embed.setDescription(e.message);
                    return message.channel.send(embed);
                }
            }
            function format(time) {   
                var hrs = ~~(time / 3600);
                var mins = ~~((time % 3600) / 60);
                var secs = ~~time % 60;
                var ret = "";
                if (hrs > 0) {
                    ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
                }
                ret += "" + mins + ":" + (secs < 10 ? "0" : "");
                ret += "" + secs;
                return ret;
            }
            if(serverQueue) {
                if(serverQueue.songs.length > Math.floor(config.client.queue_limit - 1) && config.client.queue_limit !== 0) {
                    embed.setAuthor("An error occured!");
                    embed.setDescription(`You can't add more then ${config.client.queue_limit} songs in the queue!`);
                    return message.channel.send(embed);
                }

                serverQueue.songs.push(song);
                embed.setAuthor(message.author.tag,message.author.displayAvatarURL({ dynamic: true, size: 256 }))
                embed.setDescription(`<:true:751761949347282994> | Succesfully added to queue!`)
                embed.addField(`Song`,song.title)
                embed.addField(`Duration`,`${format(song.duration)}`)
                embed.setColor('#0070fa')
                return message.channel.send(embed);
            } else {
                queueConstruct.songs.push(song);
            }

            if(!serverQueue) message.client.queue.set(message.guild.id, queueConstruct);

            if(!serverQueue) {
                try {
                    queueConstruct.connection = await channel.join();
                    play(queueConstruct.songs[0], message);
                } catch(e) {
                    await channel.leave();
                    message.client.queue.delete(message.guild.id);
                    embed.setAuthor("An error occured!");
                    embed.setDescription(`I couldn't join the voice channel.`);
                }
            }
            module.exports.duration = format(song.duration)
        } catch(e) {
            embed.setAuthor("An error occured!");
            embed.setDescription("Please retype the command.");
            console.log(e);
            return message.channel.send(embed);
        } 
    }
}