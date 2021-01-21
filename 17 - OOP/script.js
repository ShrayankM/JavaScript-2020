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



//* Inheritance between classes: (Constructor Functions)
const Person = function(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
}

Person.prototype.calcAge = function() {
    console.log(2021 - this.birthYear);
}

const Student = function(firstName, birthYear, course) {
    Person.call(this, firstName, birthYear);
    this.course = course;
}

Student.prototype = Object.create(Person.prototype);
Student.prototype.introduce = function() {
    console.log(`My name is ${this.firstName} and I study ${this.course}`);
}

const mike = new Student('Mike', 1997, 'CS');
mike.introduce();
mike.calcAge();


//* Inheritance between classes (ES6 Classes)

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
        // console.log(name);
        if (name.includes(' ')) this._fullName = name;
        else                    alert(`${name} is not fullname.`);
    }

    get fullName() {
        return this._fullName;
    }

    static hey() {
        console.log('Hey there 👋️');
    }
}

class Student extends Person {
    constructor(fullName, firstName, birthYear, course) {
        super(fullName, firstName, birthYear);
        this.course = course;
    }

    introduce() {
        console.log(`My name is ${this.fullName} and I study ${this.course}`);
    }
}

const michael = new Student('Michael Davis', 'Michael', 1991, 'CS');
michael.introduce();
michael.calcAge();



//* Inheritance between classes (Object.create())

const PersonProto = {
    init(firstName, birthYear) {
        this.firstName = firstName;
        this.birthYear = birthYear;
    },

    calcAge() {
        console.log(2021 - this.birthYear);
    }
};

const StudentProto = Object.create(PersonProto);

StudentProto.init = function(firstName, birthYear, course) {
    PersonProto.init.call(this, firstName, birthYear);
    this.course = course;
}

StudentProto.calcAge = function() {
    console.log(`I'm ${2021 - this.birthYear} years old!!!`);
}

const jay = Object.create(StudentProto);
jay.init('Jay', 1995, 'ME');

jay.calcAge();



//* 1) Public fields
//* 2) Private fields
//* 3) Public methods
//* 4) Private methods

class Account {

    //* Public fields
    locale = navigator.language;

    //! Private fields
    #movements = [];
    #pin;

    constructor(owner, currency, pin) {
        this.owner = owner;
        this.currency = currency;
        // this.locale = navigator.language;

        //* Protected Property
        this.#pin = pin;
        // this._movements = [];
    }

    //TODO Application Public Interface (API)

    getMovements() {
        return this.#movements;
    }

    deposit(val) {
        this.#movements.push(val);
        return this;
    }

    withdraw(val) {
        this.deposit(-val);
    }

    requestLoan(val) {
        if (this._approveLoan(val)) {
            this.deposit(val);
            console.log('Loan Approved');
        }
    }

    _approveLoan(val) {
        return true;
    }
}

const acc1 = new Account('Jack', 'INR', 1111);

acc1.deposit(1000);
acc1.deposit(300);

acc1.withdraw(500);

acc1.requestLoan(1000);

acc1.deposit(1000).deposit(500);

console.log(acc1.getMovements());

*/

//Todo Summary Class

class Person {
    constructor(firstName, birthYear) {
        this.firstName = firstName;
        this.birthYear = birthYear;
    }
}

class Student extends Person {
    //* Public fields
    university = 'University of Libson';

    //! Private fields
    #studyHrs = 0;
    #course;

    //? Static fields
    static numSubjects = 10;

    constructor(firstName, birthYear, startYear, course) {
        super(firstName, birthYear);
        this.startYear = startYear;
        this.#course = course;
    }

    introduce() {
        console.log(`Hi! I'm ${this.firstName}, and I'm a student at ${this.university}`);
    }

    study(hrs) {
        this.#makecoffee();
        this.#studyHrs += hrs;
    }

    //! Private methods
    #makecoffee() {
        console.log(`Here is coffee for you ☕️☕️☕️☕️☕️`);
    }

    //* Setter method
    set testScore(score) {
        this._testScore = score <= 20 ? score: 0;
    }

    //* Getter method
    get testScore() {
        return this._testScore;
    }

    static printCurriculam() {
        console.log(`There are ${this.numSubjects} subjects in total.`);
    }
}

const student = new Student('Jonas', 1993, 2021, 'Computer Science');
student.testScore = 6;
console.log(student.testScore);

Student.printCurriculam();

student.study(15);
