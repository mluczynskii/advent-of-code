const fs = require('fs');
const readline = require('readline');

let xs = [];
const offsets = [[0, 1], [0, -1], [1, 0], [-1, 0]];

function sim(start_y, start_x, dir) {
    let q = [[[start_y, start_x], dir]];
    
    let height = xs.length, width = xs[0].length;
    let path = Array.from({length: height}, _ => Array.from({length: width}, _ => '.'));
    
    while (q.length > 0) {
        let [[idy, idx], direction] = q.shift();
        while (true) {
            if (idy < 0 || idx < 0 || idy >= height || idx >= width) break;
            else if ('RL'.indexOf(direction) != -1 && path[idy][idx] == '-' && '\\/'.indexOf(xs[idy][idx]) == -1) break;
            else if ('UD'.indexOf(direction) != -1 && path[idy][idx] == '|' && '\\/'.indexOf(xs[idy][idx]) == -1) break;

            path[idy][idx] = 'RL'.indexOf(direction) != -1 ? '-' : '|';
            
            if (xs[idy][idx] == '|' && 'RL'.indexOf(direction) != -1) {
                q.push([[idy, idx], 'U']);
                direction = 'D';
            } else if (xs[idy][idx] == '-' && 'UD'.indexOf(direction) != -1) {
                q.push([[idy, idx], 'L']);
                direction = 'R';
            } else if (xs[idy][idx] == '/') {
                if ('DR'.indexOf(direction) != -1) direction = 'LU'['DR'.indexOf(direction)];
                else direction = 'RD'['UL'.indexOf(direction)];
            } else if (xs[idy][idx] == '\\') {
                if ('DL'.indexOf(direction) != -1) direction = 'RU'['DL'.indexOf(direction)];
                else direction = 'LD'['UR'.indexOf(direction)];
            }

            let [off_y, off_x] = offsets['RLDU'.indexOf(direction)];
            [idy, idx] = [idy + off_y, idx + off_x];
        }
    }

    let result = 0;
    for (let idy = 0; idy < height; idy++) {
        for (let idx = 0; idx < width; idx++) {
            if (path[idy][idx] != '.') result++;
        }
    }

    return result;
}

(async function solve() {
    const fileStream = fs.createReadStream('input.in');
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    for await (let line of rl) 
        xs.push(line);
    
    let result = -Infinity;

    for (let idy = 0; idy < xs.length; idy++) result = Math.max(result, sim(idy, 0, 'R'))
    for (let idy = 0; idy < xs.length; idy++) result = Math.max(result, sim(idy, xs[0].length-1, 'L'))
    for (let idx = 0; idx < xs[0].length; idx++) result = Math.max(result, sim(0, idx, 'D'))
    for (let idx = 0; idx < xs[0].length; idx++) result = Math.max(result, sim(xs.length-1, idx, 'U'))

    console.log(result);
    
})();