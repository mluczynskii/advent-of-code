const fs = require('node:fs');
const readline = require('node:readline');

const digits = ['one', 'two', 'three', 'four', 'five',
                'six', 'seven', 'eight', 'nine'];

(async function solve() {
  const fileStream = fs.createReadStream('input.in');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let result = 0;
  for await (let line of rl) {
    let value = 0;
    for (let idx = 0; idx < line.length; idx++) {
        let found = false;
        for (let p = 0; p < digits.length; p++) {
            if (line.slice(idx, idx+digits[p].length) == digits[p]) {
                value = value + (p+1) * 10;
                found = true;
            }
        }
        let ascii = line[idx].charCodeAt();
        if (ascii >= 49 &&  ascii <= 57) {
            value = value + (line[idx] * 10);
            found = true;
        }
        if (found) break;
    }
    line = '#####' + line;
    for (let idy = line.length-1; idy >= 5; idy--) {
        let found = false;
        for (let p = 0; p < digits.length; p++) {
            if (line.slice(idy-digits[p].length+1, idy+1) == digits[p]) {
                value = value + (p+1);
                found = true;
            }
        } 
        let ascii = line[idy].charCodeAt();
        if (ascii >= 49 &&  ascii <= 57) {
            value = value + (line[idy] * 1);
            found = true;
        }
        if (found) break;
    }
    console.log(value);
    result = result + value;
  }
  console.log(result);
})();