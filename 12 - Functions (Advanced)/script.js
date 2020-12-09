'use strict';


//* Passing Arguments Value vs Reference
const flight = 'LH344';
const person = {
    name: 'Jack Ryan',
    passport: 1455678,
}

const checkIn = function(flight, person) {
    flight = 'LH677';
    person.name = 'MR. ' + person.name;
}

checkIn(flight, person);
console.log(flight, person);

//* Higher Order Functions
const counter = function() {
    let counter = 0;
    return function() {
        counter++;
        console.log(counter);
    }
}

let count = counter();

// for (let i = 0; i < 10; i++) count();
// console.log(count);

const counterObj = {
    value: 0,
    inc() {
        this.value++;
        console.log(this.value);
    },
    value2: 0,
}

// for (let i = 0; i < 10; i++) counterObj.inc();

const oneWord = function(str) {
    return str.replaceAll(' ', '');
}

console.log(oneWord('this    is bad  ok   '));

const upperFirstWord = function(str) {
    const [first, ...others] = str.split(' ');
    return [first.toUpperCase(), ...others];
}

console.log(...upperFirstWord('this IS the Best'));

//* Default Parameters

const bookings = [];

const createBooking = function(flightNo, passengers = 1, price = 100 * passengers) {
    const booking = {
        flightNo,
        passengers,
        price 
    }
    bookings.push(booking);
}

createBooking('LH463', 3, 80);
createBooking('LH453');
createBooking('LH666', 4);
createBooking('LH198', undefined, 40);

for (let booking of bookings) console.log(booking);

console.log(typeof createBooking);

//TODO First Class Functions
const add = (a, b) => a + b;
const sub = (a, b) => a - b;
const mul = (a, b) => a * b;
const div = (a, b) => a / b;

//TODO Higher Order Functions
const calculate = function(operation, a, b) {
    console.log(operation.name, operation(a, b));
}

calculate(add, 4, 5);
calculate(sub, 4, 5);
calculate(mul, 4, 5);
calculate(div, 4, 5);

const arr = [4, 6, 1, 3, 7, 8];
const doubleArr = [];
const dou = a => doubleArr.push(a * 2);

arr.forEach(dou);

console.log(doubleArr);

//* Returning Functions
// const greet = function(greeting) {
//     return function(name) {
//         console.log(`${greeting} ${name}.`);
//     }
// }

const greet = (greeting) => (name) => console.log(`${greeting} ${name}.`);

const greetBye = greet('Bye');
greetBye('Robert');

const greetHey = greet('Hey');
greetHey('Robert');

greet('Hello')('Lewis');


//* Call Apply Methods

const book = function(flightNo, name) {
    console.log(`${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNo}.`);
    this.bookings.push({
        flight: `${this.iataCode}${flightNo}`,
        name
    });
}

const buyPlanes = function() {
    this.planes++;
    console.log(this.planes);

    info.call(this);
}

const info = function() {
    console.log(`${this.airline} airlines has ${this.planes}.`);
}

const lufthansa = {
    airline: 'Lufthansa',
    iataCode: 'LH',
    bookings: [],
    planes: 300,
}

const eurowings = {
    airline: 'Eurowings',
    iataCode: 'EW',
    bookings: [],
    planes: 200,
}

// lufthansa.book(345, 'Robert');
// lufthansa.book(178, 'Johnny');

//TODO Call Methods
book.call(lufthansa, 345, 'Robert');
book.call(lufthansa, 178, 'John');

console.log(lufthansa.bookings);

book.call(eurowings, 590, 'Jack');
book.call(eurowings, 166, 'Ken');

console.log(eurowings.bookings);

//TODO Apply Methods
book.apply(lufthansa, [444, 'Jacky']);
book.apply(eurowings, [560, 'Tony']);


//TODO Bind Methods
book.bind(eurowings)(679, 'Charles');
book.bind(lufthansa)(555, 'Parth');

console.log(lufthansa.bookings);
console.log(eurowings.bookings);

const bookEW44 = book.bind(eurowings, 44);
bookEW44('Person44');

console.log(eurowings.bookings);

document.querySelector('.buy').addEventListener('click', buyPlanes.bind(lufthansa));
// document.querySelector('.buy').addEventListener('click', buyPlanes.bind(eurowings));

//* Partial Applications

// const addTax = (rate, value) => value + value * rate;

// const addVat = addTax.bind(null, .23);
// console.log(addVat(200));


const addTax = function(rate) {
    return function(value) {
        return value + value * rate;
    }
}

const addVat = addTax(.23);
console.log(addVat(100));

//* IIFE (Immediately Invoked Function Expression)

(function() {
    console.log('This will run only once');
})();


//* Closure

let passengerCount = 10;
const secureBooking = function() {
    let passengerCount = 0;
    return function() {
        passengerCount++;
        console.log(`${passengerCount} passengers`);
    }
}

const booker = secureBooking();
booker();
booker();
booker();
booker();
booker();

console.dir(booker);

const booker2 = secureBooking();
booker2();


let f;
const g = function() {
    const a = 23;
    f = function() {
        console.log(a * 2);
    }
}

g();
console.dir(f);
f();


const boardPassengers = function(n, wait) {
    const pergroup = n/3;

    setTimeout(function(){
        console.log(`We have started boarding the passengers.`);
        console.log(`There are 3 groups each group has ${pergroup} passengers.`);
    }, wait * 1000)

    console.log(`Boarding will begin in ${wait} seconds.`);
}

boardPassengers(1800, 5);