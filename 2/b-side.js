const fs = require('node:fs');
const readline = require('node:readline');

(async function solve() {
    const fileStream = fs.createReadStream('input.in');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    let result = 0;
    for await (const line of rl) {
        let minset = {
            red: 0,
            blue: 0,
            green: 0
        };
        let [id, info] = line.split(':');
        id = +id.split(' ')[1];
        let games = info.split(';');
        for (const game of games) {
            let colors = game.split(',');
            for (const color of colors) {
                let [_, count, name] = color.split(' ');
                minset[name] = Math.max(count, minset[name]);
            }
        }
        let power = minset.blue * minset.red * minset.green;
        result = result + power;
    }
    console.log(result);
})();