const fs = require('fs');
const readline = require('readline');

(async function solve() {
    const fileStream = fs.createReadStream('input.in');
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    let galaxies = [];
    let row = 0;
    for await (const line of rl) {
        if (line.match(/#/g) == null) {
            row = row + 1000000;
        } else {
            for (let col = 0; col < line.length; col++)
                if (line[col] == '#') galaxies.push([row, col]);
            row = row + 1;
        }
    }
    galaxies.sort((a, b) => a[1] - b[1]);
    let result = 0;
    for (let i = 0; i < galaxies.length; i++) {
        let a = galaxies[i];
        let offset = 0;
        for (let j = i+1; j < galaxies.length; j++) {
            let b = galaxies[j];
            let diff_y = Math.abs(a[0] - b[0]);
            let diff_x = b[1] - a[1];
            offset = offset + Math.max(0, b[1] - galaxies[j-1][1] - 1);
            result = result + diff_y + diff_x + (offset * 999999);
        }
    }
    console.log(result);
})();