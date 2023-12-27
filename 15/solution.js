const fs = require('fs');
const readline = require('readline');

function hash(str) {
    let value = 0;
    for (let idx = 0; idx < str.length; idx++) {
        let ascii = str.charCodeAt(idx);
        value = (value + ascii) * 17 % 256;
    }
    return value;
}

(async function solve() {
    const fileStream = fs.createReadStream('input.in');
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    let result = 0;
    for await (let line of rl) {
        line = line.split(',');
        for (const component of line)
            result = result + hash(component);
    }
    console.log(result);
})();