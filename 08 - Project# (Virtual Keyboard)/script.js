//* Global Variables
let shiftFlag = false;
const tabLower = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'];
const tabUpper = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '|'];

const capsLower = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'"];
const capsUpper = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"'];

const shiftLower = ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/'];
const shiftUpper = ['Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?'];

const numberLower = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='];
const numberUpper = ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+'];

// TODO Objects
const text = document.querySelector('.text-area');
const tab = document.querySelector('.tab-section').querySelectorAll('.num');
const num = document.querySelector('.numbers-section').querySelectorAll('.num');
const cap = document.querySelector('.caps-section').querySelectorAll('.num');
const shift = document.querySelector('.shift-section').querySelectorAll('.num');

setContent();

document.addEventListener('keydown', function(e) {
    if (e.key == "Shift") setContent();
    if (e.key != "Shift") {
        text.textContent += e.key;
    }
})

document.addEventListener('keyup', function(e) {
    if (e.key == "Shift") setContent();
})

function setContent() {
    // console.log('setting');
    //* Tab Section
    for (let i = 1; i < tab.length; i++) {
        tab[i].textContent = shiftFlag ? tabUpper[i - 1] : tabLower[i - 1];
    }

    //* Number Section
    for (let i = 0; i < num.length - 1; i++) {
        num[i].textContent = shiftFlag ? numberUpper[i] : numberLower[i];
    }

    //* Caps Section
    for (let i = 1; i < cap.length - 1; i++) {
        cap[i].textContent = shiftFlag ? capsUpper[i - 1] : capsLower[i - 1];
    }

    //* shift Section
    for (let i = 1; i < shift.length - 1; i++) {
        shift[i].textContent = shiftFlag ? shiftUpper[i - 1] : shiftLower[i - 1];
    }
    shiftFlag = shiftFlag ? false : true;
}