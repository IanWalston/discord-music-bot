const { MessageEmbed, Message } = require("discord.js");
const fs = require("fs");
const count = require('../handlers/command.js')
const count1 = require('../events/message.js')

module.exports = {
    name: "help",
    aliases: ["commands"],
    category: "Info",
    description: "Show the commands/categories.",
    dev: false,
    checkArgs: args => !args.length,
    path: __filename,
    run: async (client, message, args) => {
            try {
                const choice = args[0];
                const categories = client.commands.map(command => command.category.toLowerCase())
                const uniqueCategories = [...new Set(categories)];
                if (!choice) {
                    let help = new MessageEmbed()
                    .setColor('#0070fa')
                    //.setImage(`https://cdn.discordapp.com/attachments/704375578043875388/753282959527772240/DaggerBanner.PNG?size:2048`)
                    .setImage(`https://trello-attachments.s3.amazonaws.com/5f515b75292c2213f0126a3f/5f5a619ef513900d3c9b7346/391a31734a0a05d11b308657a575dde6/banner.png?size:2048`)
                    .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true, size: 256 }))
                    .setTitle(`Help for Dagger`)
                    
                    .setDescription(`To view the commands, execute \`-help <category>\`!`)
                    .addField(`Categories`, `\`${uniqueCategories.join("` \n`")}\`\n`,true)
                    .addField(`Dagger features a modular music system, and alot more. Add me to your server with the links below!`,`[Invite me](https://discord.com/api/oauth2/authorize?client_id=745281087948718281&permissions=238087297&scope=bot) ○ [Get Help](https://discord.gg/W7AvGFq)\n`)
                    .setTimestamp()
                    .setFooter(`Requested by : ${message.author.username}`)
                    message.channel.send(help)
                } else {
                    const valid = new MessageEmbed()
                    .setColor('#0070fa')
                    .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true, size: 256 }))
                    .setDescription(`<:false:751899297741668523> | That isnt a valid category.`)
                    .setFooter(`Valid categories: ${uniqueCategories.join(", ")}`)
                    if (!uniqueCategories.includes(choice)) return message.channel.send(valid);
                    let commands1 = client.commands.filter(command => command.category.toLowerCase() == choice).map(command => "-" + command.name + " | " + command.description)
                    const messageembed = new MessageEmbed()
                    .setColor('#0070fa')
                        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true, size: 256 }))
                        .setTitle(`Category : ${args[0]}`)
                        .setDescription(`Currently showing all commands available for ${args[0]}!`)
                        .addField(`Commands: `, `\`\`\`${commands1.join("\n")}\`\`\``, true)
                    message.channel.send(messageembed);
                }
            } catch (err) {
                console.error(err);
                message.channel.send(client.errors.error.default);
            }
    }
}