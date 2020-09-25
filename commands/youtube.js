
const { MessageEmbed } = require("discord.js");
const axios = require("axios")
const config = require("../config/config")

module.exports = {
    name: "youtube",
    aliases: [],
    category: "Music",
    description: "Search a youtube video!",
    dev: false,
    checkArgs: args => !args.length,
    path: __filename,
    run: async (client, message, args) => {
        
        const searchTerm = args.join(' ')        
        const apiKey = config.client.youtube_api_key

        if (!apiKey){
            message.channel.send('Error: config file missing youtube API key')
            return
        }

        axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${searchTerm}&key=${apiKey}`).then(response => {
            const youtubeID = response.data.items[0].id.videoId
            const youtubeURL = 'https://www.youtube.com/watch?v=' + youtubeID
            message.channel.send(youtubeURL)
        })
    }
}