const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "jose",
    aliases: ["r"],
    category: "Info",
    description: "this feature is currently under development",
    dev: true,
    path: __filename,
    run: async (client, message, args) => {
        const embed = new MessageEmbed()
            .setColor("#ffff")
            .setDescription(`user discriminator: ${message.author.discriminator}
            user id: ${message.author.id}',
            username: ${message.author.username}',
            lastmessageid: ${message.author.lastMessageID}`)
            .setThumbnail(message.author.displayAvatarURL());

        message.channel.send(embed);
    }
}