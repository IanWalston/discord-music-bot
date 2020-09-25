const fs = require('fs');
const { basename } = require("path");

module.exports = client => {
    let items = getFiles(`./events`);
    items.forEach((filepath) => {
        let eName = basename(filepath).replace(".js", "");
        let evtClass = require("." + filepath);
        let evt = new evtClass(client, eName);
        client.on(eName, evt._run.bind(null, client));
    });

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
}