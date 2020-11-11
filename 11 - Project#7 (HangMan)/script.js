//TODO DOM Objects
const word = document.querySelector('.word');
const dash = document.querySelector('.dash');
const mean = document.querySelector('.meaning');
const guess = document.querySelector('.guess');
const messageWin = document.querySelector('.messageWin');
const resetBtn = document.querySelector('.reset');
const hintBtn = document.querySelector('.hint');
const hintMessage = document.querySelector('.hint-message');

//TODO ---------------WORDS----------- TODO//

const words = [
    {
        "word": "rocket",
        "category": "space/missiles",
        "hint": "spacex or nasa use them"
    },
    {
        "word": "planets",
        "category": "outer space",
        "hint": "revolve around the sun"
    },
    {
        "word": "flower",
        "category": "nature",
        "hint": "bees are attracted to them"
    },
    {
        "word": "interstellar",
        "category": "Sci-fi Movies",
        "hint": "Nolan Space travel"
    },
];

//TODO ------------------------------- TODO//

// ? ---------- GLOBAL Variables -------- ?//

let alphabets = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's','t', 'u', 'v', 'w', 'x', 'y', 'z'];

const chances = [0, 0, 0, 0, 0, 0];
let chanceIndex = 0;

let flag;

let str = '';

let charPressed = '';

let countStars = 0;

let hintm = '';

//? ------------------------------------- ?//

//* ------------- Functions ------------ *//

function getRandomWord() {
    let r = Math.trunc(Math.random() * 4);
    return [words[r].word, words[r].hint]; 
}

function updateChance() {
    if (chanceIndex > 5) return;
    chances[chanceIndex] = 1;
    document.querySelector(`#B${chanceIndex}`).classList.remove('green');
    document.querySelector(`#B${chanceIndex}`).classList.add('red');
    chanceIndex++;
}

function checkStatus() {
    if (chanceIndex > 5)       messageWin.textContent = "LOST";
    else  if (countStars == 0) messageWin.textContent = "WON";
}

function init() {

    str = '';
    flag = true;
    chanceIndex = 0;

    for (let i = 0; i < 6; i++) chances[i] = 0;

    charPressed = '';
    [str, hintm] = getRandomWord();
    countStars = str.length;

    for (let i = 0; i < str.length; i++) word.textContent += "*" + " "; 
    word.textContent = word.textContent.trim();

    for (let i = 0; i < str.length; i++) dash.textContent += '_' + " ";

    dash.textContent = '_ '.repeat(str.length);

}

function createAlphabets() {
    let alpha = document.querySelector('.alphabets');
    for (let i = 0; i < alphabets.length; i++) {
        let btn = document.createElement('button');
        btn.classList.add('btn-a');
        btn.id = alphabets[i];
        btn.innerHTML = alphabets[i];
        alpha.appendChild(btn);
    }
}

function clickOrPress(charKey, btnsObj) {
    if (flag && !charPressed.includes(charKey)) {
        btnsObj.disabled = true;
        charPressed += charKey;
        
        let wordT = String(word.textContent);
        if (str.includes(charKey)) {
            btnsObj.classList.add('right');
            let temp = '';
            for (let i = 0; i < str.length; i++) {
                if (str[i] == charKey) {
                    countStars--;
                    temp += charKey;
                }
                else 
                    temp += wordT[i * 2];
            }

            word.textContent = '';
            for (let i = 0; i < str.length; i++) {
                word.textContent += temp[i] + ' ';
            }
            word.textContent = word.textContent.trim();

            if (countStars == 0 || chanceIndex > 5) {
                flag = false;
            }
        }
        else {
            btnsObj.classList.add('wrong');
            updateChance();
            if (chanceIndex > 5) flag = false;
        }
    }
}

function addEvents() {
    for (let i = 0; i < btnObjs.length; i++) {
        // * Mouse Over Event
        btnObjs[i].addEventListener('mouseover', function() {
            btnObjs[i].classList.add('on-hover');
        });

        //* Mouse Out Event
        btnObjs[i].addEventListener('mouseout', function() {
            btnObjs[i].classList.remove('on-hover');
        });
    }
}

function reset() {
    str = '';
    hintm = '';
    flag = true;
    chanceIndex = 0;

    for (let i = 0; i < 6; i++) chances[i] = 0;

    charPressed = '';
    [str, hintm] = getRandomWord();
    countStars = str.length;

    word.textContent = '';
    dash.textContent = '';

    for (let i = 0; i < str.length; i++) word.textContent += "*" + " "; 
    word.textContent = word.textContent.trim();

    for (let i = 0; i < str.length; i++) dash.textContent += '_' + " ";

    dash.textContent = '_ '.repeat(str.length);

    for (let i = 0; i < 6; i++) {
        const btn = document.querySelector(`#B${i}`);
        if (btn.classList.contains('red')) {
            btn.classList.remove('red');
            btn.classList.add('green');
        }
    }
    
    for (let i = 0; i < alphabets.length; i++) {
        const btn = document.querySelector(`#${alphabets[i]}`);
        if (btn.classList.contains('right')) {
            btn.classList.remove('right');
        }
        else if (btn.classList.contains('wrong')) {
            btn.classList.remove('wrong');
        }

        if (btn.classList.contains('on-hover')) { 
            btn.classList.remove('on-hover');
            btn.disabled = false;
        }
    }
    messageWin.textContent = '';
    hintMessage.classList.add('hidden');
}

//* ----------------------------------- *//

init();

createAlphabets();
const btnObjs = document.querySelectorAll('.btn-a');

addEvents();

function addEvents() {
    for (let i = 0; i < btnObjs.length; i++) {
        console.log(i);
        btnObjs[i].addEventListener('mouseover', function() {
            btnObjs[i].classList.add('on-hover');
        });
    }
    
    for (let i = 0; i < btnObjs.length; i++) {
        btnObjs[i].addEventListener('mouseout', function() {
            btnObjs[i].classList.remove('on-hover');
        });
    }

    for (let i = 0; i < btnObjs.length; i++) {
        btnObjs[i].addEventListener('click', function() {
            let charKey = btnObjs[i].id;
            clickOrPress(charKey, btnObjs[i]);
            checkStatus();
        });
    }
}

addEvents();


//* Keyboard EventListener
document.addEventListener('keypress', function(char) {
    let btnpressed = document.querySelector(`#${char.key}`);

    clickOrPress(char.key, btnpressed);
    btnpressed.classList.add('on-hover');
    checkStatus();
});

resetBtn.addEventListener('click', function() {
   reset();
})

hintBtn.addEventListener('click', function() {
    hintMessage.textContent += `[${hintm}]`;
    hintMessage.classList.remove('hidden');
})