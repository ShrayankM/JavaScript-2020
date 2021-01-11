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

const dgClock = document.querySelector('.digital__clock');
const dateCont = document.querySelector('.date__container');


setInterval(function () {
    const date = new Date();
    let flag = 0;

    let hrs = `${date.getHours()}`.padStart(2, '0');
    let mins = `${date.getMinutes()}`.padStart(2, '0');
    let secs = `${date.getSeconds()}`.padStart(2, '0');

    if (Number(hrs) > 12) {
        hrs = hrs - 12;
        hrs = `${hrs}`.padStart(2, '0');
        flag = 1;
    }

    let timeStr = `${hrs} : ${mins} : ${secs}`;

    if (flag) {
        timeStr = timeStr + " pm";
    }
    else {
        timeStr = timeStr + " am";
    }

    dgClock.textContent = timeStr;
}, 1000);


setInterval(function() {
    const date = new Intl.DateTimeFormat('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }).format(new Date());
    

    let day = new Date();
    day = String(day.getDay());

    dateCont.textContent = `${dayMap.get(day)}, ${date}`;

}, 1000);



