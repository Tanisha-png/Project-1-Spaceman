/*----- constants -----*/

const disneyCharacters = ['MULAN', 'TIANA', 'GENIE', 'SIMBA'];


/*----- state variables -----*/

let square;
let winner;
let turn;
let player;
let wrong;
let right;
let maxWrongGuesses = 6;
let currentWord;

/*----- cached elements  -----*/

const messageEl = document.querySelector('#message');
const playAgainEl = document.querySelector('#play-again');
const buttonEls = [...document.querySelectorAll('.btn-letter')];
const guessEl = document.querySelector('#guess-btn');
const guessInput = document.getElementById('guess');
const spacemanImg = document.getElementById('spaceman-img');
const squaresContainer = document.querySelector('.container');
const soundSrc = document.querySelector('sound-src');
const soundEl = document.getElementById('game-sound');

/*----- event listeners -----*/

playAgainEl.addEventListener('click', init);

buttonEls.forEach(button => {
    button.addEventListener('click', handleClick);
});

guessEl.addEventListener('click', handleGuess);

/*----- functions -----*/

init();

function init() {
    square = [];
    currentWord = disneyCharacters[Math.floor(Math.random() * disneyCharacters.length)].toUpperCase();
    winner = false;
    wrong = 0;
    right = 0;
    maxWrongGuesses = 6;
    
    for (let i = 0; i < currentWord.length; i++) {
        square.push('_');
    }
    render();
}

function render() {
    updateSquare();
    // updateMessage();
    updateSpacemanImg();
    checkGameStatus();
};

function updateSquare() {
    square.forEach((guess, index) => {
        console.log(index);
        const squareEl = document.querySelector(`#square-${index}`);
        console.log(squareEl);
        squareEl.textContent = guess;
    });
}

// function updateMessage() {
//     if (winner === false) {
//         messageEl.innerText = 'You Lose!';
//     } else if (winner === true) {
//         messageEl.innerText = 'You win!';
//     } else if (wrong >= maxWrongGuesses) {
//         messageEl.innerText = 'You Lose';
//     }
// }

function handleClick(event) {
    console.log(event)
    const letter = event.target.textContent.toUpperCase();
    if (square.includes(letter) || wrong >= maxWrongGuesses || winner) {
        return;
    }
    if (currentWord.includes(letter)) {
        for (let i = 0; i < currentWord.length; i++) {
            if (currentWord[i] === letter) {
                square[i] = letter;
            }
        }
        right++;
    } else {
        wrong++;
    }
    render();
}   

function handleGuess() {
    const playerGuess = guessInput.value.toLocaleUpperCase();
    guessInput.value = '';
    if (!playerGuess || playerGuess.length !== 1 || square.includes(playerGuess) || wrong >= maxWrongGuesses || winner ) {
        return;
    } 
    if (currentWord.includes(playerGuess)) {
        for (let i = 0; i < currentWord.length; i++) {
            if (currentWord[i] === playerGuess) {
                square[i] = playerGuess;
            }
        }
        right++;
    } else {
        wrong++;
    }
    render();
}

function updateSpacemanImg() {
    spacemanImg.src = `imgs/spaceman-${wrong}.png`;
}

function checkGameStatus() {
    if (!square.includes('_')) {
        winner = true;
        messageEl.innerText = 'You win!';
        soundEl.src = '769801__thelastoneonearth__groovy-winner-end-version.wav';
        soundEl.play();
    } else if (wrong >= maxWrongGuesses) {
        winner = false;
        messageEl.innerText = 'Game Over';
        soundEl.src = '74206__timbre__star-trek-emergency-simulation.wav';
        soundEl.play();
    }
} 

