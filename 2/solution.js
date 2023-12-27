const fs = require('node:fs');
const readline = require('node:readline');

const limits = {
    red: 12,
    blue: 14,
    green: 13
};

(async function solve() {
    const fileStream = fs.createReadStream('input.in');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    let result = 0;
    for await (const line of rl) {
        let flag = true;
        let [id, info] = line.split(':');
        id = +id.split(' ')[1];
        let games = info.split(';');
        for (const game of games) {
            let colors = game.split(',');
            for (const color of colors) {
                let [_, count, name] = color.split(' ');
                if (+count > limits[name]) flag = false;
            }
        }
        if (flag) result = result + id;
    }
    console.log(result);
})();