const riddles = [
    {
        question: "I’m the liquid gold that fuels your day, born from cherries far away. Ground to perfection, I’m hot and bold, with flavors complex and stories untold. What am I?",
        answer: "Espresso"
    },
    {
        question: "I’m rich and creamy, but not quite dessert. A swirl of steamed milk makes me an expert flirt. Topped with a dash of something fine, I’m the perfect balance of bitter and divine. What am I?",
        answer: "Macchiato"
    },
    {
        question: "You see me often, though I’m never alone. Filled with froth or brew, I’m your café's throne. Though I can hold heat, I never feel cold, passed through many hands, stories I’ve told. What am I?",
        answer: "Coffee mug"
    },
    {
        question: "I’m twisted and buttery, though not what you think. From the streets of Paris, I’m more than just a pastry link. Layers upon layers, I flake at every bite; I may be simple, but I’m quite the delight. What am I?",
        answer: "Pain au chocolat"
    },
    {
        question: "Neither seed nor leaf am I, yet brewed in a pot. Spices or fruit might enhance my lot. Steep me long or short, just know this truth: A sip of me soothes in moments uncouth. What am I?",
        answer: "Herbal tea"
    }
];

let currentRiddle = 0;
let points = 0;
let attempts = 0;
let timer;
let timeLeft = 60;  // 60 seconds for each question
let maxQuestions = 5;  // Limit to 5 questions



function startGame() {
    showRiddle();
}

function showRiddle() {
    if (attempts >= maxQuestions) {
        endGame();
        return;
    }

    // Show the current riddle and reset the timer
    document.getElementById("riddle").innerText = riddles[currentRiddle].question;
    document.getElementById("result").innerText = "";
    document.getElementById("answer-input").value = "";

    timeLeft = 60;  // Reset the timer to 60 seconds
    document.getElementById("timer").innerText = `Time Left: ${timeLeft}s`;

    clearInterval(timer);
    timer = setInterval(updateTimer, 1000);  // Start the timer
}

function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        document.getElementById("timer").innerText = `Time Left: ${timeLeft}s`;
    } else {
        clearInterval(timer);
        document.getElementById("result").innerText = "Time's up! Moving to the next riddle...";
        attempts++;
        currentRiddle++;
        setTimeout(showRiddle, 2000);
    }
}

function checkAnswer() {
    clearInterval(timer);  // Stop the timer when the answer is submitted

    const userAnswer = document.getElementById("answer-input").value.trim().toLowerCase();
    const correctAnswer = riddles[currentRiddle].answer.toLowerCase();

    if (userAnswer === correctAnswer) {
        points += 10;  // Award 10 points for each correct answer
        document.getElementById("points").innerText = `Points: ${points}`;
        document.getElementById("result").innerText = "Correct! Moving to the next riddle...";
    } else {
        document.getElementById("result").innerText = "Incorrect! Moving to the next riddle...";
    }

    attempts++;
    currentRiddle++;

    if (attempts >= maxQuestions) {
        setTimeout(endGame, 2000);
    } else {
        setTimeout(showRiddle, 2000);
    }
}

function endGame() {
    clearInterval(timer);
    document.getElementById("riddle").innerText = "Game Over! You've completed the BrewSip Riddle Hunt!";
    document.getElementById("answer-input").style.display = "none";
    document.querySelector("button").style.display = "none";
    document.getElementById("result").innerText = `Final Points: ${points}`;

    // Save the current date to localStorage to prevent reattempts today
    const today = new Date().toLocaleDateString();
    localStorage.setItem('lastPlayedDate', today);
}
let totalQuestions = 5; // Total number of questions
let questionsAnswered = 0; // Counter for questions answered
let score = 0;
let currentQuestionIndex = 0;
let timerInterval;


function loadQuestion() {
    // Reset input field and result message
    document.getElementById("answer-input").value = "";
    document.getElementById("result").innerText = "";

    // Load the next riddle question
    if (currentQuestionIndex < totalQuestions) {
        document.getElementById("riddle").innerText = riddles[currentQuestionIndex].question;
        document.getElementById("questions-answered").innerText = questionsAnswered; // Display answered questions
        startTimer();
    } else {
        endGame(); // End the game when all questions are answered
    }
}

function checkAnswer() {
    const answerInput = document.getElementById("answer-input").value;

    // Check if the answer is correct
    if (answerInput.toLowerCase() === riddles[currentQuestionIndex].answer.toLowerCase()) {
        score += 10; // Increment score for correct answer
        document.getElementById("result").innerText = "Correct!";
    } else {
        document.getElementById("result").innerText = "Wrong answer!";
    }

    // Update the scoreboard and question count
    document.getElementById("points").innerText = `Points: ${score}`;
    questionsAnswered++; // Increment questions answered
    document.getElementById("questions-answered").innerText = questionsAnswered;

    // Move to the next question after a brief delay (e.g., 1 second)
    setTimeout(() => {
        currentQuestionIndex++;
        loadQuestion(); // Load the next question
    }, 1000);
}

function startTimer() {
    // Reset timer for each question
    timeLeft = 60;
    const timerDisplay = document.getElementById("timer");

    // Clear any previous intervals
    if (timerInterval) {
        clearInterval(timerInterval);
    }

    timerInterval = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert("Time's up! Moving to the next question."); // Notify the player when time is up
            checkAnswer(); // Move to next question automatically when time runs out
        } else {
            timerDisplay.innerText = `Time Left: ${timeLeft}s`;
            timeLeft--;
        }
    }, 1000);
}

function endGame() {
    clearInterval(timerInterval); // Clear the timer when the game ends
    alert(`Game Over! You answered all questions. Your final score is ${score}.`);

    // Optionally, disable further interaction with the input
    document.getElementById("answer-input").disabled = true;
    document.getElementById("timer").innerText = ""; // Clear the timer display
}

// Start the game by loading the first question
loadQuestion();



// Load and start the game
function loadQuestion() {
    document.getElementById("answer-input").value = "";
    document.getElementById("result").innerText = "";

    if (currentQuestionIndex < totalQuestions) {
        document.getElementById("riddle").innerText = riddles[currentQuestionIndex].question;
        document.getElementById("questions-answered").innerText = questionsAnswered;
        startTimer();
    } else {
        endGame(); // End the game when all questions are answered
    }
}

// Check the answer and move to the next question
function checkAnswer() {
    const answerInput = document.getElementById("answer-input").value;

    if (answerInput.toLowerCase() === riddles[currentQuestionIndex].answer.toLowerCase()) {
        score += 10;
        document.getElementById("result").innerText = "Correct!";
    } else {
        document.getElementById("result").innerText = "Wrong answer!";
    }

    document.getElementById("points").innerText = `Points: ${score}`;
    questionsAnswered++;
    document.getElementById("questions-answered").innerText = questionsAnswered;

    setTimeout(() => {
        currentQuestionIndex++;
        loadQuestion();
    }, 1000);
}

// Start the timer for each question
function startTimer() {
    timeLeft = 60;
    const timerDisplay = document.getElementById("timer");

    if (timerInterval) {
        clearInterval(timerInterval);
    }

    timerInterval = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert("Time's up! Moving to the next question.");
            checkAnswer();
        } else {
            timerDisplay.innerText = `Time Left: ${timeLeft}s`;
            timeLeft--;
        }
    }, 1000);
}

// End the game and redirect to results page
function endGame() {
    clearInterval(timerInterval); // Stop the timer
    localStorage.setItem("finalScore", score); // Store the final score in localStorage

    // Save the date to prevent replay until next day
    const now = new Date();
    localStorage.setItem("lastPlayed", now.getTime()); // Save timestamp of when the game ended

    // Redirect to the results page
    window.location.href = "results.html";
}


// Start the game
loadQuestion();
