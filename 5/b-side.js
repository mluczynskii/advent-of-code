const fs = require('fs');
const readline = require('readline');
const lodash = require('lodash');

function convert(init, maps) {
    for (let step = 0; step < maps.length; step++) {
        for (const info of maps[step]) {
            if (init >= info.start && init < info.end) {
                init = init + info.offset;
                break;
            }
        }
    }
    return init;
}

(async function solve() {
    const fileStream = fs.createReadStream('input.in');
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    })

    let flag = true;
    let context = -1;
    let args = null;

    let maps = Array.from({length: 7}, () => []);

    for await (const line of rl) {
        if (flag) {
            args = lodash.chunk(line.split(' ').slice(1).map(s => +s), 2);
            flag = false;
        } else {
            if (line.length == 0) {
                context = context + 1;
                continue;
            }
            let tokens = line.split(' ');
            if (tokens.length != 3) continue;
            let [dest, src, n] = tokens.map(s => +s);
            let info = { 
                start: src,
                end: src+n, // [start, end)
                offset: dest - src
            }
            maps[context].push(info);
        }
    }

    let result = Infinity;
    for (const [s, n] of args) {
        for (let seed = s; seed < s + n; seed++) {
            let final = convert(seed, maps);
            result = Math.min(result, final);
        }
    }
    console.log(result);

})();