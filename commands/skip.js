const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "skip",
    aliases: ["r"],
    category: "Music",
    description: "Skip a song, because why not?",
    dev: true,
    path: __filename,
    run: async (client, message, args) => {
        try {
            let embed = new MessageEmbed();
            const { channel } = message.member.voice;
                
            if (!channel) {
                embed.setAuthor("An error occured!");
                embed.setDescription("No song was provided.");
                return message.channel.send(embed);
            }
            const serverQueue = message.client.queue.get(message.guild.id);

            if (!serverQueue) {
                embed.setAuthor("An error occured!");
                embed.setDescription("No song is playing in the server.");
                return message.channel.send(embed);
            }

            serverQueue.connection.dispatcher.end();
                
            embed.setDescription(`<:true:751761949347282994>| Succesfully skipped the song!`)
            embed.setColor('#0070fa')
            embed.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true, size: 256 }))
            .setFooter(`Skipped song: ${serverQueue.songs[0].title}`)
            message.channel.send(embed);
        } catch(e) {
            embed.setAuthor("An error occured!");
            embed.setDescription("Please retype the command.");
            console.log(e);
            return message.channel.send(embed);
        }
    }
}