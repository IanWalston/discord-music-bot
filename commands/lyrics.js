const { MessageEmbed } = require("discord.js");
const got = require('got')

module.exports = {
    name: "lyrics",
    aliases: ["lyrics"],
    category: "Music",
    description: "Gets the song lyrics!",
    dev: true,
    path: __filename,
    run: async (client, message, args) => {
            let embed = new MessageEmbed();
              
            const { channel } = message.member.voice;
            if (!channel) {
                embed.setAuthor("An error occured!");
                embed.setColor('#0070fa')
                embed.setDescription("You need to be in a voice channel.");
                return message.channel.send(embed);
            }
            
            const serverQueue = message.client.queue.get(message.guild.id);

            await got(`https://some-random-api.ml/lyrics?title=${serverQueue.songs[0].title}`).then(response => {
                if(!response) return message.channel.send("I couldn't find the lyrics.");
                let content = JSON.parse(response.body);
                if(!content) return message.channel.send("I couldn't find the lyrics.");
                if(content.error)return message.channel.send(`${content.error}`)
                if(content.lyrics.length >= 2048) return message.channel.send(`Oh, this lyrics is to long! Here is the URL : ${content.links.genius}`)
                embed.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true, size: 256 }))
                embed.setTitle(`Showing lyrics for: ${content.title} | ${content.author}`)
                embed.setColor('#0070fa')
                embed.setDescription(`\`\`\`${content.lyrics}\`\`\``)
                message.channel.send(embed)

            })
    }
}