
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
    if (p === 'playerOne') {
        document.querySelector('.playerOne').classList.remove('player-active');
        document.querySelector('.playerTwo').classList.add('player-active');
        pOneCurrent.textContent = String(0);
    }
    else {
        document.querySelector('.playerTwo').classList.remove('player-active');
        document.querySelector('.playerOne').classList.add('player-active');
        pTwoCurrent.textContent = String(0);
    }
}

function updateScore(playerActive) {
    if (playerActive === 'playerOne') {
        pOneScore.textContent = String(Number(pOneScore.textContent) + Number(pOneCurrent.textContent));
        if (checkScore(1)) flag = false;
        pOneCurrent.textContent = String(0);
    }
    else {
        pTwoScore.textContent = String(Number(pTwoScore.textContent) + Number(pTwoCurrent.textContent));
        if (checkScore(2)) flag = false;
        pTwoCurrent.textContent = String(0);
    }
}

function checkScore(n) {
    if (n === 1) {
        let score = Number(pOneScore.textContent);
        if (score >= winScore) {
            document.querySelector('.playerOne').classList.add('win');
            // document.querySelector('#player-one').style.color = "white";
            playerWon = 1;
            return true;
        }
        return false;
    }
    else {
        let score = Number(pTwoScore.textContent);
        if (score >= winScore) {
            document.querySelector('.playerTwo').classList.add('win');
            // document.querySelector('#player-two').style.color = "white";
            playerWon = 2;
            return true;
        }
        return false;
    }
}

rollBtn.addEventListener(
    'click', function() {
        diceImg.classList.remove('hidden');

        if (flag) {
            const diceValue = generateRandom();
            diceImg.src = getDice(diceValue);

            playerActive = getActivePlayer();

            if (diceValue === 1) {
                // updateScore(playerActive);
                changeActivePlayer();
            }
            else {
                if (playerActive === 'playerOne') {
                    pOneCurrent.textContent = String(Number(pOneCurrent.textContent) + diceValue);
                }
                else {
                    pTwoCurrent.textContent = String(Number(pTwoCurrent.textContent) + diceValue);
                }
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
            if (playerWon === 1) document.querySelector('.playerOne').classList.remove('win');
            else                 document.querySelector('.playerTwo').classList.remove('win');
        }

        let p = getActivePlayer();
        if (p !== 'playerOne') changeActivePlayer();

        pOneScore.textContent = String(0);
        pOneCurrent.textContent = String(0);

        pTwoScore.textContent = String(0);
        pTwoCurrent.textContent = String(0);

        // document.querySelector('playerTwo').style.backgroundColor = "#B66D97";
        // document.querySelector('playerOne').style.backgroundColor = "#DBA4B4";

        flag = true;
        diceImg.classList.add('hidden');
    }
);

