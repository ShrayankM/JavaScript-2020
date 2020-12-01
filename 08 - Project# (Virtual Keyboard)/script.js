//* Global Variables
let shiftFlag = false;
let capsFlag = true;

const tabLower = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'];
const tabUpper = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '|'];

const capsLower = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'"];
const capsUpper = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"'];

const shiftLower = ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/'];
const shiftUpper = ['Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?'];

const numberLower = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='];
const numberUpper = ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+'];

let textCnt = 0;

// TODO Objects
let text = document.querySelector('.text-area-0');
const tab = document.querySelector('.tab-section').querySelectorAll('.num');
const num = document.querySelector('.numbers-section').querySelectorAll('.num');
const cap = document.querySelector('.caps-section').querySelectorAll('.num');
const shift = document.querySelector('.shift-section').querySelectorAll('.num');
const area = document.querySelector('.area');

// TODO Special Buttons
const capsBtn = document.querySelector('.caps');
const entBtn  = document.querySelector('.enter');
const backBtn = document.querySelector('.backspace');
const spaceBtn = document.querySelector('.spacebar');
const tabBtn = document.querySelector('.tab');
const clearBtn = document.querySelector('.clear');
const shiftBtn = document.querySelector('.shift');

setContent();

document.addEventListener('keydown', function(e) {
    console.log(e.key);
    let currentChar = e.key;
    if (e.key == "Shift") { 
        console.log(`CapsLOCK = ${capsFlag} ShiftLock = ${shiftFlag}`);
        setContent();
        shiftBtn.classList.toggle('shift-active'); 
    }
    else if (e.key == "CapsLock") { 
        console.log(`CapsLOCK = ${capsFlag} ShiftLock = ${shiftFlag}`);
        // console.log('caps-active');
        setCaps();
    }
    else if (e.key == "Enter") {
        setEnter();
        let newArea = document.createElement('p');
        newArea.classList.add(`text-area`);
        newArea.classList.add(`text-area-${++textCnt}`);
        area.appendChild(newArea);
        text = newArea;
    }
    else if (e.key == "Backspace") {
        console.log(textCnt);
        setBackSpace();
        text.textContent = text.textContent.slice(0, text.textContent.length - 1);
        if (document.querySelector(`.text-area-${textCnt}`).textContent == "") {
            if (textCnt > 0) {
                text = document.querySelector(`.text-area-${textCnt - 1}`);
                document.querySelector(`.text-area-${textCnt}`).remove();
                textCnt--;
            }
        }
    }
    else if (e.key == " ") {
        text.innerHTML += '&nbsp';
        spaceBtn.classList.add('space-active');
    }
    else if (e.key == "Tab") {
        setTab();
        text.innerHTML += '&nbsp &nbsp';
        setTab();
    }
    else if (e.key == "Control") {
        setClear();
        text.textContent = "";
        for (let i = 1; i <= textCnt; i++) {
            // document.querySelector(`.text-area-${i}`).textContent = "";
            document.querySelector(`.text-area-${i}`).remove();
        }
        document.querySelector('.text-area-0').textContent = "";
        text = document.querySelector('.text-area-0');
        textCnt = 0;
    }
    else {
        if (capsBtn.classList.contains('caps-active') && shiftBtn.classList.contains('shift-active'))                                 text.textContent += currentChar.toLowerCase();
        else if (capsBtn.classList.contains('caps-active') || shiftBtn.classList.contains('shift-active')) 
        text.textContent += currentChar.toUpperCase();
        else if (!capsBtn.classList.contains('caps-active') && shiftBtn.classList.contains('shift-active'))
        text.textContent += currentChar.toLowerCase();
        else if (!capsBtn.classList.contains('caps-active') && !shiftBtn.classList.contains('shift-active'))
        text.textContent += currentChar;
        let asciiChar = e.key.charCodeAt(0);
        document.querySelector(`._${asciiChar}`).classList.add('num-active');
    }
})

document.addEventListener('keyup', function(e) {
    if (e.key == "Shift") { 
        console.log(`CapsLOCK = ${capsFlag} ShiftLock = ${shiftFlag}`);
        setContent();
        shiftBtn.classList.toggle('shift-active');
    }
    else if (e.key == "Enter") setEnter();
    else if (e.key == "Backspace") setBackSpace();
    else if (e.key == "Control") setClear();
    else if (e.key == " ") {
        spaceBtn.classList.remove('space-active');
    }
    else {
        let asciiChar = e.key.charCodeAt(0);
        document.querySelector(`._${asciiChar}`).classList.remove('num-active');
    }
})

function setClear() {
    clearBtn.classList.toggle('clear-active');
}

function setTab() {
    tabBtn.classList.toggle('tab-active');
}

function setBackSpace() {
    backBtn.classList.toggle('back-active');
}

function setEnter() {
    entBtn.classList.toggle('enter-active');
}

function setCaps() {
    capsBtn.classList.toggle('caps-active');
    // switchUpper();
}

function switchUpper() {
    for (let i = 1; i < tab.length - 3; i++) {
        tab[i].textContent = capsFlag ? tabUpper[i - 1] : tabLower[i - 1];
    }

    for (let i = 1; i < cap.length - 3; i++) {
        cap[i].textContent = capsFlag ? capsUpper[i - 1] : capsLower[i - 1];
    }

    for (let i = 1; i < shift.length - 4; i++) {
        shift[i].textContent = capsFlag ? shiftUpper[i - 1] : shiftLower[i - 1];
    }
    capsFlag = capsFlag ? false : true;
}

function setContent() {
    // console.log('setting');
    //* Tab Section
    for (let i = 1; i < tab.length; i++) {
        tab[i].textContent = shiftFlag ? tabUpper[i - 1] : tabLower[i - 1];

        tab[i].textContent = (shiftFlag && capsFlag) ? tabLower[i - 1] : tabUpper[i - 1]; 
        tab[i].classList.add(`_${tabUpper[i - 1].charCodeAt(0)}`);
        tab[i].classList.add(`_${tabLower[i - 1].charCodeAt(0)}`);
    }

    //* Number Section
    for (let i = 0; i < num.length - 1; i++) {
        num[i].textContent = shiftFlag ? numberUpper[i] : numberLower[i];
    }

    //* Caps Section
    for (let i = 1; i < cap.length - 1; i++) {
        cap[i].textContent = shiftFlag ? capsUpper[i - 1] : capsLower[i - 1];

        cap[i].textContent = (shiftFlag && capsFlag) ? capsLower[i - 1] : capsUpper[i - 1]; 
        cap[i].classList.add(`_${capsUpper[i - 1].charCodeAt(0)}`);
        cap[i].classList.add(`_${capsLower[i - 1].charCodeAt(0)}`);
    }

    //* shift Section
    for (let i = 1; i < shift.length - 1; i++) {
        shift[i].textContent = shiftFlag ? shiftUpper[i - 1] : shiftLower[i - 1];

        shift[i].textContent = (shiftFlag && capsFlag) ? shiftLower[i - 1] : shiftUpper[i - 1]; 
        shift[i].classList.add(`_${shiftUpper[i - 1].charCodeAt(0)}`);
        shift[i].classList.add(`_${shiftLower[i - 1].charCodeAt(0)}`);
    }
    shiftFlag = shiftFlag ? false : true;
}

//* ------------------------------------------------------------------------------------------------------- *//
const numBtns = document.querySelectorAll('.num');

for (let i = 0; i < numBtns.length; i++) {
    numBtns[i].addEventListener('click', function() {
        // console.log(numBtns[i].classList);

        // * Not Special Character
        if (numBtns[i].classList.length > 3) {
            // let u = numBtns[i].classList[2].slice(1);
            // let l = numBtns[i].classList[3].slice(1);

            // let lowerStr = String.fromCharCode(l);
            // let upperStr = String.fromCharCode(u);

            let currentChar = numBtns[i].textContent;

            // console.log(u + " " + l);
            if (capsBtn.classList.contains('caps-active') && shiftBtn.classList.contains('shift-active'))                                 text.textContent += currentChar.toLowerCase();
            else if (capsBtn.classList.contains('caps-active') || shiftBtn.classList.contains('shift-active')) 
            text.textContent += currentChar.toUpperCase();
            else if (!capsBtn.classList.contains('caps-active') && shiftBtn.classList.contains('shift-active'))
            text.textContent += currentChar.toLowerCase();
            else if (!capsBtn.classList.contains('caps-active') && !shiftBtn.classList.contains('shift-active'))
            text.textContent += currentChar.toLowerCase();
        }
        else {
            let type = numBtns[i].classList[1];
            console.log(type);

            if (type == 'shift') {
                setContent();
                shiftBtn.classList.toggle('shift-active'); 
            }
            else if (type == 'caps') {
                setCaps();
            }
            else if (type == 'enter') {
                // setEnter();
                let newArea = document.createElement('p');
                newArea.classList.add(`text-area`);
                newArea.classList.add(`text-area-${++textCnt}`);
                area.appendChild(newArea);
                text = newArea;
            }
            else if (type == 'backspace') {
                console.log(textCnt);
                // setBackSpace();
                text.textContent = text.textContent.slice(0, text.textContent.length - 1);
                if (document.querySelector(`.text-area-${textCnt}`).textContent == "") {
                    if (textCnt > 0) {
                        text = document.querySelector(`.text-area-${textCnt - 1}`);
                        document.querySelector(`.text-area-${textCnt}`).remove();
                        textCnt--;
                    }
                }
            }
            else if (type == 'spacebar') {
                text.innerHTML += '&nbsp';
                // spaceBtn.classList.add('space-active');
            }
            else if (type == 'tab') {
                text.innerHTML += '&nbsp &nbsp';
            }
            else if (type == 'clear') {
                // setClear();
                text.textContent = "";
                for (let i = 1; i <= textCnt; i++) {
                    // document.querySelector(`.text-area-${i}`).textContent = "";
                    document.querySelector(`.text-area-${i}`).remove();
                }
                document.querySelector('.text-area-0').textContent = "";
                text = document.querySelector('.text-area-0');
                textCnt = 0;
            }
        }
    })
}