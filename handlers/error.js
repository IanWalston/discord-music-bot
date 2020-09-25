const config = require("../config/config.js");
const errors = require("../config/errors.js");
const chalk = require('chalk');


class ErrorHandler {
    constructor(client) {
        this.client = client;
    }

	log(error) {
        const message = chalk.bgCyan("LOG: ") + chalk.bgCyan.bold(error);
        console.log(message);
    }

    send() {
        
    }

    error(error) {
        const message = chalk.bgRed("ERROR: ") + chalk.bgRed.bold(error);
        console.log(message);
    }
}

module.exports = ErrorHandler;