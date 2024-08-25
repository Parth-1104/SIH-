const questionElement = document.getElementById("question");
const options = Array.from(document.getElementsByClassName("option-btn"));
const resultContainer = document.getElementById("result-container");
const correctCountBtn = document.getElementById("correct-count-btn");
const wrongCountBtn = document.getElementById("wrong-count-btn");
const starsBtn = document.getElementById("stars-btn");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let correctCount = 0;
let wrongCount = 0;
let stars = 0;

// Function to start the quiz
function startQuiz() {
    score = 0;
    correctCount = 0;
    wrongCount = 0;
    stars = 0;
    correctCountBtn.textContent = `Correct Answers: ${correctCount}`;
    wrongCountBtn.textContent = `Wrong Answers: ${wrongCount}`;
    starsBtn.textContent = `Stars: ${stars}`;
    resultContainer.style.display = "none";
    document.getElementById("quiz-container").style.display = "block";
    loadQuestion();
}

// Function to load a new question from the API
function loadQuestion() {
    fetch("https://opentdb.com/api.php?amount=1&type=multiple&category=24") // Modify 'category' to suit your needs
        .then(res => res.json())
        .then(data => {
            const questionData = data.results[0];
            currentQuestion = {
                question: decodeHTML(questionData.question),
                options: shuffleOptions([
                    decodeHTML(questionData.correct_answer),
                    ...questionData.incorrect_answers.map(answer => decodeHTML(answer))
                ]),
                correctAnswer: decodeHTML(questionData.correct_answer)
            };
            displayQuestion();
        });
}

// Function to display the current question and options
function displayQuestion() {
    questionElement.textContent = currentQuestion.question;
    options.forEach((option, index) => {
        option.textContent = currentQuestion.options[index];
        option.classList.remove('correct', 'incorrect');
        option.onclick = () => selectAnswer(index);
    });
    acceptingAnswers = true;
}

// Function to select an answer
function selectAnswer(index) {
    if (!acceptingAnswers) return;
    acceptingAnswers = false;

    const selectedOption = options[index];
    const selectedAnswer = selectedOption.textContent;

    if (selectedAnswer === currentQuestion.correctAnswer) {
        correctCount++;
        selectedOption.classList.add('correct');
    } else {
        wrongCount++;
        selectedOption.classList.add('incorrect');
        options.forEach(option => {
            if (option.textContent === currentQuestion.correctAnswer) {
                option.classList.add('correct');
            }
        });
    }

    correctCountBtn.textContent = `Correct Answers: ${correctCount}`;
    wrongCountBtn.textContent = `Wrong Answers: ${wrongCount}`;

    if (correctCount % 10 === 0 && correctCount !== 0) {
        stars++;
        starsBtn.textContent = `Stars: ${stars}`;
    }

    setTimeout(() => {
        loadQuestion(); // Load the next question after a short delay
    }, 1000);
}

// Utility function to shuffle options
function shuffleOptions(options) {
    for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
    }
    return options;
}

// Utility function to decode HTML entities in the question text
function decodeHTML(html) {
    const text = document.createElement("textarea");
    text.innerHTML = html;
    return text.value;
}

// Function to go to the next question
function goToNextQuestion() {
    loadQuestion();
}

// Start the quiz on page load
startQuiz();
