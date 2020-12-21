//* ---------- Coding Challenge #1 ---------- *//
Julia = [3, 5, 2, 12, 7];
Kate =  [4, 1, 15, 8, 3];

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