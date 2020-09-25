const Event = require("../events.js");
const handler = require("../handlers/error.js");
const config = require('../config/config.js')
const error = new handler();
var counter = require('counter')
      count = counter(0)

class MessageEvent extends Event {

    constructor(client, eName) {
        super(client, eName);
        this.name = "message";
        this.file = {
            name: "message"
        };
    }

    async _run(client, message) {
        if (!message.member) return;
        if (message.author.bot) return;
        let prefix = config.prefix ? config.prefix: "-";
        if (!message.content.startsWith(prefix)) return;
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const cmd = args.shift().toLowerCase();
        const command = client.commands.get(cmd) || client.aliases.get(cmd);
        
        if(!command) return;
        if(command.dev && !client.config.developers.includes(message.author.id)) return;

        try {
            count.value += 1;
            command.run(client, message, args);
            module.exports.count = count.value;
        } catch(e) {
            error.error(e);
        }
    }

}

// Message event. This executes whenever a user types something.
module.exports = MessageEvent;