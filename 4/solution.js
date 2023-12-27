const readline = require('readline');
const fs = require('fs');

(async function solve() {
    const fileStream = fs.createReadStream('input.in');
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    let result = 0;
    for await (const line of rl) {
        let [winning, selected] = line.split('|');
        winning = winning.split(' ');
        winning = winning.slice(2, winning.length-1);
        let map = new Set();
        winning.forEach(n => map.add(n));
        selected = selected.split(' ').filter(s => s != '');
        let acc = 0;
        for (const n of selected) 
            if (map.has(n)) acc = (acc == 0 ? 1 : acc * 2);
        result = result + acc;
    }

    console.log(result);
})();