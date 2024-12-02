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

const messageEl = document.querySelectorById('#message');
const playAgainEl = document.querySelector('#play-again');
const buttonEls = document.querySelectorAll('.btn-letter > div');
const guessEl = document.querySelectorById('#guess-btn');
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
    square = array(currentWord.lenght).fill('_');
    turn = 'Player1';
    winner = false;
    wrong = 0;
    right = 0;
    maxWrongGuesses = 6;
    render();
}

function render() {
    updateSquare();
    updateMessage();
    updateSpacemanImg();
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
    letter = event.target.textContent;
    render();
}

function handleGuess() {
    const rightGuess = 'Simba';
    const playerGuess = square.join('');
    if (playerGuess === rightGuess) {
        return;
    } else if (playerGuess === wrongGuess) {
        return;
    }
}

function updateSpacemanImg() {
    spacemanImg.src = `images/${wrong}.png`;
}