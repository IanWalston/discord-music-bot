var counter = require('counter')
      count = counter(0)
const fs = require('fs')

module.exports = (client) => {

    getFiles('./commands').forEach((item) => {
        count.value += 1
        let prop = require(`.${item}`);
        if(!prop.name) throw new TypeError("Missing prop.name"); 
        client.commands.set(prop.name, prop);
        if(!prop.aliases) return;
        prop.aliases.forEach((alias) => {
            client.aliases.set(alias, prop);
        });
    });
    module.exports.count = count.value;
}

function getFiles(filepath) {

    let items = [];
    let files = fs.readdirSync(filepath);
    files.forEach((file) => {
        let stats = fs.statSync(`${filepath}/${file}`);
        if(stats.isDirectory()) return items.push(getFiles(`${filepath}/${file}`));
        items.push(`${filepath}/${file}`);
    });
    return items.flat();
  
}

// ^^ command handler.