const fs = require('fs');
const readline = require('readline');

(async function solve() {
    const fileStream = fs.createReadStream('input.in');
    const rl = readline.createInterface({
        input: fileStream, 
        crlfDelay: Infinity
    });
    let result = 1;
    let distances, times;
    let flag = true;
    for await (const line of rl) {
        if (flag) {
            times = line.split(' ').slice(1).map(s => +s).filter(n => n > 0);
            flag = false; 
        }
        else distances = line.split(' ').slice(1).map(s => +s).filter(n => n > 0);; 
    }

    for (let idx = 0; idx < distances.length; idx++) {
        let acc = 0;
        let d = distances[idx];
        let T = times[idx];
        for (let t = 0; t <= T; t++)
            if (T * t - t * t > d) acc++;
        result = result * acc;
    }

    console.log(result);
})();