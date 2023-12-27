const fs = require('node:fs');
const readline = require('node:readline');

function isNumber(c) {
    let ascii = c.charCodeAt();
    return ascii >= 48 && ascii <= 57;
}

(async function solve() {
    const fileStream = fs.createReadStream('input.in');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    let result = 0

    let gears = [];
    let codes = [];
    
    let idy = 0;
    for await (let line of rl) {
        for (let idx = 0; idx < line.length; idx++) {
            if (line[idx] == '*') {
                let adjacent = [ 
                  [idx-1, idy-1], [idx, idy-1], [idx+1, idy-1],
                  [idx-1, idy],   [idx, idy],   [idx+1, idy],
                  [idx-1, idy+1], [idx, idy+1], [idx+1, idy+1]
                ].map(p => p.toString());
                gears.push({
                    adjacent: adjacent,
                    numbers: []
                })
            } else if (isNumber(line[idx])) {
                let n = idx+1;
                while(n < line.length && isNumber(line[n])) 
                    n = n + 1;
                let number = +line.slice(idx, n);
                let occupied = new Set();
                for (let i = idx; i < n; i++) 
                    occupied.add([i, idy].toString());
                codes.push({
                    value: number,
                    occupied: occupied
                });
                idx = n-1;
            }
        }
        idy++;
    }
    for (const code of codes) {
        for (let gear of gears) {
            for (let x of code['occupied']) {
                if (gear.adjacent.includes(x)) {
                    gear.numbers.push(code['value']);
                    break;
                }
            }
        }
    }
    gears = gears.filter(g => g.numbers.length == 2);
    for (const gear of gears) {
        let ratio = gear.numbers[0] * gear.numbers[1];
        result = result + ratio;
    }

    console.log(result);
})();