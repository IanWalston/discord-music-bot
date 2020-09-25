const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "volume",
    aliases: ["delay", "wait", "schedule"],
    category: "Music",
    description: "Change the volume of the music bot!",
    dev: false,
    checkArgs: args => !args.length,
    path: __filename,
    run: async (client, message, args) => {
        let embed = new MessageEmbed(); 

        const { channel } = message.member.voice;
        if(!channel) {
            embed.setAuthor("An error occured!");
            embed.setDescription("You're not in a voice channel.");
            return message.channel.send(embed);
        }

        const serverQueue = message.client.queue.get(message.guild.id);

        if (!serverQueue) {
            embed.setAuthor("An error occured!");
            embed.setColor('#0070fa')
            embed.setDescription("No music is playing.");
            return message.channel.send(embed);
        }

        if(!args[0]) {
            embed.setAuthor(`The Current Volume is ${serverQueue.volume}`);
            embed.setColor('#0070fa')
            return message.channel.send(embed);
        }

        if(isNaN(args[0])) {
            embed.setAuthor("An error occured!");
            embed.setDescription("You need to use a number.");
            return message.channel.send(embed);
        }

        parseInt(args[0]);

        if(args[0] > 200) {
            embed.setAuthor("An error occured!");
            embed.setDescription("200 is the maximum volume.");
            return message.channel.send(embed);
        }

        serverQueue.volume = args[0];
        serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);
        embed.setDescription(`Volume has been set to ${args[0]}!`);
        embed.setColor('#0070fa')
        message.channel.send(embed);
    }
}