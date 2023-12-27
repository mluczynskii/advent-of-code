const fs = require('fs');
const readline = require('readline');

function traverse(graph, start, seq) {
    let curr = start;
    let consumed = 0;
    for (const c of seq) {
        if (curr == 'ZZZ') break;
        if (c == 'R') curr = graph[curr].right;
        else curr = graph[curr].left;
        consumed++;
    }
    return [curr, consumed];
}

(async function solve() {
    const filename = 'input.in'
    const fileStream = fs.createReadStream(filename);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    let first = true;
    let sequence = '';
    let graph = {};
    for await (let line of rl) {
        if (line.length == 0) {
            first = false;
            continue;
        }
        if (first) {
            sequence = line;
        } else {
            line = line.replace(/\(|\)/g, '');
            let [src, dest] = line.split(' = ');
            let [left, right] = dest.split(', ');
            graph[src] = {left, right};
        }
    }
    let result = 0;
    let curr = 'AAA';
    let consumed;
    while (curr != 'ZZZ') {
        [curr, consumed] = traverse(graph, curr, sequence);
        result = result + consumed;
    }
    console.log(result);
})();