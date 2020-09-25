const { MessageEmbed } = require("discord.js");
const count1 = require('../events/message.js')

module.exports = {
    name: "stats",
    aliases: ["s"],
    category: "Info",
    description: "Stats for the bot.",
    dev: true,
    path: __filename,
    run: async (client, message, args) => {
        var milliseconds = parseInt((client.uptime % 1000) / 100),
        seconds = parseInt((client.uptime / 1000) % 60),
        minutes = parseInt((client.uptime / (1000 * 60)) % 60),
        hours = parseInt((client.uptime / (1000 * 60 * 60)) % 24);
        days = parseInt((client.uptime / (1000 * 60 * 60 * 24)) % 60);
        days = (days < 10) ? "0" + days : days;
        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;

        let embed = new MessageEmbed()
            .setAuthor(client.user.username)
            .setColor(`BLUE`)
            .setDescription(`Bot in ***${client.guilds.cache.size}*** servers
            Serving ***${client.users.cache.size}*** users
            With ***${client.channels.cache.size}*** channels
            WS Ping ***${client.ws.ping}*** ms
            Uptime ${days}:${hours}:${minutes}:${seconds}`)
            .setThumbnail(client.user.displayAvatarURL());
            
        message.channel.send(embed);
    }
}