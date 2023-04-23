class LSystem {
    constructor(axios, rules) {
        this.axios = axios;
        this.rules = rules;
        this.current = axios;
        this.generation = 0;
    }

    generate() {
        let next = '';
        for (let i = 0; i < this.current.length; i++) {
            let current = this.current.charAt(i);
            if (current in this.rules) {
                next += this.rules[current];
            } else {
                next += current;
            }
        }
        this.current = next;
        this.generation++;
    }
}