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

/*----- event listeners -----*/
playAgainEl.addEventListener('click', init);
buttonEls.addEventListener('click', init);
guessEl.addEventListener('click', init);

/*----- functions -----*/
init();

function init() {
    square = ['', '', '', ''];
    turn = 'Player1';
    winner = false;
    render();
}

function render() {
    updateSquare();
    updateMessage();
};


