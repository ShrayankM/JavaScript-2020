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

let sortedFlag = false;

const displayMovements = function(movements) {

	containerMovements.innerHTML = '';
	movements.forEach(function(value, index) {
		const type = value > 0 ? 'deposit' : 'withdrawal';

		value = (value > 0) ? value : value * -1;
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

const calcPrintBalance = function(account) {
	account.balance = account.movements.reduce((acc, cur) => acc + cur, 0);
	labelBalance.textContent = `${account.balance}€`;
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

const calculateSummary = function(movements, intRate) {
	const income = movements.filter((mov) => mov > 0).reduce((acc, mov) => acc + mov, 0);
	labelSumIn.textContent = `${income}€`;

	const expend = movements.filter((mov) => mov < 0).reduce((acc, mov) => acc + mov, 0);
	labelSumOut.textContent = `${Math.abs(expend)}€`;

	const interest = movements.filter((mov) => mov > 0).map((mov) => mov * intRate/100).filter((mov) => mov >= 1).reduce((acc, mov) => acc + mov, 0);
	labelSumInterest.textContent = `${interest}€`;
}

createUsernames(accounts);

// console.log(accounts);
// displayMovements(account1.movements);
// calcPrintBalance(account1.movements);

// calculateSummary(account1.movements);

const updateUI = function(account) {
	//* Display Movements
	displayMovements(account.movements);

	//* Display Balance
	calcPrintBalance(account);

	//* Display Summary
	calculateSummary(account.movements, account.interestRate);
}

//TODO Event Handlers
let currentUser;

btnLogin.addEventListener('click', function(event) {

	//* prevent page from reloading
	event.preventDefault();

	currentUser = accounts.find((acc) => {
		return (acc.pin == inputLoginPin.value && acc.username == inputLoginUsername.value);
	});

	if (currentUser) {

		sortedFlag = false;
		//* Display UI and Welcome Message
		labelWelcome.textContent = `Welcome back, ${currentUser.owner.split(' ')[0]}`;
		containerApp.style.opacity = 100;

		//TODO Clear Input Fields (and remove cursor from fields)
		inputLoginUsername.value = inputLoginPin.value = '';

		inputLoginPin.blur();
		inputLoginUsername.blur();

		//* update UI
		updateUI(currentUser);
		
	}
})


btnTransfer.addEventListener('click', function(e) {
	e.preventDefault();
	
	const amount = Number(inputTransferAmount.value);
	const recevierAccount = accounts.find((acc) => acc.username === inputTransferTo.value);

	inputTransferAmount.value = inputTransferTo.value = '';
	inputTransferAmount.blur();
	inputTransferTo.blur();

	if (recevierAccount && recevierAccount.username != currentUser.username && 0 < amount && amount <= currentUser.balance) {
		currentUser.movements.push(amount * -1);
		recevierAccount.movements.push(amount);

		//* update UI
		updateUI(currentUser);
	}
	// console.log(amount, recevierAccount);
})

btnClose.addEventListener('click', function(e) {
	e.preventDefault();

	if (currentUser.username == inputCloseUsername.value && currentUser.pin == inputClosePin.value) {
		const index = accounts.findIndex((acc) => acc.username == currentUser.username);

		if (index != -1) {
			accounts.splice(index, 1);
			containerApp.style.opacity = 0;
		}
	}
	
})

btnLoan.addEventListener('click', function(e) {
	e.preventDefault();

	const amount = Number(inputLoanAmount.value);
	if (amount > 0 && currentUser.movements.some((mov) => amount * 0.1 <= mov)) {
		currentUser.movements.push(amount);

		updateUI(currentUser);
	}

	inputLoanAmount.value = '';
	inputLoanAmount.blur();
})

btnSort.addEventListener('click', function(e) {
	e.preventDefault();

	const moves = sortedFlag ? currentUser.movements : currentUser.movements.slice().sort((a, b) => a - b);
	sortedFlag = !sortedFlag;

	displayMovements(moves);
})

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



//* CHAINING (PIPLINE)

const eurToUsd = 1.1;
const totalDeposit = movements.filter((mov) => mov > 0).map((mov) => mov * eurToUsd).reduce((acc, mov) => acc + mov, 0);

console.log(totalDeposit);



//* FIND
const search = movements.find(function(curr) {
	return curr == 1300;
})

console.log(search);
console.log(movements);



// let account = accounts.find((acc) => acc.owner === "Jessica Davis");
let account;
for (let acc of accounts) {
	if (acc.owner === "Jessica Davis") account = acc;
}

console.log(account);
console.log(accounts);

*/

//* SOME METHOD

console.log(movements);
const anyDeposits = movements.some((mov) => mov > 0);

console.log(anyDeposits);

//* EVERY

const allDeposits = account3.movements.every((mov) => mov > 0);
console.log(allDeposits);

//* FLAT
let arr = [[[1, 2], 3], 5, 6, 7, [8, [9, 0]]];

console.log(arr.flat(1))
console.log(arr.flat(2))


const overallBalance = accounts.map((acc) => acc.movements).flat().reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance);

//* FLATMAP does not go down levels (single level(1))
const overallBalance_ = accounts.flatMap((acc) => acc.movements).reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance_);


arr = [23, 4, 123, 67, 99, 2, -3, -90, 55, 12, 5, -78, 4];

console.log(arr.sort());

//todo ascending sort
const sortAscend = function(a, b) {
	if (a < b) return -1;
	if (a > b) return 1;
}

//todo descending sort
const sortDesend = function(a, b) {
	if (a < b) return 1;
	if (a > b) return -1;
}

arr.sort(sortAscend);
console.log(arr);

arr.sort(sortDesend);
console.log(arr);