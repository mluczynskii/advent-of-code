(function solve() {
    
    /*
    let T = 71530
    let best = 940200
    */

    let T = 40829166
    let best = 277133813491063

    let delta = Math.pow(T, 2) - 4 * best;
    let t1 = Math.ceil((T - Math.sqrt(delta))/2);
    let t2 = Math.floor((T + Math.sqrt(delta))/2);
    let result = t2 - t1 + 1;

    console.log(result);
})();