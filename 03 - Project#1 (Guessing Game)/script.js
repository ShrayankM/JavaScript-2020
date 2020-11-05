'use strict';

// * Number to be guesssed
function generateRandom() {
    return Math.round(Math.random() * 20 + 1);
}

let myNumber = generateRandom();

// TODO DOM Elements
const guessBtn = document.querySelector('.guess');
const message  = document.querySelector('.message');
const number = document.querySelector('.number');
const score = document.querySelector('.score');
const highscore = document.querySelector('.highscore');
const body = document.querySelector('body');

// * Game Score
let scoreValue = Number(score.textContent);
let highScore = 0;

// highscore.textContent = String(highScore);

document.querySelector('.check').addEventListener(
    'click', function() {
        const guess = Number(guessBtn.value);
        // console.log(guess);

        if (scoreValue) {
            if (!guess) 
            message.textContent = "⛔️ Either 0 or No Number";
            else if (guess > myNumber) {
                message.textContent = "📈️ Too High";
                scoreValue--;
            }
            else if (guess < myNumber) {
                message.textContent = "📉️ Too Low";
                scoreValue--;
            }
            else {
                message.textContent = "😎️ Correct Number !!!";
                number.textContent = String(myNumber);

                body.style.backgroundColor = "#60b347";

                number.style.width = '30rem';

                if (scoreValue > highScore) {
                    highScore = scoreValue;
                    highscore.textContent = String(highScore);
                }
            }

            if (scoreValue === 0) 
                    message.textContent = "⛔️ You Lost !!!";

            score.textContent = scoreValue;
        }
    }
);


document.querySelector('.again').addEventListener(
    'click', function() {
        score.textContent = '20';
        body.style.backgroundColor = '#222';
        message.textContent = "Start guessing...";
        guessBtn.value = "";
        number.style.width = '15rem';
        number.textContent = '?';

        scoreValue = Number(score.textContent);
        myNumber = generateRandom();

    }
);
