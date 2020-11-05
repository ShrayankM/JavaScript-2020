
// TODO DOM Objects
const rollBtn = document.querySelector('.btn-roll');
const diceImg = document.querySelector('.dice');
const holdBtn = document.querySelector('.btn-hold');
const newBtn = document.querySelector('.btn-new');

// * Player 1
const pOneScore = document.querySelector('#score-one');
const pOneCurrent = document.querySelector('#current-p-one');

// * Player 2
const pTwoScore = document.querySelector('#score-two');
const pTwoCurrent = document.querySelector('#current-p-two');

// TODO GLOBAL
let playerActive = getActivePlayer();
let flag = true;
const winScore = 20;
let playerWon = 1;

function generateRandom() {
    return Math.trunc(Math.random() * 6 + 1);
}

function getDice(number) {
    return "dice-" + number + ".png";
}

function getActivePlayer() {
    return document.querySelector('.player-active').classList[1];
}

function changeActivePlayer() {
    let p = getActivePlayer();

    document.querySelector('.playerone').classList.toggle('player-active');
    document.querySelector('.playertwo').classList.toggle('player-active');

    if (p === 'playerone') pOneCurrent.textContent = String(0);
    else                   pTwoCurrent.textContent = String(0);
}

function updateScore(playerActive) {
    let p;
    if (playerActive === 'playerone') p = 'one';
    else                              p = 'two';

    const playerScore   = document.querySelector(`#score-${p}`);
    const playerCurrent = document.querySelector(`#current-p-${p}`);

    playerScore.textContent   = Number(playerScore.textContent) + Number(playerCurrent.textContent);
    if (checkScore(p)) flag = false;
    playerCurrent.textContent = 0; 
}

function checkScore(n) {

    let score = Number(document.querySelector(`#score-${n}`).textContent);
    console.log(score);
    if (score >= winScore) {
        document.querySelector(`.player${n}`).classList.add('win');
        playerWon = n === 'one' ? 1 : 2;
        return true;
    }
    return false;
}

rollBtn.addEventListener(
    'click', function() {
        diceImg.classList.remove('hidden');

        if (flag) {
            const diceValue = generateRandom();
            diceImg.src = getDice(diceValue);

            playerActive = getActivePlayer();

            if (diceValue === 1) {
                changeActivePlayer();
            }
            else {
                let p;
                if (playerActive === 'playerone') p = 'one';
                else                              p = 'two';

                let playerScore = document.querySelector(`#current-p-${p}`); 
                playerScore.textContent = Number(playerScore.textContent) + diceValue;
            }
        }
    }
);

holdBtn.addEventListener(
    'click', function() {
        if (flag) {
            updateScore(playerActive);
            changeActivePlayer();
        }
    }
);

newBtn.addEventListener(
    'click', function() {
        if (!flag) {
            if (playerWon === 1) document.querySelector('.playerone').classList.remove('win');
            else                 document.querySelector('.playertwo').classList.remove('win');
        }

        let p = getActivePlayer();
        if (p !== 'playerone') changeActivePlayer();

        pOneScore.textContent = String(0);
        pOneCurrent.textContent = String(0);

        pTwoScore.textContent = String(0);
        pTwoCurrent.textContent = String(0);

        flag = true;
        diceImg.classList.add('hidden');
    }
);

