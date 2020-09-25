const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "stop",
    aliases: ["r"],
    category: "Music",
    description: "Stop playing music, pretty usefull.",
    dev: true,
    path: __filename,
    run: async (client, message, args) => {
        try {
            let embed = new MessageEmbed();
            const { channel } = message.member.voice;
                
            if (!channel) {
                embed.setAuthor("An error occured!");
                embed.setDescription("You need to be in a voice chat.");
                return message.channel.send(embed);
            }
            
            const serverQueue = message.client.queue.get(message.guild.id);
            
            if (!serverQueue) {
                embed.setAuthor("An error occured!");
                embed.setDescription("No song was playing in the server.");
                return message.channel.send(embed);
            }
            
            serverQueue.songs = [];
            serverQueue.connection.dispatcher.end();
        } catch(e) {
            embed.setAuthor("An error occured!");
            embed.setDescription("Please retype the command.");
            console.log(e);
            return message.channel.send(embed);
        }
    }
}