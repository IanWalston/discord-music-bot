const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "options",
    aliases: ["settings"],
    category: "Admin",
    description: "Set/Change settings for your guild.",
    dev: false,
    checkArgs: args => !args.length,
    path: __filename,
    run: async (client, message, args) => {
        try {
            var changes = ["admin add", "admin remove", "admin list"];
            let option = args[0];
            let option_selected = args[1];
            if (!option) return message.reply(`You need to supply an option that you wish to set/change. (${changes.join(", ")})`);
            if (option.toLowerCase() === "admin") {
                if (option_selected.toLowerCase() === "add") {
                try {
                    let user = message.mentions.members.first() || message.guild.members.get(args[2]);
                    if (!user) return message.channel.send("That user is not found.");
                    if(!client.guildSettings.has(`guildSettings.guildAdmin.${message.guild.id}`)) {
                        client.guildSettings.push(`guildSettings.guildAdmin.${message.guild.id}`);
                    }
                    if (client.guildSettings.get(`guildSettings.guildAdmins.${message.guild.id}`).includes(user.id)) return message.reply("This user is already a guild admin!");
                    console.log(await client.guildSettings.get(`guildSettings.guildAdmin.${message.guild.id}`));
                    let guildAdmins = await client.guildSettings.get(`guildSettings.guildAdmin.${message.guild.id}`);
                    if (await client.guildSettings.get(`guildSettings.guildAdmin.${message.guild.id}`).includes(message.author.id)) return message.reply(client.errors.error.NO_ADMIN);
                    client.guildSettings.push(`guildSettings.guildAdmin.${message.guild.id}`, `${user.id}`);
                    let e1 = new MessageEmbed()
                        .setColor("GREEN")
                        .setDescription(`Success! ${user.username} is now a Guild Admin.`);
                    message.channel.send(e1);
                } catch (err) {
                    console.log(err);
                    message.channel.send(client.errors.error.default);
                }
            }
        }
        } catch(e) {
            embed.setAuthor("An error occured!");
            embed.setDescription("Please retype the command.");
            console.log(e);
            return message.channel.send(embed);
        }
    }
}