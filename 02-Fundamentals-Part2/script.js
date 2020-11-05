// * Strict Mode
'use strict';

let hasDriversLicense = false;
const passTest = true;

// if (passTest) hasDriverLicense = true;
// * Above line gives error in strict mode

if (passTest) hasDriversLicense = true;

if (hasDriversLicense) console.log("I can drive :D");


// * Functions

// ! Function Declaration
function calAge1(birthYear) {
    return 2020 - birthYear;
}

console.log(calAge1(1997));

// ! Function Expressions
const calAge2 = function(birthYear) {
    return 2020 - birthYear;
};

console.log(calAge2(1997));

// ! Arrow Functions
const calAge3 = birthYear => 2020 - birthYear;
console.log(calAge3(1997));

const yearsUntilRetirement = birthYear => {
    const age = 2020 - birthYear;
    return 65 - age;
}

console.log(yearsUntilRetirement(1997));

// * Arrays
const friends = ['Jack', 'Robert', 'Lewis'];
console.log(friends);


let years = new Array(1998, 1997, 2015, 2020);
console.log(years);

years = years.sort();

years.push(1994);
console.log(years);

console.log(years.indexOf(1997));

const user = new Array("Jack", "Ryan", 26, 78.90);
user.sort();

console.log(user);


const multi = new Array(
    new Array(1, 2, 3),
    new Array(4, 5, 6),
    new Array(7, 8, 9)
);

console.log(multi);

user.forEach(function(item, index) {
    console.log(item, index);
});

// const friends = ["John", "Michael", "Robert"];

friends.unshift("Jack");
friends.push("Lewis");

console.log(friends);

console.log(friends.indexOf("Lewis"));
console.log(friends.includes("Michael"));

// * Objects

const userOne = {
    firstName : "Robert",
    lastName  : "Downey",
    birthYear : 1983,
    job       : "Actor",
    viewUser  : function(argument) {
        console.log(`My name is ${this.firstName} ${this.lastName}. I am ${this.age} years old.
        This is the argument --> ${argument}`);
    },
    calculateAge : function(currentYear) {
        if (!this.age) {
            this.age = currentYear - this.birthYear;
            console.log("First Calculatiion");
        }
        return this.age;
    }
};

userOne.viewUser(34);

const a = 'age';
console.log(userOne[a]);
console.log(userOne.age);

const nameKey = 'Name';
console.log(userOne['first' + nameKey]);
console.log(userOne['last' + nameKey]);

userOne.location = "USA";
userOne["twitter"] = "@ironMan";

console.log(userOne);

userOne.friends = ["Michael", "Jack", "Jonas", "Lewis"];

console.log(`${userOne.firstName} has ${userOne.friends.length} friends, and his best friend is ${userOne.friends[0]}.`);

userOne.friends.unshift("Jill")

console.log(`${userOne.firstName} has ${userOne.friends.length} friends, and his best friend is ${userOne.friends[0]}.`);

console.log(userOne.calculateAge(2020));
console.log(userOne.calculateAge(2020));
console.log(userOne.calculateAge(2020));



console.log(userOne);


