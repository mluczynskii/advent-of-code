const fs = require('fs');
const readline = require('readline');

let dict = {};

(async function solve() {
    const fileStream = fs.createReadStream('input.in')
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    let decide = function(part, conclusion) {
        if (conclusion == 'A') return part.x + part.m + part.a + part.s;
        else if (conclusion == 'R') return 0;
        else return dict[conclusion](part);
    }

    let parse = function(step) {
        if (step[0].indexOf('>') != -1) return [(a, b) => a > b, '>'];
        else return [(a, b) => a < b, '<']; 
    }

    let flag = true;
    let result = 0;
    for await (const line of rl) {
        if (line.length <= 0) flag = false;
        else if (flag) {
            let [label, flow] = line.split(' ');
            let steps = flow.split(',');
            dict[label] = function(part) {
                for (let step of steps) {
                    step = step.split(':');
                    if (step.length == 1) return decide(part, step[0]);
                    else {
                        let [pred, separator] = parse(step);
                        let [field, value] = step[0].split(separator);
                        if (pred(part[field], value)) return decide(part, step[1]);
                    }
                }
            }
        } else {
            let [x, m, a, s] = line.split(', ').map(s => +s);
            result = result + dict['in']({x, m, a, s});
        }
    }
    console.log(result);
})();