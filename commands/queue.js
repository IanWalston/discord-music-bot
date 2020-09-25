const { MessageEmbed } = require("discord.js");
const duration = require('./play')

module.exports = {
    name: "queue",
    aliases: ["q"],
    category: "Music",
    description: "See the music queue for this guild.",
    dev: true,
    path: __filename,
    run: async (client, message, args) => {
      try {
        let embed = new MessageEmbed();

        const { channel } = message.member.voice;
    
        if (!channel) {
            embed.setAuthor("An error occured!");
            embed.setColor('#0070fa')
            embed.setDescription("You're not in a voice channel.");
            return message.channel.send(embed);
        }
    
        const serverQueue = message.client.queue.get(message.guild.id);
    
        if (!serverQueue) {
            embed.setAuthor("Queue Empty");
            embed.setColor('#0070fa')
            embed.setDescription("There is nothing in the queue, start playing music with -play [song]");
            return message.channel.send(embed);
        }
        
        embed.setDescription(
          `The queue for **${message.guild.name}**\`\`\`${serverQueue.songs
            .map((song, index) => index + 1 + ". " + song.title)
            .join("\n\n")}\`\`\`\n \`\`\`Now Playing : ${serverQueue.songs[0].title}\n⚪────────────────────────────────────────────\nᴴᴰ ⚙ ❐ ⊏⊐   ◄◄⠀▐▐ ⠀►►  0:00 / ${duration.duration || '2:13'} 🔊 ${serverQueue.volume || `100`}%\`\`\``,
          { split: true }
        );
        //embed.addField(`test`,`\`\`\`⚪────────────────────────────────────────────\nᴴᴰ ⚙ ❐ ⊏⊐   ◄◄⠀▐▐ ⠀►►  0:00 / ${duration.duration} ⠀ ───○ 🔊\`\`\``)
        embed.setColor(`#0070fa`)
        //.setTitle(`The queue for \`${message.guild.name}\``)
        embed.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true, size: 256 }))
        
        message.channel.send(embed);
      } catch(e) {
        embed.setAuthor("An error occured!");
            embed.setDescription("Please retype the command.");
            console.log(e);
            return message.channel.send(embed);
      }
    }
}