'use strict';

const modalBtns = document.querySelectorAll('.show-modal');
const N = modalBtns.length;

const overlay = document.querySelector('.overlay');
const windowObject  = document.querySelector('.window');
const closeBtn = document.querySelector('.close');

const removeHidden = function() {
    windowObject.classList.remove('hidden');
    overlay.classList.remove('hidden');
}

const addHidden = function() {
    windowObject.classList.add('hidden');
    overlay.classList.add('hidden');
}

for (let i = 0; i < N; i++) {
    modalBtns[i].addEventListener('click', removeHidden);
}

closeBtn.addEventListener('click', addHidden);

overlay.addEventListener('click', addHidden);

document.addEventListener(
    'keydown', function(e) {
        if (e.key === 'Escape') addHidden();
    }
)

