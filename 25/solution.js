const fs = require('fs');
const readline = require('readline');

// calculated using mincut.js
const mincut = [['mhb', 'zqg'], ['sjr', 'jlt'], ['fjn', 'mzb']];
// const mincut = [['jqt', 'nvd'], ['cmg', 'bvb'], ['pzl', 'hfx']];

function dfs(graph, visited, node) {
    visited[node] = true;
    for (const neighbor of graph[node]) {
        if (visited[neighbor] == undefined) dfs(graph, visited, neighbor);
    }
}

(async function solve() {
    const fileStream = fs.createReadStream('input.in')
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    
    let V = 0;
    let graph = {};
    let root = undefined;
    for await (const line of rl) {
        let [src, xs] = line.split(': ');
        root = src;
        if (graph[src] == undefined) {graph[src] = []; V++;}
        for (const dest of xs.split(' ')) {
            if (graph[dest] == undefined) {graph[dest] = []; V++;}

            let flag = true;
            for (const [a, b] of mincut) if (a == src && b == dest) flag = false;
            if (flag) {
                graph[src].push(dest);
                graph[dest].push(src);
            }
        }
    }

    let visited = {};
    dfs(graph, visited, root);
    let count = Object.keys(visited).length;
    console.log(count * (V - count));

})();