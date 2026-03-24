function getNextOperation(exp) {
    let priority = ["÷", "×", "+", "-"];

    for (let op of priority) {
        for (let i = 0; i < exp.length; i++) {
            if (exp[i] === op) return i;
        }
    }
}