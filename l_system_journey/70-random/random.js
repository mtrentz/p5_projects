function generateRandomLSystem() {
    const alphabet = "+-FGXYMNOP[]";
    const variables = "FG";
    const placeholders = "XYMNOP";

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function randomRule() {
        let ruleLength = getRandomInt(2, 6);
        let rule = "";

        for (let i = 0; i < ruleLength; i++) {
            let c = alphabet[getRandomInt(0, alphabet.length - 1)];

            if (c === '[') {
                rule += c;
                c = placeholders[getRandomInt(0, placeholders.length - 1)];
            } else if (c === ']') {
                continue;
            }

            rule += c;
        }

        return rule;
    }

    let angle = getRandomInt(15, 45);
    let axiom = "X";
    let rules = {};

    for (let i = 0; i < placeholders.length; i++) {
        let placeholder = placeholders[i];
        rules[placeholder] = randomRule();
    }

    rules['F'] = "FF";
    rules['G'] = "FG";

    return {
        angle: angle,
        axiom: axiom,
        rules: rules
    };
}
