const fs = require('fs');
const readline = require('readline');

function newton(n, k) {
    let [nominator, denominator] = [1, 1];
    for (let idx = 1; idx <= k; idx++) {
        nominator *= (n - idx + 1);
        denominator *= idx;
    }
    return nominator/denominator;
}

function difference(xs, start, end) {
    let n = end-start;
    let result = 0;
    for (let k = 0; k <= n; k++) {
        let a = newton(n, k);
        if (k % 2 == 1) result -= a * xs[end-k];
        else result += a * xs[end-k];
    }
    return result;
}

(async function solve() {
    const fileStream = fs.createReadStream('input.in');
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    let result = 0;
    for await (const line of rl) {
        let xs = line.split(' ').map(s => +s);
        let n = xs.length;
        let acc = 0;
        for (let idx = n-1; idx >= 1; idx--) {
            let left = difference(xs, n-1-idx, n-1)
            acc = acc + left;
        }
        let interpolation = xs[n-1]+acc;
        result += interpolation;
    }
    console.log(result);
})();