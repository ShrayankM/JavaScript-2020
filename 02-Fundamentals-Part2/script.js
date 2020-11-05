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

