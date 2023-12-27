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

    const symbols = ['%', '*', '$', '-', '@', '#', '=', '+', '&', '/'];
    let result = 0

    let squares = new Set();
    let codes = [];
    let idy = 0;

    for await (let line of rl) {
        for (let idx = 0; idx < line.length; idx++) {
            if (symbols.includes(line[idx])) {
                let adjacent = [
                    [idx-1, idy-1], [idx, idy-1], [idx+1, idy-1],
                    [idx-1, idy],   [idx, idy],   [idx+1, idy],
                    [idx-1, idy+1], [idx, idy+1], [idx+1, idy+1]
                ]
                adjacent.forEach(p => squares.add(p.toString()));
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
    for (code of codes) {
        for (let x of code['occupied']) {
            if (squares.has(x)) {
                result = result + code['value'];
                break;
            }
        }
    }

    console.log(result);
})();