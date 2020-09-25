const chalk = require("chalk");

class Logger {
    constructor(client) {
        this.client = client;
    }

    log(message) {
        console.log(chalk.bgBlack.greenBright(`${date.now} | ${message}`));
    }

    error(message) {
        console.log(chalk.bgBlack.redBright(`${date.now} | ${message}`));
    }
}

module.exports = Logger;