const Event = require("../events.js");

class ReadyEvent extends Event {

    constructor(client, eName) {
        super(client, eName);
        this.name = "ready";
        this.file = {
            name: "ready"
        };
    }

    async _run(client) {
        
        console.log(`online!`);
        client.user.setActivity(`-help | ${client.users.cache.size} users`, {type: 'PLAYING'})

    }

}

// Ready event for the Discord bot. This will be executed when Discord tells my bot that he's ready.

module.exports = ReadyEvent;