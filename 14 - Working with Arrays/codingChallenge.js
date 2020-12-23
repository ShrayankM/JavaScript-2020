'use strict';

//* ---------- Coding Challenge #1 ---------- *//
/*
let Julia = [3, 5, 2, 12, 7];
let Kate =  [4, 1, 15, 8, 3];

const checkDogs = function(dogsJulia, dogsKate) {
    dogsJulia.splice(-2, 2);
    dogsJulia.splice(0, 1);

    // console.log(dogsJulia);
    const dogs = [...dogsJulia, ...dogsKate];

    dogs.forEach(function(value, index) {
        const type = (value >= 3) ? 'adult' : 'puppy'; 
        if (type == 'adult') {
            console.log(`Dog 🐶 number ${index + 1} is an adult, and is ${value} years old`);
        }
        else {
            console.log(`Dog 🦊️ number ${index + 1} is still a puppy`);
        }
    })
}

checkDogs(Julia, Kate);
*/
//* ----------------------------------------- *//

//* ---------- Coding Challenge #2 ---------- *//
/*

const calcAverageHumanAge = function(dogsAge) {

    const mapped = dogsAge.map((value) => {
        return (value <= 2) ? 2 * value : 16 + value * 4;
    })

    const filtered = mapped.filter((value) => value >= 18);
    // const total = filtered.reduce((acc, value, index, arr) => acc + value/arr.length, 0);
    const total = filtered.reduce((acc, value) => acc + value, 0);
    return total/filtered.length;
}

console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));
*/
//* ----------------------------------------- *//

//* ---------- Coding Challenge #3 ---------- *//
/*
const calcAverageHumanAgeChained = function(dogsAge) {
    const average = dogsAge.map((value) => {
        return (value <= 2) ? 2 * value : 16 + value * 4;
    }).filter((value) => value >= 18).reduce((acc, value, index, arr) => acc + value/arr.length, 0);
    return average;
}

console.log(calcAverageHumanAgeChained([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAverageHumanAgeChained([16, 6, 10, 5, 6, 1, 4]));
*/
//* ----------------------------------------- *//

//* ---------- Coding Challenge #4 ---------- *//

const dogs = [
    { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
    { weight: 8, curFood: 200, owners: ['Matilda'] },
    { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
    { weight: 32, curFood: 340, owners: ['Michael'] },
];

const addRecomendedFood = function(dogs) {
    dogs.forEach((dogObj) => {
        dogObj.recommendedFood = dogObj.weight ** 0.75 * 28;
    })
}

const findSarahsDog = function(dogs) {
    const sarahsDog = dogs.find((dogsObj) => {
        return dogsObj.owners.find((owner) => owner == 'Sarah');
    })
    
    if (sarahsDog.curFood < sarahsDog.recommendedFood) console.log(`Sarah's dog is eating too little.`);
    else                                               console.log(`Sarah's dog is eating too much.`)
}

const findEatMuch = function(dogs) {
    return dogs.filter((dogsObj) => dogsObj.curFood > dogsObj.recommendedFood).map((dogsObj) => dogsObj.owners).flat();
}

const findEatLittle = function(dogs) {
    return dogs.filter((dogsObj) => dogsObj.curFood < dogsObj.recommendedFood).map((dogsObj) => dogsObj.owners).flat();
}

const dogsEatOkay = function(dogs) {
    const okayDogs = dogs.filter((dogsObj) => dogsObj.curFood > dogsObj.recommendedFood + dogsObj.recommendedFood * 0.1 
    || dogsObj.curFood < dogsObj.recommendedFood - dogsObj.recommendedFood * 0.1);
    return okayDogs;
}

const sortedDogs = function(dogs) {
    const tempDogs = dogs.slice().sort((dogsA, dogsB) => {
        return dogsA.recommendedFood - dogsB.recommendedFood;
    })

    return tempDogs;
}

addRecomendedFood(dogs);
findSarahsDog(dogs);

const ownersEatTooMuch = findEatMuch(dogs);
const ownersEatTooLittle = findEatLittle(dogs);

console.log(ownersEatTooMuch);
console.log(ownersEatTooLittle);

const ownerEatMuch = `${ownersEatTooMuch.join(' and ')}'s dogs eat too much!`;
const ownerEatLittle = `${ownersEatTooLittle.join(' and ')}'s dogs eat too little!`;

console.log(ownerEatMuch);
console.log(ownerEatLittle);

//* EATING EXACTLY
console.log(dogs.some((dogsObj) => dogsObj.curFood === dogsObj.recommendedFood));

//* EATING OKAY
console.log(dogs.some((dogsObj) => dogsObj.curFood > dogsObj.recommendedFood + dogsObj.recommendedFood * 0.1 
                                || dogsObj.curFood < dogsObj.recommendedFood - dogsObj.recommendedFood * 0.1))

const dogsOkay = dogsEatOkay(dogs);

console.log(dogsOkay);

console.log(sortedDogs(dogs));

console.log(dogs);
//* ----------------------------------------- *//

