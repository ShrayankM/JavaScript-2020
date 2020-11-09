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
        // console.log(operators[i].textContent);

        expEvaluate += operators[i].name;
        exp.textContent += operators[i].textContent;
    });
}

for (let i = 0; i < numN; i++) {
    numbers[i].addEventListener('click', function() {
        // console.log(numbers[i].textContent);

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

    // console.log(a, op, b);
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

    let a = undefined, b = undefined, c = op = '';
    console.log(a, op, b);
    while (i < str.length) {
        if (flag) {

            let j = i;
            while (Number(str[j]) || Number(str[j]) == 0 || str[j] == '.') j++;

            a = Number(str.substring(i, j));
            i = j;
            op = str[i];
            
            j++;
            while (Number(str[j]) || Number(str[j]) == 0 || str[j] == '.') j++;

            b = Number(str.substring(i + 1, j));

            i = j;

            console.log("First", a, op, b);

            if (checkValid(a) && checkValid(op) && checkValid(b)) { 
                a = calculate(a, op, b);
            }
            else {
                exp.textContent = 'Math Error';
                break;
            }
            flag = false;
            // i = i + 3;
        }
        else { 
            op = str[i];
            let j = i + 1;

            while (Number(str[j]) || Number(str[j]) == 0 || str[j] == '.') j++;
            c = Number(str.substring(i + 1, j));

            i = j;

            console.log("Second", a, op, c);

            if (checkValid(a) && checkValid(op) && checkValid(c)) { 
                a = calculate(a, op, c);
            }
            // i = i + 2;
        }
    }
    exp.textContent = a;
    expEvaluate = a;
})