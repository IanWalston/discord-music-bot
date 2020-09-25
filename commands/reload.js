const { MessageEmbed } = require("discord.js");
const config = require('../config/config.js');

module.exports = {
    name: "reload",
    aliases: ["r"],
    category: "Developers",
    description: "Reloads a command!",
    dev: true,
    path: __filename,
    run: async (client, message, args) => {
        if(!client.config.developers.includes(message.author.id)) return message.channel.send("! You're not a dev.");
        
        try {
        const commandName = args[0]
   
        const fs = require("fs");
        const stats = fs.statSync(`/root/dagger-dev1/commands/${commandName}.js`);

        const fileSizeInBytes = stats.size;
        const kb = fileSizeInBytes / 1000;

        var milliseconds = parseInt((client.uptime % 1000) / 100),
        seconds = parseInt((client.uptime / 1000) % 60),
        minutes = parseInt((client.uptime / (1000 * 60)) % 60),
        hours = parseInt((client.uptime / (1000 * 60 * 60)) % 24);
        days = parseInt((client.uptime / (1000 * 60 * 60 * 24)) % 60);
        days = (days < 10) ? "0" + days : days;
        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;

        try {
            delete require.cache[require.resolve(`./${commandName}.js`)]
            client.commands.delete(commandName);
            const pull = require(`./${commandName}.js`);
            client.commands.set(commandName, pull);
        } catch(e) {
            console.log(e);
            message.channel.send(`Could not reload : \`${commandName}.js\``);
        }
        const embed = new MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true, size: 256}))
            .setDescription(`:white_check_mark: | Succesfully reloaded the command!`)
            .setColor('#0070fa')
            .addField(`Reloaded`,`\`${commandName}\``)
            .addField(`Directory`,`\`/Dagger/commands/${commandName}\``)
            .addField(`File Size`,`\`${kb} Kb\``)
            .setTimestamp()
            .setFooter(`Uptime ${days}:${hours}:${minutes}:${seconds}`);
        message.channel.send(embed);
        } catch(e){
            const commandName = args[0]
            if(!commandName){
                const commandName = 'None set'
            }

            var milliseconds = parseInt((client.uptime % 1000) / 100),
            seconds = parseInt((client.uptime / 1000) % 60),
            minutes = parseInt((client.uptime / (1000 * 60)) % 60),
            hours = parseInt((client.uptime / (1000 * 60 * 60)) % 24);
            days = parseInt((client.uptime / (1000 * 60 * 60 * 24)) % 60);
            days = (days < 10) ? "0" + days : days;
            hours = (hours < 10) ? "0" + hours : hours;
            minutes = (minutes < 10) ? "0" + minutes : minutes;
            seconds = (seconds < 10) ? "0" + seconds : seconds;

            const embed = new MessageEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true, size: 256 }))
                .setDescription(`:negative_squared_cross_mark:  | Could not reload the command!`)
                .setColor(`#cf1919`)
                .addField(`Reloaded`,`\`${commandName}\``)
                .addField(`Directory`,`\`/Dagger/commands/${commandName}\``)
                .setTimestamp()
                .setFooter(`Uptime ${days}:${hours}:${minutes}:${seconds}`);
            message.channel.send(embed);
            console.log(`Error occured!`);
            console.log(e);
        }
    }
}
