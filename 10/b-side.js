const fs = require('fs');
const readline = require('readline'); 

(async function solve() {
    const fileStream = fs.createReadStream('input.in');
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    let board = [];
    let [col, row] = [-1, -1];
    let idy = 0;
    for await (const line of rl) {
        board.push(line);
        if (line.match(/S/g)) {
            col = idy;
            row = line.indexOf('S');
        }
        idy++;
    }

    let visited = 
        Array.from({length: board.length}, 
                   () => Array.from({length: board[0].length}, 
                                    () => false));
    let q = [[col, row]];
    visited[col][row] = true;

    while (q.length != 0) {
        let [idy, idx] = q.shift();
        
        let xs = [];
        let symbol = board[idy][idx];
        if ('7|FS'.includes(symbol)) xs.push([idy+1, idx, 'J|L']);
        if ('J|LS'.includes(symbol)) xs.push([idy-1, idx, '7|F']);
        if ('7J-S'.includes(symbol)) xs.push([idy, idx-1, 'L-F']);
        if ('FL-S'.includes(symbol)) xs.push([idy, idx+1, 'J-7']);

        for (const [y, x, str] of xs) {
            if (y < 0 || x < 0 || y >= board.length || x >= board[0].length) 
                continue;
            if (!visited[y][x] && str.includes(board[y][x])) {
                visited[y][x] = true;
                q.push([y, x]);
            }
        }  
    }

    // hardcoded
    board[col][row] = '-';

    let result = 0;
    let n = board.length;
    let m = board[0].length;
    for (let idy = 0; idy < n; idy++) {
        for (let idx = 0; idx < m; idx++) {
            if (visited[idy][idx]) continue;
            let crossed = 0;
            for (let p = 0; p < idx; p++)
                if (visited[idy][p] && '|LJ'.includes(board[idy][p])) crossed++;
            if (crossed % 2) result++;
        }
    }
    console.log(result);
})();