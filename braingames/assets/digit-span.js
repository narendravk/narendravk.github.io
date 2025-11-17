let userTurn = false;
let sequencingOn = false;
let currentSpan = 3;
let maxSpan = 0;
let currentSequence = [];
const startButton = document.getElementById('startButton');
const scoreDisplay = document.getElementById('scoreDisplay');
const statusDisplay = document.getElementById('statusDisplay');
const userInput = document.getElementById('userInput');
const digitDisplay = document.getElementById('digitDisplay');
const keySound = new Audio('assets/keypress_sound.mp3'); // Optional sound effect

//Set Initial Values
scoreDisplay.textContent = `Current Span: ${currentSpan} | Max Span: ${maxSpan}`;
statusDisplay.textContent = 'Press Start to Begin';
userInput.disabled = true;
digitDisplay.textContent = 'Watch The Sequence..';


//start game on button click
startButton.addEventListener('click', () => {
    if (sequencingOn) return;
    if (!userTurn) {
        if (statusDisplay.classList.contains('alert-danger')) {
            statusDisplay.classList.remove('alert-danger');
            statusDisplay.classList.add('alert-info');
        };
        statusDisplay.classList.add('alert-info');
        currentSequence = generateSequence(currentSpan);
        displaySequence(currentSequence);
    }
});

//handle user input
userInput.addEventListener('input', (e) => {
    keySound.play();
    if (!userTurn) return;
    const value = e.target.value;
    let index = value.length - 1;
    const lastChar = value[index]; 
    if(lastChar !== currentSequence[index]) {
        endGame();
        return;
    } else if (value.length === currentSequence.length) {
        nextRound();
   }
});

function endGame() {
    statusDisplay.classList.remove('alert-info');
    statusDisplay.classList.add('alert-danger');
    userInput.disabled = true;
    userTurn = false;
    statusDisplay.textContent = `Game Over! Your final score is ${maxSpan}. Click Start to Play Again.`;
}

function nextRound(){
        userTurn = false;
        userInput.disabled = true;
        statusDisplay.textContent = 'Correct! Click on Next Round to Continue..';
        statusDisplay.classList.add('alert-success');
        startButton.textContent = 'Next Round';
        startButton.disabled = false;
        if (currentSpan > maxSpan) {
            maxSpan = currentSpan;
        }
        scoreDisplay.textContent = `Current Span:${currentSpan} | Max Span: ${maxSpan}`;
        currentSpan++;
}
//generate random sequence of numbers
function generateSequence(span) {
    const sequence = [];
    for(i=0; i<span; i++){
        const randomDigit = Math.floor(Math.random() * 10);
        sequence.push(randomDigit.toString());
    };
    return sequence;
}

//display sequence to user
function displaySequence(sequence) {
    startButton.disabled = true;
    statusDisplay.textContent = 'Watch the Sequence!';
    sequencingOn = true;
    userInput.disabled = true; 
    userInput.value = '';
    digitDisplay.textContent = sequence[0];
    new Audio(`assets/${sequence[0]}.mp3`).play();
    let currentPosition = 1;
    let displayInterval = setInterval(() => {
        if(currentPosition >= sequence.length) {
            clearInterval(displayInterval);
            digitDisplay.textContent = '';
            sequencingOn = false;
            userTurn = true;
            userInput.disabled = false;
            userInput.focus();
            statusDisplay.textContent = 'Your Turn! Enter the Sequence.';
            return;
        } else{
            
            setTimeout(() => {
            const sound = new Audio(`assets/${sequence[currentPosition]}.mp3`);
            sound.autplay = true;
            sound.play();
            digitDisplay.textContent = sequence[currentPosition];
            currentPosition++;
            }, 500);
            digitDisplay.textContent = '';
        }
    },2000);
};
