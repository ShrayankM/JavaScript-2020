//TODO DOM Objects

const btns = document.querySelectorAll('.btn');
const N = btns.length;

let vacant = 9;

const message = document.querySelector('h2');
const resetBtn = document.querySelector('.reset');

const selected = new Array(9);
const matrix = new Array(
    new Array(3),
    new Array(3),
    new Array(3)
);

for (let i = 0; i < selected.length; i++) selected[i] = false;

let chance = 'X';
let flag = true;

function change() {
    chance = (chance == 'X') ? 'O' : 'X';
}

function checkHorizontal() {
    for (let i = 0; i < 3; i++) {
        if (matrix[i][0] == chance && matrix[i][1] == chance && matrix[i][2] == chance) 
            return true;
    }
    return false;
}

function checkVertical() {
    for (let i = 0; i < 3; i++) {
        if (matrix[0][i] == chance && matrix[1][i] == chance && matrix[2][i] == chance) 
            return true;
    }
    return false;
}

function checkStraight() {
    if (matrix[0][0] == chance && matrix[1][1] == chance && matrix[2][2] == chance)
        return true;
    return false;
}

function checkReverse() {
    if (matrix[0][2] == chance && matrix[1][1] == chance && matrix[2][0] == chance)
        return true;
    return false;
}

function checkWin() {
    const checkH = checkHorizontal();
    const checkV = checkVertical();
    const checkS = checkStraight();
    const checkR = checkReverse();
    if (checkH || checkV || checkR || checkS)
        return true;
    return false;
}

function displayMessage() {
    message.classList.toggle('hidden');
    message.classList.toggle('reset-block');

    resetBtn.classList.toggle('hidden');
    resetBtn.classList.toggle('reset-block');
}

for (let i = 0; i < N; i++) {
    btns[i].addEventListener('click', function() {
        if (flag) {
            if (!selected[i]) {
                btns[i].textContent = (chance == 'X') ? document.querySelector('.times').textContent : 'O';
                selected[i] = true;

                let [row, col] = btns[i].value.split('-');
                row = Number(row); col = Number(col);

                console.log(row, col);

                matrix[row][col] = chance;
                vacant--;
    
                if (checkWin()) {
                    flag = false;
                    const winner = (chance == 'X') ? 'Player 1' : 'Player 2';
                    message.textContent += `${winner} Wins.`;

                    displayMessage();

                    for (let i = 0; i < 3; i++) {
                        for (let j = 0; j < 3; j++) {
                            document.querySelector(`#R${i}C${j}`).classList.toggle('newBtn');
                        }
                    }
                }
                
                if (flag && vacant == 0) {
                    message.textContent += `Tie`;
                    flag = false;

                    displayMessage();
                }
                change();
            }
        }
    });
}


resetBtn.addEventListener('click', function() {
    for (let i = 0; i < selected.length; i++) selected[i] = false;

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            matrix[i][j] = "";
            document.querySelector(`#R${i}C${j}`).textContent = "";
        }
    }

    message.textContent = "";

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            document.querySelector(`#R${i}C${j}`).classList.toggle('newBtn');
        }
    }
    
    vacant = 9;
    chance = 'X';
    displayMessage();
    
    flag = true;
})