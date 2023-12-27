const fs = require('fs');
const readline = require('readline');

(async function solve() {
    const fileStream = fs.createReadStream('input.in')
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    let xs = []
    let [idy, root] = [0, undefined];
    for await (const line of rl) {
        for (let idx = 0; idx < line.length; idx++) 
            if (line[idx] == 'S') root = [idy, idx];
        xs.push(line);
        idy = idy + 1;
    }

    const offsets = [[0, 1], [0, -1], [1, 0], [-1, 0]];
    
    let q = [[root, 0]];
    let visited = Array.from({length: xs.length}, _ => Array.from({length: xs[0].length}, _ => false));
    visited[root[0]][root[1]] = true;

    const steps = 64;

    let result = 0;
    while (q.length > 0) {
        let [[y, x], dist] = q.shift();
        if (dist % 2 == steps % 2) result++;
        if (dist == steps) continue;
        for (const direction of 'RLDU') {
            let [off_y, off_x] = offsets['RLDU'.indexOf(direction)];
            let [new_y, new_x] = [y + off_y, x + off_x];

            if (new_y < 0 || new_x < 0 || new_y >= xs.length || new_x >= xs[0].length)
                continue;
            else if (xs[new_y][new_x] == '#') continue;
            else if (visited[new_y][new_x]) continue;

            visited[new_y][new_x] = true;
            q.push([[new_y, new_x], dist+1]);
        }
    }
    console.log(result);
})();