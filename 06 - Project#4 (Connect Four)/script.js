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
const resetBtn = document.querySelector('.reset');
// const playerOne = document.querySelector('.player-one');
// const playerTwo = document.querySelector('.player-two');

// * GLOBAL ELEMENTS
const N = firstRow.length;
const R = 5, C = 6;
let activePlayer = 'one';
let flag = true;
let flagTie = false;

function getActiveColor() {
    return activePlayer === 'one' ? 'rgb(219, 17, 17)' : 'rgb(4, 15, 219)';
    // return activePlayer === 'one' ? 'red' : 'blue';
}

function getActivePlayer() {
    return activePlayer;
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

function checkEmpty() {
    let cnt = 0;
    for (let i = 0; i < R; i++) {
        for (let j = 0; j < C; j++) {
            if (matrix[i][j] == 0) cnt++;
        }
    }

    flag = cnt == 0 ? false : true;
    flagTie = flag == false ? true : false;

    if (cnt == 0) return true;
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
                // document.querySelector(`#R${row}C${col}`).classList.add(`${getActiveColor()}-color`);
            }
            
            checkStatus();
            if (flag && checkEmpty()) {
                let active = getActivePlayer();
                active = active == 'one' ? 'two' : 'one';

                document.querySelector(`.player-${active}`).classList.add(`player-active-${active}`);
            }

            if (flag)
                changeActivePlayer();
        }

        if (!flag && !flagTie)
            console.log("WON Player " + activePlayer);
    });
}

resetBtn.addEventListener('click', function() {
    for (let i = 0; i < posFill.length; i++) posFill[i] = 4;

    for (let i = 0; i < R; i++)
        for (let j = 0; j < C; j++)
            matrix[i][j] = 0;
    
    for (let i = 0; i < R; i++) {
        for (let j = 0; j < C; j++) {
            document.querySelector(`#R${i}C${j}`).style.removeProperty('background-color');
        }
    }

    if (flagTie) {
        document.querySelector('.player-two').classList.remove('player-active-two');
    }
    else {
        let active = getActivePlayer();
        console.log(active);
        if (active === 'two') {
            changeActivePlayer();
        }
    }

    activePlayer = 'one';
    
    flag = true;
    flagTie = false;
});