const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "ping",
    aliases: ["lag"],
    category: "Info",
    description: "Client's ping",
    dev: false,
    checkArgs: args => !args.length,
    path: __filename,
    run: async (client, message, args) => {
        message.channel.send(`🏓 Pinging....`).then(msg=>{
            const _ = new MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setTitle('🏓 Pong!')
            .setDescription(`Latency:\`${Math.floor(msg.createdTimestamp - message.createdTimestamp)}ms\`\nWebsocket: \`${Math.round(client.ws.ping)}ms\``)
            .setColor("#555555")
            .setTimestamp()
            msg.edit(_);
            msg.edit("\u200B")
        })
    }
}