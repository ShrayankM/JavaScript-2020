// * ---------- Coding Challenge #1 ---------- * //

const markWeight = 95, markHeight = 1.88;
const johnWeight = 85, johnHeight = 1.76;

const markBMI = markWeight / (markHeight * markHeight);
const johnBMI = johnWeight / (johnHeight * johnHeight);

console.log(markBMI, johnBMI);

let markHigherBMI = markBMI > johnBMI;
console.log(markHigherBMI);

// * ---------- ******************* ---------- * //
// ! ----------------------------------------- ! // 
// * ---------- Coding Challenge #2 ---------- * //

if (markHigherBMI) {
    // console.log(`Mark's BMI is higher than John's!`);
    console.log(`Mark's BMI (${markBMI}) is higher than John's (${johnBMI})!`);
}
else {
    // console.log(`John's BMI is higher than Mark's!`);
    console.log(`John's BMI (${johnBMI}) is higher than Mark's (${markBMI})!`);   
}

// * ---------- ******************* ---------- * //
// ! ----------------------------------------- ! // 
// * ---------- Coding Challenge #3 ---------- * //

let dolphins = [97, 112, 101];
let koalas   = [109, 95, 106];

let dolphinsAvg = 0, koalasAvg = 0;

let i = 0, N = dolphins.length;

while (i < N) {
    dolphinsAvg += dolphins[i];
    koalasAvg += koalas[i];
    i++;
}

dolphinsAvg = dolphinsAvg / N;
koalasAvg = koalasAvg / N;

console.log(dolphinsAvg, koalasAvg);

if (dolphinsAvg > koalasAvg && dolphinsAvg >= 100) {
    console.log("Dolphins Win's the competition.");
}
else if (dolphinsAvg < koalasAvg && koalasAvg >= 100) {
    console.log("Koalas Win's the competition.");
}
else if (dolphinsAvg === koalasAvg && (dolphinsAvg >= 100 && koalasAvg >= 100)) {
    console.log("Tie");
}
else {
    console.log("No one wins");
}

// * ---------- ******************* ---------- * //
// ! ----------------------------------------- ! // 

// * ---------- Coding Challenge #4 ---------- * //

const bill = Number(prompt("Enter the bill amount ? "));
const tip = (bill >= 50 && bill <= 300) ? bill * 0.15 : bill * 0.2;

console.log(`The bill was ${bill}, the tip was ${tip}, and the total value ${bill + tip}”`);

// * ---------- ******************* ---------- * //
// ! ----------------------------------------- ! // 