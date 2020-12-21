'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

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


const displayMovements = function(movements) {

	containerMovements.innerHTML = '';
	movements.forEach(function(value, index) {
		const type = value > 0 ? 'deposit' : 'withdrawal';

		const html = `
			<div class="movements__row">
				<div class="movements__type movements__type--${type}">
				${index + 1} ${type}</div>
				<div class="movements__date">3 days ago</div>
				<div class="movements__value">${value}€</div>
			</div>
		`;

		containerMovements.insertAdjacentHTML('afterbegin', html);
	})
}

const calcPrintBalance = function(movements) {
	const balance = movements.reduce((acc, cur) => acc + cur, 0);
	labelBalance.textContent = `${balance}€`;
}


const createUsernames = function(accounts) {
	accounts.forEach(function(acc) {
		acc.username = acc.owner.toLowerCase().split(' ').map(value => value[0]).join('');
	})
	// return owner.toLowerCase().split(' ').map(value => value[0]).join('');
	// owner = owner.toLowerCase();
	// const arr = owner.split(' ');
	// console.log(arr);

	// let username = arr.map(value => value[0]);

	// username = username.join('');
	// console.log(username);
	
}

createUsernames(accounts);

// console.log(accounts);
displayMovements(account1.movements);
calcPrintBalance(account1.movements);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

/*
let arr = ['a', 'b', 'c', 'd', 'e'];

//* SLICE
console.log(arr.slice(2));
console.log(arr.slice(2, 6));

console.log(arr.slice(1, -2));

//* SPLICE
console.log([...arr]);
// console.log(arr.splice(2)); //! script.js:96 (2) ["a", "b"]

console.log(arr.splice(-2, 2));
console.log([...arr]);

//* REVERSE
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];

console.log(arr2.reverse());

console.log(arr2);

//* CONCAT
const letters = arr.concat(arr2);
console.log(letters);

console.log([...arr, ...arr2]);

//* JOIN
console.log([letters.join(' - ')]);

//* NORMAL FOR LOOP
for (let movement of movements) {
  if (movement > 0) {
    console.log(`You deposited $${movement}.`);
  }
  else {
    console.log(`You withdrew $${Math.abs(movement)}.`);
  }
}


//* FOREACH LOOP
movements.forEach(function(movement) {
	if (movement > 0) {
		console.log(`You deposited $${movement}.`);
	  }
	  else {
		console.log(`You withdrew $${Math.abs(movement)}.`);
	  }
})

//* ENTRIES LOOP
for (const [key, value] of movements.entries()) {	
}

movements.forEach(function(value, index, array) {
	console.log(`Value = ${value}, Index = ${index}, Array = [${array}]`);
})


currencies.forEach(function(value, key, map) {
	console.log(`${key}: ${value}`);
})

const currenciesUnique = new Set(['USD', 'EUR', 'USD', 'EUR', 'GBP']);
console.log(currenciesUnique);

currenciesUnique.forEach(function(value, _, set) {
	console.log(`${_}: ${value}`);
})
*/

//* MAP METHOD
const eurToUsd = 1.1;

const convert = function(value) {
	return value * eurToUsd;
}

// const dollars = movements.map((mov) => mov * eurToUsd); //* Using Arrow functions
const dollars = movements.map(convert);
// console.log(dollars);


//* FILTER METHOD
const deposits = movements.filter(function(mov) {
	return mov > 0;
})

const withdrawls = movements.filter(function(mov) {
	return mov < 0;
})

//TODO array.movements(function, initialValueOfAccumalator)
// const balance = movements.reduce(function(acc, cur, index, arr) {
// 	console.log(`Iteration ${index}: Value = ${acc}`);
// 	return acc + cur;
// }, 0)

const balance = movements.reduce((acc, cur) => acc + cur, 0);

console.log(deposits);
console.log(withdrawls);

console.log(movements);
console.log(balance);


const maximum = movements.reduce((acc, cur) => {
	acc = (cur > acc) ? cur : acc;
	return acc;
}, movements[0])

console.log(maximum);