const ytdlDiscord = require("ytdl-core-discord");
const { MessageEmbed } = require("discord.js");
const config = require("../config/config.js");
const play = require("../commands/play.js");

module.exports = {

    async play(song, message) {
        let embed = new MessageEmbed();
        const queue = message.client.queue.get(message.guild.id);
        if(!song) {
            queue.channel.leave();
            message.client.queue.delete(message.guild.id);
            embed.setColor('#0070fa')
            embed.setAuthor("The music has ended!");
            return queue.textChannel.send(embed);
        }

        try {
            var stream = await ytdlDiscord(song.url, {
                highWaterMark: 1 << 25
            })
        } catch(e) {
            if(queue) {
                queue.song.shift();
                module.exports.play(queue.songs[0], message);
            }
        }

        const dispatcher = queue.connection
            .play(stream, { type: "opus" })
            .on("finish", () => {
                if(queue.loop) {
                    let lastSong = queue.songs.shift();
                    queue.songs.push(lastSong);
                    module.exports.play(queue.songs[0], message);
                } else {
                    queue.songs.shift();
                    module.exports.play(queue.songs[0], message);
                }
            });

        dispatcher.setVolumeLogarithmic(queue.volume / 100);
        embed.setColor('#0070fa')
        embed.setDescription(`Started playing ${song.title}`);
        queue.textChannel.send(embed)
    }
}