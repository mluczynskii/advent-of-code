const fs = require('fs');
const readline = require('readline');

const offsets = [[1, 0], [-1, 0], [0, 1], [0, -1]];

(async function solve() {
    const fileStream = fs.createReadStream('input.in')
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    let [x, y] = [0, 0];  
    let cords = [[x, y]];
    let border = 0;
    for await (const line of rl) {
        let [direction, step, _] = line.split(' ');
        let [off_x, off_y] = offsets['RLUD'.indexOf(direction)];
        [x, y] = [x + off_x * step, y + off_y * step];
        border = border + (+step);
        cords.push([x, y]);
    }

    let inner = 0;
    for (let idx = cords.length-1; idx > 0; idx--) {
        // https://en.wikipedia.org/wiki/Shoelace_formula
        let triangle = cords[idx][0]*cords[idx-1][1] - cords[idx][1]*cords[idx-1][0];
        inner = inner + triangle;
    }

    // https://en.wikipedia.org/wiki/Pick%27s_theorem
    console.log(inner/2 + border/2 + 1);

})();