// TODO DOM Objects
const exp = document.querySelector('.expression');
const operators = document.querySelectorAll('.opr');
const oprN = operators.length;

const numbers = document.querySelectorAll('.num');
const numN = numbers.length;

const equalBtn = document.querySelector('.equalbtn');

const clearBtn = document.querySelector('.clear');

let expEvaluate = "";

for (let i = 0; i < oprN; i++) {
    operators[i].addEventListener('click', function() {
        console.log(operators[i].textContent);

        expEvaluate += operators[i].name;
        exp.textContent += operators[i].textContent;
    });
}

for (let i = 0; i < numN; i++) {
    numbers[i].addEventListener('click', function() {
        console.log(numbers[i].textContent);

        expEvaluate += numbers[i].textContent;
        exp.textContent += numbers[i].textContent;
    });
}

clearBtn.addEventListener('click', function() {
    exp.textContent = "";
    expEvaluate = "";
})

function checkValid(a) {
    if (a === null || a === undefined) return false;
    return true;
}

function calculate(a, op, b) {

    
    if (op == '+') return a + b;
    if (op == '-') return a - b;
    if (op == '*') return a * b;
    if (op == '/') return a / b;
}

equalBtn.addEventListener('click', function() {
    const str = expEvaluate;
    console.log(str);
    let i = 0;
    let flag = true;

    let a = 0, b = 0, c = op = '';
    while (i < str.length) {
        if (flag) {
            a = Number(str[i]);
            op = str[i + 1];
            b = Number(str[i + 2]);

            if (checkValid(a) && checkValid(op) && checkValid(b)) { 
                a = calculate(a, op, b);
            }
            else {
                exp.textContent = 'Math Error';
                break;
            }
            flag = false;
            i = i + 3;
        }
        else { 
            op = str[i];
            c = Number(str[i + 1]);

            if (checkValid(a) && checkValid(op) && checkValid(c)) { 
                a = calculate(a, op, c);
            }
            i = i + 2;
        }
    }
    exp.textContent = a;
})