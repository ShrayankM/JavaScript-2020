// ? String Templates ES6
const firstName = "Jack";
const age = 24;
const job = "programmer";


const user = `Hi! I'm ${firstName} a ${age} years old ${job}.`;
console.log(user);

// ? Type Conversion / Coercion
const inputYear = '1991';
console.log(Number(inputYear) + 18);

console.log(String(78));

const a = 23, b = "45";
console.log(a + b);
console.log(a - b);
console.log(a * b);
console.log(a > b);


// ! 5 false values (0, '', undefined, null, NaN)


const ageN = "18";
if (ageN === 18) {
    console.log("Yes ! age is 18");
}