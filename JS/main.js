/*----- constants -----*/

const disneyCharacters = ['Mulan', 'Tiana', 'Genie', 'Simba']


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
const buttonEls = [...document.querySelectorAll('.btn-letter > div')];
const guessEl = document.querySelector('#guess-btn');
const guessInput = document.getElementById('#guess');
const spacemanImg = document.getElementById('spaceman-img');


/*----- event listeners -----*/

playAgainEl.addEventListener('click', init);
buttonEls.forEach(button => {
    button.addEventListener('click', handleClick)
});
guessEl.addEventListener('click', handleGuess);

/*----- functions -----*/

init();

function init() {
    square = ['', '', '', ''];
    currentWord = disneyCharacters[Math.floor(Math.random() * disneyCharacters.length)].toUpperCase();
    turn = 'Player1';
    winner = false;
    wrong = 0;
    right = 0;
    maxWrongGuesses = 6;
    
    for (let i = 0; i < currentWord.length; i++) {
        square.push('_');
    }
}

function render() {
    updateSquare();
    updateMessage();
    updateSpacemanImg();
    checkGameStatus();
};

function updateSquare() {
    square.forEach((guess, index) => {
        const squareEl = document.querySelector(`#square-${index}`);
        squareEl.textContent = guess;
    });
}

function updateMessage() {
    if (winner === false) {
        messageEl.innerText = `${turn}'s turn`;
    } else if (winner === true) {
        messageEl.innerText = `${turn}'s wins`;
    } else if (wrong >= maxWrongGuesses) {
        messageEl.innerText = `${turn} Better Luck Next Time`;
    }
}

function handleClick(event) {
    console.log(event)
    const letter = event.target.textContent.toUpperCase();
    if (square.includes(letter) || wrong >= maxWrongGuesses || winner) {
        return;
    }
    if (currentWord.includes(letter)) {
        for (let i = 0; i < currentWord.length; i++) {
            if (currentWord[i] === letter) {
                square[1] = letter;
            }
        }
        return right;
    } else {
        return wrong;
    }
}

function handleGuess() {
    const playerGuess = guessInput.ariaValueMax.toLocaleUpperCase();
    if (playerGuess === rightGuess) {
        return;
    } else if (playerGuess === wrongGuess) {
        return;
    }
}

function updateSpacemanImg() {
    spacemanImg.src = `images/${wrong}.png`;
}

function checkGameStatus() {
    if (!square.includes('_')) {
        winner === true;
    }
    if (wrong >= maxWrongGuesses) {
        winner === false;
    }
} 
