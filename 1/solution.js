const fs = require('node:fs');
const readline = require('node:readline');

(async function solve() {
  const fileStream = fs.createReadStream('input.in');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let acc = 0;
  for await (const line of rl) {
    let value = 0;
    for (let idx = 0; idx < line.length; idx++) {
        let ascii = line[idx].charCodeAt();
        if (ascii >= 48 && ascii <= 57) {
            value = value + (line[idx] * 10);
            break;
        }
    }
    for (let idx = line.length-1; idx >= 0; idx--) {
        let ascii = line[idx].charCodeAt();
        if (ascii >= 48 && ascii <= 57) {
            value = value + (line[idx] * 1);
            break;
        }
    }
    acc = acc + value;
  }
  console.log(acc);
})();