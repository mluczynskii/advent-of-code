const fs = require('fs');
const readline = require('readline');

function domain(config, size) {
        let result = [];
        if (config.length == 0) return ['.'.repeat(size)];
        if (config.reduce((acc, x) => acc + x, 0) + config.length - 1 > size)
            return null; 
        
        let d = config[0];
        for (let i = 0; i < size-d+1; i++) {
            let pref = '.'.repeat(i) + '#'.repeat(d);
            if (config.length == 1)
                result.push(pref + '.'.repeat(size - pref.length));
            else {
                let xs = domain(config.slice(1), size-pref.length-1);
                if (xs == null) continue
                for (const suf of xs) {
                    if (suf == '') result.push(pref);
                    else result.push(pref + '.' + suf);
                }
            }
        }
        return result;
}

function complaint(template) {
    return function(xs) {
        for (let idx = 0; idx < xs.length; idx++) {
            if (template[idx] == '.' && xs[idx] != '.') return false;
            else if (template[idx] == '#' && xs[idx] != '#') return false;
        }
        return true;
    }
}

(async function solve() {
    const fileStream = fs.createReadStream('input.in');
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity 
    });
    let result = 0;
    for await (const line of rl) {
        let [template, config] = line.split(' ');
        config = config.split(',').map(c => +c);
        let possible = domain(config, template.length);
        possible = possible.filter(complaint(template));
        result = result + possible.length;
    }
    console.log(result);
})();
