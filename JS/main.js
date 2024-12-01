/*----- constants -----*/

const disneyCharacters = ['Mulan', 'Tiana', 'Genie', 'Simba']


/*----- state variables -----*/

let winner;
let turn;
let player;
let wrong;
let right;

/*----- cached elements  -----*/

const messageEl = document.querySelector('#message');
const playAgainEl = document.querySelector('#play-again');
const buttonEls = document.querySelectorAll('.btn-letter > div');
const guessEl = document.querySelector('#guess-btn');
const guessInput = document.getElementById('#guess');
const spacemanImg = document.getElementById('spaceman-img');


/*----- event listeners -----*/

playAgainEl.addEventListener('click', init);
buttonEls.forEach(button => {
    button.addEventListener('click', handleClick)
});
guessEl.addEventListener('click', init);
playAgainEl.addEventListener('click', startGame);

/*----- functions -----*/

init();

function init() {
    square = ['', '', '', '', ''];
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
};

function updateSquare() {
    sqaure.forEach((guess, index) => {
        const squareEl = document.querySelector(square[index]);
        squareEl.textContent = guess;
    });
}

function updateMessage() {
    if (winner === false) {
        messageEl.innerText = `${turn}'s wins`;
    } else {
        messageEl.innerText = `${turn}'s turn`;
    }
}

function handleClick(event) {
    console.log(event)
    const letter = event.target.id
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