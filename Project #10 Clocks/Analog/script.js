'use strict';

const dayMap = new Map([
    ['0', 'Sunday'],
    ['1', 'Monday'],
    ['2', 'Tuesday'],
    ['3', 'Wednesday'],
    ['4', 'Thursday'],
    ['5', 'Friday'],
    ['6', 'Saturday']
]);

const monthMap = new Map([
    ['0', 'January'],
    ['1', 'February'],
    ['2', 'March'],
    ['3', 'April'],
    ['4', 'May'],
    ['5', 'June'],
    ['6', 'July'],
    ['7', 'August'],
    ['8', 'September'],
    ['9', 'October'],
    ['10', 'November'],
    ['11', 'December']
])

const timeCycle = document.querySelector('.time__cycle');
const faceSeconds = document.querySelector('.face__hands--seconds');
const faceMinutes = document.querySelector('.face__hands--minutes');
const faceHours = document.querySelector('.face__hands--hours'); 

let initFlag = true;
let secsDeg = 0;

setInterval(function() {
    const date = new Date();

    let hrs = date.getHours();
    let mins = date.getMinutes();
    let secs = date.getSeconds();

    if (initFlag) {
        initFlag = false;
        secsDeg = 6 * secs;
    }

    let day = date.getDay();
    day = dayMap.get(String(day));
    day = day.slice(0, 3);

    let month = date.getMonth();
    month = monthMap.get(String(month));
    month = month.slice(0, 3);

    timeCycle.textContent = `${day}, ${date.getDate()} - ${month}`;

    faceSeconds.style.setProperty('transform', `translate(-50%, -100%) rotate(${secsDeg}deg)`);
    faceMinutes.style.setProperty('transform', `translate(-50%, -100%) rotate(${6*mins}deg)`);
    faceHours.style.setProperty('transform', `translate(-50%, -100%) rotate(${12*hrs}deg)`);
    // console.log(6*secs);
    secsDeg += 6;

}, 1000);