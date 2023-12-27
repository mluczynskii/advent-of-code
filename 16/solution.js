const fs = require('fs');
const readline = require('readline');

(async function solve() {
    const fileStream = fs.createReadStream('input.in');
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    let xs = [];
    for await (let line of rl) 
        xs.push(line);
    
    const offsets = [[0, 1], [0, -1], [1, 0], [-1, 0]]; // RLDU

    let q = [[[0, 0], 'R']];
    
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

    // for (const row of path.map(x => x.join('')))
        // console.log(row);

    let result = 0;
    for (let idy = 0; idy < height; idy++) {
        for (let idx = 0; idx < width; idx++) {
            if (path[idy][idx] != '.') result++;
        }
    }
    console.log(result);
    
})();