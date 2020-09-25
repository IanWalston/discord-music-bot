const { Client, Collection } = require('discord.js');
const config = require('../config/config.js');
const event = require(`../handlers/event.js`);
const message = require(`../handlers/command.js`);

class Dagger {
    
    constructor() {
        
    }

    init() {

        this.client = module.exports = new Client();

        this.client.commands = new Collection();
        this.client.aliases = new Collection();
        this.client.categories = new Collection();
        this.client.config = require("../config/config.js");
        this.client.errors = require("../config/errors.js");
        this.client.queue = new Collection();

        event(this.client);
        message(this.client);

        this.client.login(config.client.token);
    }
}

module.exports = Dagger;
// Still working.