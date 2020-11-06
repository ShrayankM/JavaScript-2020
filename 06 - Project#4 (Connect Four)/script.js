let posFill = [4, 4, 4, 4, 4, 4]; // * Current Fill Position in Cols
let matrix  = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0]
];

// TODO Object Elements
const firstRow = document.querySelectorAll('.row-0');
// const playerOne = document.querySelector('.player-one');
// const playerTwo = document.querySelector('.player-two');

// * GLOBAL ELEMENTS
const N = firstRow.length;
const R = 5, C = 6;
let activePlayer = 'one';
let flag = true;

function getActiveColor() {
    return activePlayer === 'one' ? 'rgb(219, 17, 17)' : 'rgb(4, 15, 219)';
}

function changeActivePlayer() {
    document.querySelector(`.player-${activePlayer}`).classList.remove(`player-active-${activePlayer}`);
    activePlayer = activePlayer === 'one' ? 'two' : 'one';
    document.querySelector(`.player-${activePlayer}`).classList.add(`player-active-${activePlayer}`);
}

function checkROW(k) {
    for (let i = 0; i < R; i++) {
        for (let j = 0; j <= C - 4; j++) {
            if (matrix[i][j] == k && matrix[i][j + 1] == k && matrix[i][j + 2] == k && matrix[i][j + 3] == k)
                return true;
        }
    }
    return false;
}

function checkCOL(k) {
    for (let i = 0; i < C; i++) {
        for (let j = 0; j <= R - 4; j++) {
            if (matrix[j][i] == k && matrix[j + 1][i] == k && matrix[j + 2][i] == k && matrix[j + 3][i] == k)
                return true;
        }
    }
    return false;
}

function checkStraight(k) {
    for (let i = 1; i >= 0; i--) {
        for (let j = 0; j <= C - 4; j++) {
            if (matrix[i][j] == k && matrix[i + 1][j + 1] == k && matrix[i + 2][j + 2] == k && matrix[i + 3][j + 3] == k)
                return true;
        }
    }
    return false;
}

function checkReverse(k) {
    for (let i = 1; i >= 0; i--) {
        for (let j = C - 1; j > C - 4; j--) {
            if (matrix[i][j] == k && matrix[i + 1][j - 1] == k && matrix[i + 2][j - 2] == k && matrix[i + 3][j - 3] == k)
                return true;
        }
    }
    return false;
}

function checkStatus() {
    let toCheck = activePlayer === 'one' ? 1 : 2;

    let rowsCheck = checkROW(toCheck);
    let colsCheck = checkCOL(toCheck);
    let dstraightCheck = checkStraight(toCheck);
    let dreverseCheck  = checkReverse(toCheck);

    if (rowsCheck || colsCheck || dstraightCheck || dreverseCheck) {
        flag = false; 
    }
}

for (let i = 0; i < N; i++) {
    firstRow[i].addEventListener('click', function() {

        if (flag) {
            const col = String(i);
            const row = String(posFill[i]--);

            console.log(row + " " + col);

            if (row >= 0 && col >= 0) {
                matrix[row][col] = activePlayer === 'one' ? 1 : 2;
                document.querySelector(`#R${row}C${col}`).style.backgroundColor = getActiveColor();
            }
            
            checkStatus();

            if (flag)
                changeActivePlayer();
        }

        if (!flag)
            console.log("WON Player " + activePlayer);
    });
}