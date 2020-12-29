'use strict';

const account1 = {
    movements: [300, 400, -200, 2000, -650, -200, 1000, 400, 600, -200, 100],
    owner: "Steven Henry Smith",
    pin: 1111,
    interestRate: 1.1,
    movementsDates: [
		'2019-11-18T21:31:17.178Z',
		'2019-12-23T07:42:02.383Z',
		'2020-01-28T09:15:04.904Z',
		'2020-04-01T10:17:24.185Z',
		'2020-05-08T14:11:59.604Z',
		'2020-05-27T17:01:17.194Z',
		'2020-07-11T23:36:17.929Z',
		'2020-07-12T10:51:36.790Z',
	],
};


const account2 = {
    movements: [500, 4000, -2000, 6000, -50, -2000, 200, 1000, 700, -800],
    owner: "Jack Elizabeth Junior",
    pin: 2222,
    interestRate: 1.2,
    movementsDates: [
		'2019-11-01T13:15:33.035Z',
		'2019-11-30T09:48:16.867Z',
		'2019-12-25T06:04:23.907Z',
		'2020-01-25T14:18:46.235Z',
		'2020-02-05T16:33:06.386Z',
		'2020-04-10T14:43:26.374Z',
		'2020-06-25T18:49:59.371Z',
		'2020-07-26T12:01:20.894Z',
	],
};

const accounts = [account1, account2];
let sortedFlag = false;
let currentUser;

// ******************** DOM Elements ************************* //
//Todo Block Elements
const main = document.querySelector('.main');
const movementsBlock = document.querySelector('.movements');

//Todo Login Elements
const userInput = document.querySelector('.login__input--username');
const userPin   = document.querySelector('.login__input--pin');
const userBtn   = document.querySelector('.login__input--signin');

//Todo Singular Elements
const mainBalance = document.querySelector('.balance__info--value');
const message = document.querySelector('.welcome');
const sortBtn = document.querySelector('.btn--sort');

//TODO Summary Elements
const incomeEle = document.querySelector('.summary__value--in');
const outcomeEle = document.querySelector('.summary__value--out');
const interestEle = document.querySelector('.summary__value--interest');

//Todo Transfer Elements
const transferUsername = document.querySelector('.transfer--username');
const transferAmount = document.querySelector('.transfer--amount');
const transferBtn = document.querySelector('.transfer--btn');

//Todo Request Loan
const requestAmount = document.querySelector('.request--amount');
const requestBtn = document.querySelector('.request--btn');

//Todo Close Account
const closeUsername = document.querySelector('.close--username');
const closePin = document.querySelector('.close--pin');
const closeBtn = document.querySelector('.close--btn');

//Todo Date Elements
const labelDate = document.querySelector('.date');

// ******************** ************ ************************* //

// ******************** Functions ********************** //
const displayMovements = function(movements) {
    movementsBlock.innerHTML = '';

    movements.forEach(function(amount, index) {
        const type = amount > 0 ? 'deposit' : 'withdrawal';

        // console.log(type);
        const html = `
        <div class="movements__row">
            <div class="movements__type movements__type--${type}"> ${index + 1} ${type} </div>
            <div class="movements__value"> ${amount}$ </div>
        </div>
        `;

        movementsBlock.insertAdjacentHTML('afterbegin', html);
    });
}

const calculateBalance = function(account) {
    account.balance = account.movements.reduce((acc, amount) => acc + amount, 0);
    mainBalance.textContent = `${account.balance}$`;
}

const createUserNames = function() {
    accounts.forEach(function(account) {
        account.username = account.owner.toLowerCase().split(' ').map((name) => name[0]).join('');
    })
}

const calculateSummary = function(account) {
    const income = account.movements.filter((amount) => amount > 0).reduce((acc, amount) => acc + amount, 0);
    const out    = account.movements.filter((amount) => amount < 0).reduce((acc, amount) => acc + amount, 0);
    const interest = account.movements.filter((amount) => amount > 0).reduce((acc, amount) => acc + amount * account.interestRate/100, 0);

    // console.log(income, out, interest);
    incomeEle.textContent = `${income}$`;
    outcomeEle.textContent = `${out * -1}$`;
    interestEle.textContent = `${Math.trunc(interest)}$`;
}

const updateUI = function(account) {
    displayMovements(account.movements);

    calculateBalance(account);

    calculateSummary(account);
}

const getTodayDate = function() {
    const date = new Date(Date.now());
    const day = `${date.getDate()}`.padStart(2, 0);
    const month = `${date.getMonth() + 1}`.padStart(2, 0);
    const year = `${date.getFullYear()}`;
    const hrs = `${date.getHours()}`.padStart(2, 0);
    const mins = `${date.getMinutes()}`.padStart(2, 0);

    return [day, month, year, hrs, mins];
}
// ******************** ********* ********************** //


// ******************** Event Handlers ********************** //
userBtn.addEventListener('click', function(event) {
    event.preventDefault();
    // main.style.opacity = 100;

    sortedFlag = false;
    const username = userInput.value;
    const userpin = userPin.value;

    currentUser = accounts.find((acc) => acc.username == username && acc.pin == userpin);

    userInput.value = userPin.value = '';
    userInput.blur();
    userPin.blur();

    const [day, month, year, hrs, mins] = getTodayDate();

    if (currentUser) {
        main.style.opacity = 100;

        message.textContent = `Welcome Back, ${currentUser.owner.split(' ')[0]}`;
        labelDate.textContent = `${day}/${month}/${year}  ${hrs}:${mins}`;
        updateUI(currentUser);
    }
})


sortBtn.addEventListener('click', function(event) {
    event.preventDefault();

    const sortedMovements = currentUser.movements.slice().sort((a, b) => a - b);
    const movs = sortedFlag ? currentUser.movements : sortedMovements;

    sortedFlag = sortedFlag ? false : true;
    displayMovements(movs);
})

transferBtn.addEventListener('click', function(event) {

    event.preventDefault();
    const username = transferUsername.value;
    const amount = Number(transferAmount.value);

    transferUsername.value = transferAmount.value = '';
    transferUsername.blur();
    transferAmount.blur();

    const account = accounts.find((acc) => acc.username == username);
    const [day, month, year, hrs, mins] = getTodayDate();

    if (account && currentUser.username != account.username && amount > 0 && currentUser.balance > amount) {

        account.movements.push(amount);
        currentUser.movements.push(-amount);

        console.log(day, month, year, hrs, mins);
        account.movementsDates.push(new Date(year, month - 1, day).toISOString());
        currentUser.movementsDates.push(new Date(year, month - 1, day).toISOString());
        updateUI(currentUser);

    }
})

requestBtn.addEventListener('click', function(event) {
    event.preventDefault();
    const amount = Number(requestAmount.value);

    requestAmount.value = '';
    requestAmount.blur();

    if (amount && amount > 0) {
        currentUser.movements.push(amount);

        updateUI(currentUser);
    }
})

closeBtn.addEventListener('click', function(event) {

    event.preventDefault();
    const username = closeUsername.value;
    const userpin = closePin.value;

    closeUsername.value = closePin.value = '';
    closeUsername.blur();
    closePin.blur();

    if (currentUser.username == username && currentUser.pin == userpin) {
        const index = accounts.findIndex((acc) => acc.username == currentUser.username);

        console.log(index);
        accounts.splice(index, 1);

        main.style.opacity = 0;

        message.textContent = "Login to get Started";
    }
})
// ******************** ************** ********************** //


// displayMovements(account1.movements);
// calculateBalance(account1);

createUserNames();