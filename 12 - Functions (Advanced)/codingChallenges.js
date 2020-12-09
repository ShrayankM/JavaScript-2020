//* ---------- Coding Challenge #1 ---------- *//

const displayResults = function(type = 'array') {
    if (type === 'array') console.log(this.answers);
    else if (type === 'string') {
        let result = `Poll results are ${this.answers.join(', ')}.`;
        console.log(result);
    }
};

const registerNewAnswer = function() {
    let choice = prompt(`${this.question} \n ${this.options.join(' \n')} \n(Write Option Number)`);

    if (choice < 4 && choice > -1) this.answers[Number(choice)]++;
    else alert('Invalid Choice!!!'); 

    displayResults.call(this, 'string');
    displayResults.call(this);
};

const poll = {
    question: "What is your favourite programming language?",
    options: ["0: JavaScript", "1: Python", "2: Rust", "3:C++"],
    // This generates [0, 0, 0, 0]. More in the next section!
    answers: new Array(4).fill(0),
};

document.querySelector('.poll').addEventListener('click', registerNewAnswer.bind(poll));

displayResults.call({answers: [5, 2, 3]});
displayResults.call({answers: [5, 2, 3]}, 'string');

displayResults.call({answers: [1, 5, 3, 9, 6, 1]});
displayResults.call({answers: [1, 5, 3, 9, 6, 1]}, 'string');

// [1, 5, 3, 9, 6, 1]
//* ----------------------------------------- *//

//* ---------- Coding Challenge #2 ---------- *//

(function () {
    const header = document.querySelector('h1');
    header.style.color = 'red';

    document.addEventListener('click', function() {
        header.style.color = 'blue';

        setTimeout(function(){
            header.style.color = 'red';
        }, 1000)
    })
})();

//* ----------------------------------------- *//