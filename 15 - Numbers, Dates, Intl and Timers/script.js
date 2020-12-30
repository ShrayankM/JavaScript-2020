'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
	owner: 'Jonas Schmedtmann',
	movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
	interestRate: 1.2, // %
	pin: 1111,

	movementsDates: [
		'2019-11-18T21:31:17.178Z',
		'2019-12-23T07:42:02.383Z',
		'2020-01-28T09:15:04.904Z',
		'2020-04-01T10:17:24.185Z',
		'2020-05-08T14:11:59.604Z',
		'2020-05-27T17:01:17.194Z',
		'2020-12-25T23:36:17.929Z',
		'2020-12-29T10:51:36.790Z',
	],
	currency: 'INR',
	locale: 'en-GB', // de-DE
};

const account2 = {
	owner: 'Jessica Davis',
	movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
	interestRate: 1.5,
	pin: 2222,

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
	currency: 'USD',
	locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions

const startTimer = function() {
	let time = 10;
	const tick = function() {

		const min = `${Math.floor(time / 60)}`.padStart(2, '0');
		const sec = `${time % 60}`.padStart(2, '0');

		labelTimer.textContent = `${min}:${sec}`;

		if (time === 0) {
			containerApp.style.opacity = 0;
			labelWelcome.textContent = 'Log in to get Started';
		}
		time--;
	};

	tick();
	const timer = setInterval(tick, 1000);
	return timer;
}
const calculateDays = function (date1, date2) {
	// console.log(date1, date2);
	return Math.round((Math.abs(date2 - date1)) / (1000 * 60 * 60 * 24));
}

const formatMovementsDate = function (date) {

	const daysPassed = calculateDays(new Date(date), new Date());
	// console.log(daysPassed);

	if (daysPassed === 0) return 'Today';
	if (daysPassed === 1) return 'Yesterday';
	if (daysPassed <= 7) return `${daysPassed} days ago`;

	return new Intl.DateTimeFormat(currentAccount.locale).format(new Date(date));

	// const now = new Date(date);
	// const day = `${now.getDate()}`.padStart(2, '0');
	// const month = `${now.getMonth() + 1}`.padStart(2, '0');
	// const year = `${now.getFullYear()}`;
	// const hrs = `${now.getHours()}`.padStart(2, '0');
	// const mins = `${now.getMinutes()}`.padStart(2, '0');
	// return `${day}/${month}/${year}`;
}

const formattedCurr = function (acc, value) {
	return new Intl.NumberFormat(acc.locale, {
		style: 'currency',
		currency: acc.currency,
	}).format(value);
}

// const getCurrencyOptions = function(acc) {
// 	const options = {
// 		style: 'currency',
// 		currency : acc.currency,
// 	}
// 	return options;
// }

const intlDates = function (date, locale) {
	const options = {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		weekday: 'long',
		hour: 'numeric',
		minute: 'numeric'
	}

	return new Intl.DateTimeFormat(locale, options).format(date);
}

const getDate = function (date) {
	const now = new Date(date);
	const day = `${now.getDate()}`.padStart(2, '0');
	const month = `${now.getMonth() + 1}`.padStart(2, '0');
	const year = `${now.getFullYear()}`;
	const hrs = `${now.getHours()}`.padStart(2, '0');
	const mins = `${now.getMinutes()}`.padStart(2, '0');
	return [day, month, year, hrs, mins];
}

const displayMovements = function (acc, sort = false) {
	containerMovements.innerHTML = '';

	const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;

	// console.log(acc);
	movs.forEach(function (mov, i) {
		const type = mov > 0 ? 'deposit' : 'withdrawal';

		const displayDate = formatMovementsDate(acc.movementsDates[i]);
		// const curr = new Intl.NumberFormat(acc.locale, getCurrencyOptions(acc)).format((mov).toFixed(2));
		const curr = formattedCurr(acc, (mov).toFixed(2));
		const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1
			} ${type}</div>
			<div class="movements__date">${displayDate}</div>
        <div class="movements__value">${curr}</div>
      </div>
    `;

		containerMovements.insertAdjacentHTML('afterbegin', html);
	});
};

const calcDisplayBalance = function (acc) {
	acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
	// labelBalance.textContent = `${acc.balance.toFixed(2)}€`;
	// labelBalance.textContent = `${new Intl.NumberFormat(acc.locale, getCurrencyOptions(acc)).format(acc.balance.toFixed(2))}`;
	labelBalance.textContent = formattedCurr(acc, acc.balance.toFixed(2));
};

const calcDisplaySummary = function (acc) {
	const incomes = acc.movements
		.filter(mov => mov > 0)
		.reduce((acc, mov) => acc + mov, 0);
	// labelSumIn.textContent = `${incomes.toFixed(2)}€`;
	// labelSumIn.textContent = new Intl.NumberFormat(acc.locale, getCurrencyOptions(acc)).format(incomes.toFixed(2));
	labelSumIn.textContent = formattedCurr(acc, incomes.toFixed(2));

	const out = acc.movements
		.filter(mov => mov < 0)
		.reduce((acc, mov) => acc + mov, 0);
	// labelSumOut.textContent = `${Math.abs(out.toFixed(2))}€`;
	// labelSumOut.textContent = new Intl.NumberFormat(acc.locale, getCurrencyOptions(acc)).format(Math.abs(out.toFixed(2)));
	labelSumOut.textContent = formattedCurr(acc, Math.abs(out.toFixed(2)));

	const interest = acc.movements
		.filter(mov => mov > 0)
		.map(deposit => (deposit * acc.interestRate) / 100)
		.filter((int, i, arr) => {
			// console.log(arr);
			return int >= 1;
		})
		.reduce((acc, int) => acc + int, 0);
	// labelSumInterest.textContent = `${interest.toFixed(2)}€`;
	// labelSumInterest.textContent = new Intl.NumberFormat(acc.locale, getCurrencyOptions(acc)).format(interest.toFixed(2));
	labelSumInterest.textContent = formattedCurr(acc, interest.toFixed(2));
};

const createUsernames = function (accs) {
	accs.forEach(function (acc) {
		acc.username = acc.owner
			.toLowerCase()
			.split(' ')
			.map(name => name[0])
			.join('');
	});
};
createUsernames(accounts);

const updateUI = function (acc) {
	// Display movements
	displayMovements(acc);

	// Display balance
	calcDisplayBalance(acc);

	// Display summary
	calcDisplaySummary(acc);
};

///////////////////////////////////////
// Event handlers
let currentAccount, timer;

btnLogin.addEventListener('click', function (e) {
	// Prevent form from submitting
	e.preventDefault();

	currentAccount = accounts.find(
		acc => acc.username === inputLoginUsername.value
	);
	// console.log(currentAccount);
	// const [day, month, year, hrs, mins] = getDate(new Date());

	// const displayDate = intlDates(new Date(), navigator.language);
	// console.log(navigator.language);

	const displayDate = intlDates(new Date(), currentAccount.locale);

	if (currentAccount?.pin === Number(Math.floor(inputLoginPin.value))) {
		// Display UI and message
		labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]
			}`;
		labelDate.textContent = displayDate;
		containerApp.style.opacity = 100;

		// Clear input fields
		inputLoginUsername.value = inputLoginPin.value = '';
		inputLoginPin.blur();

		if (timer) clearInterval(timer);
		timer = startTimer();

		// Update UI
		updateUI(currentAccount);
	}
});

btnTransfer.addEventListener('click', function (e) {
	e.preventDefault();
	const amount = Number(Math.floor(inputTransferAmount.value));
	const receiverAcc = accounts.find(
		acc => acc.username === inputTransferTo.value
	);
	inputTransferAmount.value = inputTransferTo.value = '';

	if (
		amount > 0 &&
		receiverAcc &&
		currentAccount.balance >= amount &&
		receiverAcc?.username !== currentAccount.username
	) {
		// Doing the transfer
		setTimeout(function () {
			currentAccount.movements.push(-amount);
			receiverAcc.movements.push(amount);

			currentAccount.movementsDates.push(new Date().toISOString());
			receiverAcc.movementsDates.push(new Date().toISOString());
			// Update UI
			updateUI(currentAccount);

			if (timer) clearInterval(timer)
			timer = startTimer();
		}, 2500);
	}
});

btnLoan.addEventListener('click', function (e) {
	e.preventDefault();

	const amount = Number(Math.floor(inputLoanAmount.value));

	if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
		// Add movement

		setTimeout(function () {
			currentAccount.movements.push(amount);
			currentAccount.movementsDates.push(new Date().toISOString());

			// Update UI
			updateUI(currentAccount);
			if (timer) clearInterval(timer)
			timer = startTimer();
		}, 2500);
	}
	inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
	e.preventDefault();

	if (
		inputCloseUsername.value === currentAccount.username &&
		Number(inputClosePin.value) === currentAccount.pin
	) {
		const index = accounts.findIndex(
			acc => acc.username === currentAccount.username
		);
		console.log(index);
		// .indexOf(23)

		// Delete account
		accounts.splice(index, 1);

		// Hide UI
		containerApp.style.opacity = 0;
	}

	inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
	e.preventDefault();
	displayMovements(currentAccount, !sorted);
	sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/*
console.log(23 === 23.00000); //? true

//* Base 10 (Decimal) 0 to 9
//* Base 2  (Binary) 0 to 1

console.log(0.1 + 0.2); //? 0.30000000000000004
console.log(0.1 + 0.2 === 0.2) //? false

//* Conversion
console.log(Number('23'));
console.log(+'23');

//* Parsing
console.log(Number.parseInt('30px', 10)); //? 30
console.log(Number.parseInt('px30', 10)); //? NaN

console.log(Number.parseInt('0001001b', 2)); //? 9

console.log(Number.parseInt('  2.5rem'));  //? 2
console.log(Number.parseFloat('   2.5rem')); //? 2.5

console.log(Number.isNaN(20));
console.log(Number.isNaN('20'));
console.log(Number.isNaN(+'20x'));
console.log(Number.isNaN(23/0));

//* Check if value is a number
console.log(Number.isFinite(20));
console.log(Number.isFinite('20'));
console.log(Number.isFinite(+'20x'));
console.log(Number.isFinite(23/0));



console.log(Math.sqrt(25));
console.log(25 ** (1 / 2));
console.log(8 ** (1 / 3));

console.log(Math.max(3, 4, 56, 7, 55, 9, 0, 1, 3));
console.log(Math.min(67, 8, 9, 1, 23, 0));

console.log(Math.PI);


//* Generate Array of Random Numbers
const randomArr = function (min, max, cnt) {
	const arr = [];
	for (let i = 0; i < cnt; i++) {
		arr.push(Math.floor(Math.random() * (max + 1 - min)) + min);
	}
	return arr;
}

console.log(randomArr(10, 100, 30));

//* Round Numbers
console.log(Math.round(23.4));
console.log(Math.round(23.2));

console.log(Math.floor(23.6));
console.log(Math.ceil(23.6));

*

//* Remainder Operator
const isEven = (n) => n % 2 === 0;

console.log(isEven(23));
console.log(isEven(6));

labelBalance.addEventListener('click', function () {
	const movementsArr = document.querySelectorAll('.movements__row');
	movementsArr.forEach(function(row, index) {
		if (index % 2 === 0) {
			row.style.backgroundColor = '#777777';
		}
	})
})



console.log(2 ** 53 - 1);
console.log(Number.MAX_SAFE_INTEGER);



// const now = new Date();
// console.log(now);

// console.log(new Date('Nov 12 2019'));
// console.log(new Date(2031, 0, 12, 3, 54, 55));

// console.log(new Date(0));

const future = new Date(2021, 0, 1, 0, 0, 1);
console.log(future);

console.log(`Year = ${future.getFullYear()}`);
console.log(`Month = ${future.getMonth() + 1}`);
console.log(`Day = ${future.getDate()}`);
console.log(`Hours = ${future.getHours()}`);
console.log(`Minutes = ${future.getMinutes()}`);
console.log(`Seconds = ${future.getSeconds()}`);

console.log(`Date in milliseconds = ${future.getTime()}`);

console.log(`Converted = ${new Date(future.getTime())}`)
console.log(`ISO = ${future.toISOString()}`);

console.log(`Current Timestamp = ${Date.now()}`);

future.setFullYear('2031');

console.log(future);



const future = new Date(2022, 0, 1, 0, 0, 1);
const daysLeft = (date1, date2) => Math.abs(date1 - date2) / (1000 * 60 * 60 * 24);

console.log(daysLeft(future, new Date(Date.now())));



const options = {
	style: 'currency',
	currency: 'INR',
}

const num = 17622389665;
console.log(`US = ${new Intl.NumberFormat('en-US', options).format(num)}`);
console.log(`IN = ${new Intl.NumberFormat('en-IN', options).format(num)}`);



//* Timers (setTimeout)
setTimeout(() => console.log('This will run after 3 seconds'), 3000);
setTimeout(() => console.log('This will run after 1 seconds'), 1000);


const ingredients = ['cheese', 'olives', 'onion'];
const pizzaTimer = setTimeout((...ingredients) => console.log(`Your pizza with ingredients ${ingredients} is ready`), 5000, ...ingredients);

if (ingredients.includes('sauce')) clearTimeout(pizzaTimer);



//* Timers (setInterval)

// setInterval(() => console.log('Run every 2 seconds'), 2000);

const options = {
	hour: 'numeric',
	minute: 'numeric',
	second: 'numeric',
}
setInterval(function() {
	const nowTime = new Intl.DateTimeFormat('en-GB', options).format(new Date());
	console.log(nowTime);
}, 1000);

*/