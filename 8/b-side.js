const fs = require('fs');
const readline = require('readline');


(async function solve() {
    const filename = 'input.in'
    const fileStream = fs.createReadStream(filename);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    for await (let line of rl) {
        if (line.length == 0) {
            first = false;
            continue;
        }
        if (first) {
            sequence = line;
        } else {
            line = line.replace(/\(|\)/g, '');
            let [src, dest] = line.split(' = ');
            let [left, right] = dest.split(', ');
            graph[src] = {left, right};
        }
    }

})();