//TODO DOM Objects
const word = document.querySelector('.word');
const dash = document.querySelector('.dash');
const mean = document.querySelector('.meaning');
const guess = document.querySelector('.guess');
const messageWin = document.querySelector('.messageWin');

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

function getRandomWord() {
    let r = Math.trunc(Math.random() * 3) + 1;
    return words[r].word;
}


console.log(words);

const chances = [0, 0, 0, 0, 0, 0];
let chanceIndex = 0;

let flag = true;

function updateChance() {
    if (chanceIndex > 5) return;
    chances[chanceIndex] = 1;
    document.querySelector(`#B${chanceIndex}`).classList.remove('green');
    document.querySelector(`#B${chanceIndex}`).classList.add('red');
    chanceIndex++;
}

const str = getRandomWord();
let countStars = str.length;

function checkStatus() {
    if (chanceIndex > 5)      messageWin.textContent = "LOST";
    else  if (countStars == 0) messageWin.textContent = "WON";
}

// const meaning = "Vessel that has the ability to float on water.";
// mean.textContent += meaning;

for (let i = 0; i < str.length; i++) word.textContent += "*" + " "; 
word.textContent = word.textContent.trim();

for (let i = 0; i < str.length; i++) dash.textContent += '_' + " ";
// word.textContent
dash.textContent = '_ '.repeat(str.length);

// console.log(dash.textContent, dash.textContent.length);


let charPressed = '';



let alphabets = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's','t', 'u', 'v', 'w', 'x', 'y', 'z'];

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




createAlphabets();
const btnObjs = document.querySelectorAll('.btn-a');

console.log(btnObjs.length);

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

            if (flag && !charPressed.includes(charKey)) {
                btnObjs[i].disabled = true;
                charPressed += charKey;
                // guess.textContent += charKey + ', ';
                let wordT = String(word.textContent);
                if (str.includes(charKey)) {
                    btnObjs[i].classList.add('right');
                    let temp = '';
                    for (let i = 0; i < str.length; i++) {
                        // temp += (str[i] == char.key) ? char.key : wordT[i * 2];
        
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
                    btnObjs[i].classList.add('wrong');
                    updateChance();
                    if (chanceIndex > 5) flag = false;
                }
            }
        
            checkStatus();
            
        });
    }

}

addEvents();


//* Keyboard EventListener
document.addEventListener('keypress', function(char) {
    // console.log(char.key);

    let btnpressed = document.querySelector(`#${char.key}`);

    
    if (flag && !charPressed.includes(char.key)) {

        btnpressed.classList.add('on-hover');
        btnpressed.disabled = true;
        charPressed += char.key;
        // guess.textContent += char.key + ', ';
        let wordT = String(word.textContent);
        if (str.includes(char.key)) {

            btnpressed.classList.add('right');
            let temp = '';
            for (let i = 0; i < str.length; i++) {
                // temp += (str[i] == char.key) ? char.key : wordT[i * 2];

                if (str[i] == char.key) {
                    countStars--;
                    temp += char.key;
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
            btnpressed.classList.add('wrong');
            updateChance();
            if (chanceIndex > 5) flag = false;
        }
    }

    checkStatus();
});