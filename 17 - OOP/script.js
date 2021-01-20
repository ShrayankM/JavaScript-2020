'use strict';

/*
//* Constructor Functions
const Person = function(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;

    //! Never do this (Performance issues);
    // this.calcAge = () => 2021 - this.birthYear;
    // this.calcAge = function() {
    //     console.log(2021 - this.birthYear);
    // }
}

const jonas = new Person('Jonas', 1991);
console.log(jonas);

//* Prototypes
Person.prototype.calcAge = function() {
    console.log(2021 - this.birthYear);
}

//* Static method
Person.hey = function() {
    console.log('Hey there 👋️');
}
Person.hey();

jonas.calcAge();
console.log(jonas.__proto__, Person.prototype);

console.log(Person.prototype.isPrototypeOf(Person));
console.log(Person.prototype.isPrototypeOf(jonas));

Person.prototype.species = 'Homo Sapiens';

console.log(`jonas.hasOwnProperty('firstName') = ${jonas.hasOwnProperty('firstName')}`);
console.log(`jonas.hasOwnProperty('species') = ${jonas.hasOwnProperty('species')}`);

//* 1. New empty Object {} is created.
//* 2. function is called, this = {}.
//* 3. {} is linked to prototype
//* 4. function returns the object automatically.

console.dir(Person.prototype.constructor);

const arr = [3, 3, 5, 6, 1, 1];
console.log(arr.__proto__);

console.log(`(arr.__proto__ === Array.prototype) = ${arr.__proto__ === Array.prototype}`);

//! Do not do this in practice
Array.prototype.unique = function() {
    return [...new Set(this)];
}

console.log(arr.unique());

*/

//* ES6 Classes

/*
class Person {
    constructor(fullName, firstName, birthYear) {
        this.firstName = firstName;
        this.birthYear = birthYear;
        this.fullName = fullName;
    }

    calcAge() {
        console.log(2021 - this.birthYear);
    }

    greet() {
        console.log(`Hey ${this.firstName}`);
    }

    set fullName(name) {
        console.log(name);
        if (name.includes(' ')) this._fullName = name;
    }

    get fullName() {
        return this._fullName;
    }

    static hey() {
        console.log('Hey there 👋️');
    }

}

//* 1. Classes are not hoisted
//* 2. Classes are first-class citizens
//* 3. Classes are executed in strict mode

const jessica = new Person('Jessica Davis', 'Jessica', 1996);
console.log(jessica);

jessica.calcAge();

//* Normal Prototype adding
// Person.prototype.greet = function() {
//     console.log(`Hey ${this.firstName}`);
// }

jessica.greet();

console.log(jessica.fullName);

const account = {
    name: "Jonas",
    movements: [100, 120, 500, 60, 300],

    get latest() {
        return this.movements.slice(-1)[0];
    },

    set latest(mov) {
        this.movements.push(mov);
    }
};

console.log(account.latest);
account.latest = 1000;

console.log(account.movements);

Person.hey();

*/

//* Object Create

const PersonProto = {
    init(firstName, birthYear) {
        this.firstName = firstName;
        this.birthYear = birthYear;
    },

    calcAge() {
        console.log(2021 - this.birthYear);
    }
};


const sarah = Object.create(PersonProto);
sarah.init('Sarah', 1997);

console.log(sarah, sarah.__proto__);

console.log(`(sarah.__proto__ === PersonProto) = ${sarah.__proto__ === PersonProto}`);