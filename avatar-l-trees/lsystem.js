class StochasticLSystem {
    constructor(axiom, rules) {
        this.axiom = axiom;
        this.rules = rules;
        this.current = axiom;
        this.generation = 0;
    }

    generate() {
        let next = '';
        for (let i = 0; i < this.current.length; i++) {
            let current = this.current.charAt(i);
            if (current in this.rules) {
                let replacement;

                // Check if rule is array
                if (Array.isArray(this.rules[current])) {
                    // // If so, pick a random one to be the replacement
                    replacement = _pickRandomValue(this.rules[current]);
                } else {
                    // Otherwise, just use the rule
                    replacement = this.rules[current];
                }

                next += replacement;
            } else {
                next += current;
            }
        }
        this.current = next;
        this.generation++;
    }
}

function _pickRandomValue(arr) {
    const totalProb = arr.reduce((acc, val) => acc + val[0], 0);
    let rand = Math.random() * totalProb;
    for (let i = 0; i < arr.length; i++) {
        const [prob, value] = arr[i];
        if (rand < prob) {
            return value;
        }
        rand -= prob;
    }
    return null;
}

