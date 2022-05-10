var userScore = 0;
var timeLeft = 10;
var timer;
var question = {};

var userInputField = document.getElementById('user-input-field');
var questionDisplay = document.getElementById('question-display');
var userScoreDisplay = document.querySelector('#user-score span');
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
    console.log('userScore: ', userScore);
    userScoreDisplay.textContent = userScore;
    timeLeft++;
    countdownDisplay.textContent = `${timeLeft}`;
    console.log('timeLeft: ', timeLeft);
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
  // timer = null; // If I set timer to null, and there is a keyup event on input field, the user can keep playing and the countdown goes on. The user is supposed to click restart button or do nothing.
  // alert('game over');
  userInputField.value = '';
};

/* =========== Update countdown ========== */
var updateCountdown = function() {
  timeLeft--;
  //--timeLeft;
  console.log('time left: ', timeLeft);
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
  countdownDisplay.textContent = `${timeLeft} seconds`;
  userInputField.value = '';
};


// Even Listener on input field
userInputField.addEventListener('keyup', function(event) {
  console.log(event.key);
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

/*
Is this a recursive function?
function game:
// Stopping condition:
  if timeLeft === 0:
    display 'game over'
// Function call
  else:
    Generate question
      If userInput === correct answer:
        userScore++
        timeLeft++
*/

/* 
Observations:
On keydown in input field, time is counted down within updateCountdown. When I step into updateCountdown with the debugger, I can see that the time keeps being counted down while nothing is happening with the input. 
Assumption: I need to put the countdown and the handling of the input within one function, or call them from within one function.
*/


/*

on first keydown in input field: 
- start timer
  Every second: update timer

on every keydown on input field:
- check input

*/

/*
Problems: 
- Cannot enter anything else but numbers, but user should be able to enter whatever he likes. 
  Solved.Reason: input field is type="number" - OK
- Countdown starts again after game over, when there is an input in the input field
  Solved. Timer is set to null only on click on 'restart game' button, not after game over.
- Countdown starts by itself after clikcing restart button:
  Input field is in focus. Coountdown starts upon ANY keydown event on input field. Event if I change to another browser window and change back using Alt+Tab
  Solved: Only react to number keys

- Countdown should show 0 BEFORE alert
  Could not solve the problem as long as I was using alert.
  I chose to display 'game over' in place of the math question, once the user loses.

- Countdown should always or never show word 'seconds'.
  Solved: I went for showing 'seconds' before the game, to make it clear to the user. But to then let the countdown run without showing 'seconds'.

- The countdown does not reflect the added time. The current time left just remains there one second longer, but it should actually show the added second. The countdown seems to pause while user enters correct solution. Is the second even added?
  Solved: The second was added, but the display was not updated after adding the second. Added line that updates display.
*/