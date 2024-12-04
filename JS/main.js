/*----- constants -----*/

const disneyCharacters = [
    {name: 'MULAN', hint: 'Enters the army as a man named Ping'},
    {name: 'TIANA', hint: 'Turns into a frog in New Orleans'},
    {name: 'GENIE', hint: 'Grants Aladdin three wishes'},
    {name: 'SIMBA', hint: 'Friends with Timon and Pumbaa'}
];


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

    buttonEls.forEach(button => {
        button.classList.remove('wrong-letter');
    });

    for (let i = 0; i < currentWord.length; i++) {
        square.push('_');
    }
    messageEl.innerText = '';
    soundEl.src = '';
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
        messageEl.innerText = 'You Rock!!';
    } else {
        wrong++;
        messageEl.innerText = 'Wrong!!';
        event.target.classList.add('wrong-letter');
    }
    render();
}

function handleGuess() {
    const playerGuess = guessInput.value.toUpperCase();
    guessInput.value = '';
    if (!playerGuess || (playerGuess.length !== 1 && playerGuess.length !== currentWord.length) || wrong >= maxWrongGuesses || winner) {
        return;
    }
    if (playerGuess.length === 1) {
        if (square.includes(playerGuess)) {
            return;
        }
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

        const wrongButton = buttonEls.find(button => button.textContent.toUpperCase() === playerGuess);
        if (wrongButton) {
            wrongButton.classList.add('wrong-letter');
        }
    }
    if (playerGuess.length === currentWord.length) {
        if (playerGuess === currentWord) {
            square = currentWord.split('');
            right = currentWord.length;
            winner = true;
        } else {
            wrong++;
        }
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

