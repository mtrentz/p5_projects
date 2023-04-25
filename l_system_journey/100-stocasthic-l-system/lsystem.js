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
                    // If so, pick a random one to be the replacement
                    replacement = random(this.rules[current]);
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