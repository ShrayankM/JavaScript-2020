
// * ---------- Coding Challenge #1 ---------- * //

const calcAverage = (scoreOne, scoreTwo, scoreThree) => {
  return (scoreOne + scoreTwo + scoreThree) / 3;
};

function checkWinner(avgDolphins, avgKoalas) {
  if (avgDolphins >= 2 * avgKoalas)
    return `Dolphins Win's (${avgDolphins}) vs (${avgKoalas})`;
  else if (avgKoalas >= 2 * avgDolphins)
    return `Koalas Win's (${avgKoalas}) vs (${avgDolphins}).`;
  else return "No Team Win's.";
}

const dolphinsAvg = calcAverage(85, 54, 41);
const koalasAvg = calcAverage(23, 34, 27);

// console.log(dolphinsAvg, koalasAvg);
const winner = checkWinner(dolphinsAvg, koalasAvg);

console.log(winner);

// * ---------- ******************* ---------- * //
// ! ----------------------------------------- ! //
// * ---------- Coding Challenge #2 ---------- * //

function calTip(bill) {
  return bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
}

function view(arr, type) {
  // for (i = 0; i < arr.length; i++)
  console.log(`${type} --> [${arr[0]}, ${arr[1]}, ${arr[2]}]`);
}

bills = [125, 555, 44];
tips = [0, 0, 0];
total = [0, 0, 0];

i = 0;

for (let i = 0; i < bills.length; i++) {
  tips[i] = calTip(bills[i]);
  total[i] = bills[i] + tips[i];
}

view(tips, "Tips");
view(total, "Total");
// * ---------- ******************* ---------- * //
// ! ----------------------------------------- ! //
// * ---------- Coding Challenge #3 ---------- * //

const mark = {
  name: "Mark Miller",
  weight: 78,
  height: 1.69,
  bmi: function () {
    return this.weight / this.height ** 2;
  },
};

const john = {
  name: "John Smith",
  weight: 92,
  height: 1.95,
  bmi: function () {
    return this.weight / this.height ** 2;
  },
};

if (john.bmi() > mark.bmi())
  console.log(
    `John's BMI (${john.bmi()}) is higher than Mark's (${mark.bmi()})!`
  );
else
  console.log(
    `Mark's BMI (${mark.bmi()}) is higher than John's (${john.bmi()})!`
  );

// * ---------- ******************* ---------- * //
// ! ----------------------------------------- ! //
// * ---------- Coding Challenge #4 ---------- * //

function calTip(bill) {
  return bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
}

function calAvg(arr) {
  let sum = 0;
  for (i = 0; i < arr.length; i++) sum += arr[i];
  return sum / arr.length;
}

bills = new Array(22, 295, 176, 440, 37, 105, 10, 1100, 86, 52);
tips = new Array();
total = new Array();

for (i = 0; i < bills.length; i++) {
  tips.push(calTip(bills[i]));
  total.push(bills[i] + tips[i]);
}

console.log(tips);
console.log(total);

console.log(calAvg(total));

// * ---------- ******************* ---------- * //
// ! ----------------------------------------- ! //
// * ---------- Developer Skills Coding Challenge #1 ---------- * //

function printForecast(arr) {
  const N = arr.length;
  let result = "";
  for (i = 0; i < N; i++) {
    result += `${arr[i]} dC in ${i + 1} days ...`;
  }
  return result;
}

arr = [17, 21, 23];
console.log(printForecast(arr));

// * ---------- ******************* ---------- * //

console.log(34);
console.log(34);
console.log(34);