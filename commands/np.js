const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "nowplaying",
    aliases: ["np"],
    category: "Music",
    description: "Get the song thats currently playing!",
    dev: true,
    path: __filename,
    run: async (client, message, args) => {
        try {
            let embed = new MessageEmbed();
              
            const { channel } = message.member.voice;
            if (!channel) {
                embed.setAuthor("An error occured!");
                embed.setColor('#0070fa')
                embed.setDescription("You need to be in a voice channel.");
                return message.channel.send(embed);
            }
            
            const serverQueue = message.client.queue.get(message.guild.id);
            
            if (!serverQueue) {
                embed.setAuthor("Not playing!");
                embed.setColor('#0070fa')
                embed.setDescription("There is nothing plaing, start playing music with -play [song]");
                return message.channel.send(embed);
            }

            //embed.setDescription(`**NOW PLAYING** - ${serverQueue.songs[0].title}`);
            embed.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true, size: 256 }))
            embed.setDescription(`**Now Playing**\n\`\`\`${serverQueue.songs[0].title}\n🔊 ${serverQueue.volume || `100`}%\`\`\`To add more, use -play [song].\n For queue, use -queue.`)
            embed.setColor('#0070fa')
            //embed.setThumbnail(client.user.displayAvatarURL());
            message.channel.send(embed)
        } catch(e) {
            embed.setAuthor("An error occured!");
            embed.setDescription("Please retype the command.");
            console.log(e);
            return message.channel.send(embed);
        }
    }
}