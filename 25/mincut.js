const fs = require('fs');
const readline = require('readline');

function find(uf, node) {
    if (uf[node].parent != node)
        uf[node].parent = find(uf, uf[node].parent);
    return uf[node].parent;
}

function union(uf, node_a, node_b) {
    let a = find(uf, node_a), b = find(uf, node_b);

    if (uf[a].rank < uf[b].rank)
        uf[a].parent = b;
    else {
        uf[b].parent = a;
        if (uf[a].rank == uf[b].rank)
            uf[a].rank++;
    }
}

async function mincut() {
    const fileStream = fs.createReadStream('input.in')
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
     
    let edges = [], V = 0;
    let uf = {};
    for await (const line of rl) {
        let [src, xs] = line.split(': ');
        if (uf[src] == undefined) {
            uf[src] = {parent: src, rank: 0};
            V++;
        }
        for (const dest of xs.split(' ')) {
            edges.push([src, dest]);
            if (uf[dest] == undefined) {
                uf[dest] = {parent: dest, rank: 0};
                V++;
            }
        }
    }
    let E = edges.length;

    // https://en.wikipedia.org/wiki/Karger%27s_algorithm
    let count = V;
    while (count > 2) {
        let idx = Math.floor(Math.random() * E);
        let [src, dest] = edges[idx];
        let a = find(uf, src), b = find(uf, dest);
        
        if (a == b) 
            continue;
        else {
            count--;
            union(uf, a, b);
        }
    }

    let result = [];
    for (let idx = 0; idx < E; idx++) {
        let [src, dest] = edges[idx];
        let a = find(uf, src), b = find(uf, dest);
        if (a != b) result.push([src, dest]);
    }

    return result;
};

(async function main() {
    let best = Infinity, res = undefined;
    for (let idx = 0; idx < 1000; idx++) {
        let result = await solve();
        if (result.length < best) {
            best = result.length;
            res = result;
        }
    }
    console.log(res);
})();