const fs = require('fs');
const readline = require('readline');

(async function solve() {
    const fileStream = fs.createReadStream('input.in')
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    const L = 200000000000000, M = 400000000000000;
    // const L = 7, M = 27;
     
    let records = [];
    for await (const line of rl) {
        let [pos, velocity] = line.split(' @ ');
        let [px, py, _] = pos.split(', ').map(Number);
        let [vx, vy, __] = velocity.split(', ').map(Number);
        records.push({px, py, vx, vy});
    }
    
    let intersection = function(n, m) {
        let a1 = n.vy / n.vx, a2 = m.vy / m.vx;
        let b1 = n.py - a1 * n.px, b2 = m.py - a2 * m.px;
        let x = (b2 - b1) / (a1 - a2);
        return [x, a1 * x + b1];
    }
    
    let result = 0;
    for (let i = 0; i < records.length-1; i++) {
        for (let j = i+1; j < records.length; j++) {
            let n = records[i], m = records[j];
            try {
                let [x, y] = intersection(n, m);
                let flag = true;
                for (const record of [n, m]) {
                    if ((record.vx > 0 && x < record.px) ||
                        (record.vx < 0 && x > record.px) ||
                        (record.vy > 0 && y < record.py) ||
                        (record.vy < 0 && y > record.py) ||
                        (x < L || x > M) || (y < L || y > M))
                            flag = false;
                }
                result = result + flag;
            } catch(error) {
                continue;
            }
        }
    }
    console.log(result);

})();