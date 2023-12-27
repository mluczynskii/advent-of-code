const fs = require('fs');
const readline = require('readline');

(async function solve() {
    const fileStream = fs.createReadStream('input.in');
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    let xs = [];
    for await (const line of rl) xs.push(line);
    let height = xs.length;
    xs = xs[0].split('').map((_, idx) => xs.map(row => row[idx]).join(''));
    xs = xs.map(x => x.split('#'));
    let result = 0;
    for (const ys of xs) {
        let load = height;
        for (const component of ys) {
            let offset = component.length;
            for (let cnt = 0; cnt < (component.match(/O/g) || []).length; cnt++)
                result = result + load - cnt;
            load = load - offset - 1;
        }
    }
    console.log(result);
})();