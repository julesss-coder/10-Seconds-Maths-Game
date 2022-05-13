var userScore = 0;
var timeLeft = 10;
var timer;
var question = {};

var userInputField = document.getElementById('user-input-field');
var questionDisplay = document.getElementById('question-display');
var userScoreDisplay = document.querySelector('#user-score span');
userScoreDisplay.textContent = userScore;
var countdownDisplay = document.querySelector('#countdown-display span');
var restartButton = document.getElementById('restart-game');

/* ========== Generate random number ============== */
var generateNumber = function() {
  return Math.round(Math.random() * 10);
};

/* ========== Generate maths question ============= */

var generateQuestion = function() {
  question = {
    numbers: undefined,
    correctAnswer: undefined
  };
  question.numbers = [generateNumber(), generateNumber()];
  question.correctAnswer = question.numbers[0] + question.numbers[1];
  questionDisplay.textContent = `${question.numbers[0]} + ${question.numbers[1]} = ?`;
  userInputField.focus();
};


/* ========== Check user input against correct result of maths question ============== */
var checkResult = function() {
  if (Number(userInputField.value) === question.correctAnswer) {
    userScore++;
    userScoreDisplay.textContent = userScore;
    timeLeft++;
    countdownDisplay.textContent = `${timeLeft}`;
    userInputField.value = '';
    generateQuestion();
  }
};

/* =========== Start timer ============ */
var startTimer = function() {
  timer = setInterval(updateCountdown, 1000);
};

/* ========== Stop timer =============== */
var stopCounting = function() {
  clearInterval(timer);
  userInputField.value = '';
};

/* =========== Update countdown ========== */
var updateCountdown = function() {
  timeLeft--;
  countdownDisplay.textContent = `${timeLeft}`;

  if (timeLeft <= 0) {
    stopCounting();
    questionDisplay.textContent = 'Game over';
  }
}

/* ============ Restart game on button click ========== */

var restartGame = function() { 
  timer = null;
  generateQuestion();
  timeLeft = 10;
  userScore = 0;
  userScoreDisplay.textContent = userScore;
  countdownDisplay.textContent = `${timeLeft} seconds`;
  userInputField.value = '';
};


// Even Listener on input field
userInputField.addEventListener('keyup', function(event) {
  // if the key pressed is a number key (vs. Tab, Alt, etc.)
  // Otherwise event pressing alt-tab twice starts the countdown
  if (Number(event.key)) {
    // if timer has not been assigned a value
    if (!timer) {
      startTimer();
    }
  }

  checkResult();
});

// Event Listener on restart button
restartButton.addEventListener('click', restartGame);


// Start game
generateQuestion();

