/*----- constants -----*/

const winningCharacters = ['Mulan', 'Tiana', 'Genie', 'Simba']

/*----- state variables -----*/

let winner;
let turn;
let player;
let square;

/*----- cached elements  -----*/
const messageEl = document.querySelector('#message');
const playAgainEl = document.querySelector('#play-again');
const buttonEls = document.querySelectorAll('.btn-letter > div')


/*----- event listeners -----*/
playAgainEl.addEventListener('click', init);


/*----- functions -----*/
init();

function init() {
    square = ['', '', '', ''];
    turn = '';
    winner = false;
    tie = false;
    render();
}

function render() {
    renderSquare();
    renderMessages();
};


