let expression = [];
let score = 0;
let lives = 3;
let combo = 0;

// random number
function rand() {
    return Math.floor(Math.random() * 9) + 1;
}

// generate question
function generateExpression() {
    expression = [rand(), "+", rand(), "×", rand()];
    renderExpression();
}

// render expression
function renderExpression() {
    let el = document.getElementById("expression");
    el.innerHTML = "";

    expression.forEach((item, index) => {
        let span = document.createElement("span");
        span.innerText = item;

        // 🔥 FIX: FORCE CLICK EVENT
        if (item === "+" || item === "-" || item === "×" || item === "÷") {
            span.style.cursor = "pointer";

            span.addEventListener("click", function () {
                handleClick(index, span);
            });
        }

        el.appendChild(span);
    });
}

// bodmas logic
function getNextOperation() {
    let priority = ["÷", "×", "+", "-"];

    for (let op of priority) {
        for (let i = 0; i < expression.length; i++) {
            if (expression[i] === op) return i;
        }
    }
}

// click handler
function handleClick(index, element) {
    let correctIndex = getNextOperation();

    if (index === correctIndex) {
        element.style.background = "green";

        solve(index);

        score += 10;
        combo++;

        showFeedback("✅ Correct!");
    } else {
        element.style.background = "red";

        lives--;
        combo = 0;

        showFeedback("❌ Wrong!");

        if (lives <= 0) gameOver();
    }

    updateStats();
}

// solve step
function solve(i) {
    let a = expression[i - 1];
    let b = expression[i + 1];
    let op = expression[i];

    let res;

    if (op === "×") res = a * b;
    if (op === "+") res = a + b;

    expression.splice(i - 1, 3, res);

    renderExpression();

    if (expression.length === 1) {
        showFeedback("🎉 Completed!");
    }
}

// stats
function updateStats() {
    document.getElementById("score").innerText = score;
    document.getElementById("lives").innerText = lives;
    document.getElementById("combo").innerText = combo;
}

// feedback
function showFeedback(msg) {
    document.getElementById("feedback").innerText = msg;
}

// next
function nextStep() {
    if (expression.length === 1) generateExpression();
}

// game over
function gameOver() {
    showFeedback("💀 Game Over");
}

// init
generateExpression();