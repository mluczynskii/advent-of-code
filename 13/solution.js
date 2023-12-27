const readline = require('readline');
const fs = require('fs');

function vertical(xs) {
    xs = xs[0].split('').map((_, idx) => xs.map(row => row[idx]).join(''));
    return horizontal(xs)/100;
}

function horizontal(xs) {
    for (let idy = 0; idy < xs.length-1; idy++) {
        if (xs[idy] == xs[idy+1]) {
            let flag = true;
            for (let d = 1; d <= Math.min(idy, xs.length-idy-2); d++) {
                if (xs[idy-d] != xs[idy+1+d]) {
                    flag = false;
                    break;
                }
            }
            if (flag) return (idy+1) * 100;
        }
    }
    return 0;
}

(async function solve() {
    const fileStream = fs.createReadStream('input.in');
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    let result = 0;
    let xs = [];
    for await (const line of rl) {
        if (line.length <= 0) {
            result = result + horizontal(xs) + vertical(xs); 
            xs = [];
        } else xs.push(line);
    }
    result = result + horizontal(xs) + vertical(xs);
    console.log(result);
})();