const { MessageEmbed } = require("discord.js");
// Hi.
//Hello.
// So let's see the database.
module.exports = {
    name: "timer",
    aliases: ["delay", "wait", "schedule"],
    category: "Admin",
    description: "Give the bot a command to run in the future ",
    dev: false,
    checkArgs: args => !args.length,
    path: __filename,
    run: async (client, message, args) => {
        let time_delay = args[0];
        let delayed_message = args[1];

        const embed = new MessageEmbed()
        .setDescription(`lol hi`)

        setTimeout(
            message.channel.send(embed), 6000
        )
    }
}