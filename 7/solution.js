const readline = require('readline');
const fs = require('fs');

const chars = 'AKQJT98765432';

function calc_rank(hand) {
    let [pairs, counts] = [0, {}];

    for (const c of chars) {
        let n = (hand.match(new RegExp(`${c}`, 'g')) || []).length;
        if (n == 2) pairs++;
        counts[c] = n;
    }
    counts = Object.values(counts);

    if (counts.includes(5)) return 7;
    else if (counts.includes(4)) return 6;
    else if (counts.includes(2) && counts.includes(3)) return 5;
    else if (counts.includes(3)) return 4;
    else if (pairs == 2) return 3;
    else if (counts.includes(2)) return 2;
    else return 1; 
}

function comp(a, b) {
    let [hand_a, rank_a] = a;
    let [hand_b, rank_b] = b;
    if (rank_a > rank_b) return 1
    else if (rank_a < rank_b) return -1
    for (let idx = 0; idx < hand_a.length; idx++) {
        let [ac, ab] = [hand_a[idx], hand_b[idx]];
            if (ac != ab)
                return (chars.indexOf(ac) < chars.indexOf(ab)) * 2 - 1;
    }
    return 0;
}

(async function solve() {
    const fileStream = fs.createReadStream('input.in')
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    let result = 0;
    let acc = []
    for await (const line of rl) {
        let [hand, bid] = line.split(' ');
        let rank = calc_rank(hand);
        acc.push([hand, rank, bid]);
    }
    acc.sort(comp);
    for (let idx = 0; idx < acc.length; idx++) {
        let bid = acc[idx][2];
        result = result + bid * (idx + 1)
    }
    console.log(result);
})();