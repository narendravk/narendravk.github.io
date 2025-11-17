// Global variables for the test state
const board = document.getElementById('corsi-board');
const blocks = document.querySelectorAll('.block');
const startButton = document.getElementById('startButton');
const statusDisplay = document.getElementById('statusDisplay');
const scoreDisplay = document.getElementById('scoreDisplay');
const blockIDs = Array.from(blocks).map(block => block.id);
const mySound = new Audio('assets/keypress_sound.mp3'); // Optional sound effect

let currentSpan = 3; // Start with a span of 3
let currentSequence = [];
let userSequence = [];
let isPlayingSequence = false;
let isUserTurn = false;
let maxSpan = 0;

// --- Helper Functions ---

/** Generates a random sequence of unique block IDs based on the currentSpan. */
function generateSequence() {
    // Shuffle the blockIDs array
    const shuffled = blockIDs.sort(() => 0.5 - Math.random());
    // Take the first 'currentSpan' elements
    return shuffled.slice(0, currentSpan);
}

/** Lights up a single block. */
function lightUpBlock(blockId) {
    const block = document.getElementById(blockId);
    if (block) {
        mySound.play();
        block.classList.add('active');
        // Add a slight sound effect if possible, or just a delay for effect
        setTimeout(() => {
            block.classList.remove('active');
        }, 1000); // Block stays lit for 0.5 seconds
    }
}

/** Plays the entire sequence. */
function playSequence(sequence) {
    isPlayingSequence = true;
    isUserTurn = false;
    startButton.disabled = true;
    statusDisplay.className = 'alert alert-primary';
    statusDisplay.textContent = `Watch closely! Sequence length: ${sequence.length}`;

    let i = 0;
    const interval = setInterval(() => {
        if (i < sequence.length) {
            lightUpBlock(sequence[i]);
            i++;
        } else {
            clearInterval(interval);
            isPlayingSequence = false;
            startUserTurn();
        }
    }, 1300); // 0.8 seconds between block lights (500ms lit + 300ms delay)
}

/** Initiates the user's turn. */
function startUserTurn() {
    isUserTurn = true;
    userSequence = [];
    statusDisplay.className = 'alert alert-warning';
    statusDisplay.textContent = "Your turn! Tap the blocks in the same order.";
}

/** Checks the user's tap against the current sequence. */
function handleUserTap(blockId) {
    if (!isUserTurn) return;

    // 1. Record the user's tap
    userSequence.push(blockId);
    
    // Visually confirm the tap (a quick light up)
    const block = document.getElementById(blockId);
    if (block) {
        mySound.play()
        block.classList.add('active');
        setTimeout(() => block.classList.remove('active'), 500);
    }

    // 2. Check the tap correctness
    const tapIndex = userSequence.length - 1;
    if (userSequence[tapIndex] !== currentSequence[tapIndex]) {
        board.classList.remove('game-on');
        board.classList.add('game-off');
        // **FAILURE**
        endGame(false);
        return;
    }

    // 3. Check if the sequence is complete
    if (userSequence.length === currentSequence.length) {
        // **SUCCESS**
        endRound(true);
    }
}

/** Handles the end of a round (success or failure). */
function endRound(isSuccess) {
    isUserTurn = false;
    startButton.disabled = false;
    
    if (isSuccess) {
        board.classList.remove('game-on');
        board.classList.add('green-tap');
        // Update scores and prepare for next round
        maxSpan = Math.max(maxSpan, currentSpan);
        currentSpan++;
        scoreDisplay.textContent = `Current Span: ${currentSpan - 1} | Max Span: ${maxSpan}`;
        statusDisplay.className = 'alert alert-success';
        statusDisplay.textContent = `Correct! Now attempting span ${currentSpan}. Click **Next Round** (Start Test) to continue.`;
    } 
    // If it's a success, we let the startTest function handle the next round
    setTimeout(()=>{
        startButton.focus();
    },1000);
}

/** Handles test completion (failure). */
function endGame(isForcedStop) {
    isUserTurn = false;
    startButton.disabled = false;
    startButton.textContent = "Start New Test";

    if (!isForcedStop) {
        statusDisplay.className = 'alert alert-danger';
        statusDisplay.textContent = `Incorrect sequence! Test Over. Your Corsi Span is **${maxSpan}** blocks. Click 'Start New Test' to try again.`;
    } else {
        statusDisplay.className = 'alert alert-info';
        statusDisplay.textContent = `Test stopped. Your final Corsi Span was **${maxSpan}**. Click 'Start New Test' to try again.`;
    }
    
    currentSpan = 3; // Reset for new game
    maxSpan = 0;
    scoreDisplay.textContent = `Current Span: 0 | Max Span: ${maxSpan}`;
    setTimeout(()=>{
        startButton.focus();
    },1000);
}


// --- Main Test Flow ---

/** Starts a new round of the test. */
function startTest() {
    if (isPlayingSequence) return;
    
    // Update button text
    startButton.textContent = "Next Round (or Stop)";
    
    // Generate and play the sequence
    board.classList.add('game-on', 'p-3', 'rounded'); // Highlight board during sequence
    currentSequence = generateSequence();
    playSequence(currentSequence);
}


// --- Event Listeners ---

startButton.addEventListener('click', startTest);

blocks.forEach(block => {
    block.addEventListener('click', () => handleUserTap(block.id));
});

// Initial display setup
scoreDisplay.textContent = `Current Span: 0 | Max Span: ${maxSpan}`;