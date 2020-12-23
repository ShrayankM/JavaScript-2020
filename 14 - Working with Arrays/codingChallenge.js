//* ---------- Coding Challenge #1 ---------- *//
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

//* ----------------------------------------- *//

//* ---------- Coding Challenge #2 ---------- *//


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

//* ----------------------------------------- *//

//* ---------- Coding Challenge #3 ---------- *//

const calcAverageHumanAgeChained = function(dogsAge) {
    const average = dogsAge.map((value) => {
        return (value <= 2) ? 2 * value : 16 + value * 4;
    }).filter((value) => value >= 18).reduce((acc, value, index, arr) => acc + value/arr.length, 0);
    return average;
}

console.log(calcAverageHumanAgeChained([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAverageHumanAgeChained([16, 6, 10, 5, 6, 1, 4]));

//* ----------------------------------------- *//
