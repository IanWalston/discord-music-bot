const Event = require("../events.js");
const EventHandler = require("../handlers/error.js");

const handler = new EventHandler();

class MessageEvent extends Event {

    constructor(client, eName) {
        super(client, eName);
        this.name = "error";
        this.file = {
            name: "error"
        };
    }

    async _run(client, error) {
        handler.error(error.message);
    }

}

// Message event. This executes whenever a user types something.

module.exports = MessageEvent;