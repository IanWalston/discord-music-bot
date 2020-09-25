const Event = require("../events.js");

class voiceStateUpdate extends Event {

    constructor(client, eName) {
        super(client, eName);
        this.name = "voiceStateUpdate";
        this.file = {
            name: "voiceStateUpdate"
        };
    }

    async _run(client, oldstate, newstate) {
            // console.log(oldstate);
            // console.log(newstate);
    }

}

module.exports = voiceStateUpdate;