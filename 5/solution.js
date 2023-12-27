const fs = require('fs');
const readline = require('readline');

(async function solve() {
    const fileStream = fs.createReadStream('input.in');
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    })

    let flag = true;
    let [acc, locked] = [null, null];

    for await (const line of rl) {
        if (flag) {
            acc = line.split(' ').slice(1).map(s => +s);
            flag = false;
        } else {
            if (line.length == 0) {
                locked = Array.from({length: acc.length}, () => false);
                continue;
            }
            let tokens = line.split(' ');
            if (tokens.length != 3)
                continue;
            let [dest, source, range] = tokens.map(s => +s);
            let offset = dest - source;
            for (let idx = 0; idx < acc.length; idx++) {
                if (acc[idx] >= source && acc[idx] <= source + range && !locked[idx]) {
                    acc[idx] = acc[idx] + offset;
                    locked[idx] = true;
                }
            }
        }
    }

    console.log(Math.min(...acc));
})();