'use strict';

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },

  order: function(i, j) {
    return [this.starterMenu[i], this.mainMenu[j]];
  },

  orderDelivery: function({time: t, address: a, startIndex: si, mainIndex: mi}) {
    console.log(`Order Received!, [${this.starterMenu[si]}, ${this.mainMenu[mi]}] to be delivered at address (${a}) by ${t}.`)
  },

  orderPasta: function(i, j, k) {
    console.log(`Here is your delicious pasta with [${i}, ${j}, ${k}].`);
  }

};


//TODO Objects Looping

const keys = Object.keys(restaurant);
const values = Object.values(restaurant);
const entries = Object.entries(restaurant);

console.log(keys);
console.log(values);

for (let [key, value] of entries) console.log(key, value);

//TODO Optional Chaining
// const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
// const r = 'restaurant', o = 'openingHours';

// for (let day of days) {
//   const open = restaurant[o]?.[day]?.open ?? 'does Not Open';
//   console.log(`On ${day}, we open at ${open}`);
// }

// const m = 'order';
// const mnew = 'orderRissto';

// console.log(restaurant[m]?.(0, 1) ?? "Method does not exist");
// console.log(restaurant[mnew]?.(0, 1) ?? "Method does not exist");

//TODO Enhanced Object Literals
// const objOne = {
//   a: 45,
//   b: 67,
//   c: 78,
// };

// const objTwo = {
//   objOne,
//   d: 90,
//   name: 'Jack',

//   details() {
//     const {a, b, c} = this.objOne;
//     console.log(`Details: name = ${this.name}, d = ${this.d}, objOne = [${a}, ${b}, ${c}]`);
//   }
// };

// console.log(objTwo);

// objTwo.details();

//TODO for-of Loop

// const menu = [...restaurant.mainMenu, ...restaurant.starterMenu];
// // for (let m of menu) console.log(m);

// for (let [index, value] of menu.entries()) console.log(`${index + 1}: ${value}`);


// TODO Rest Patterns
// const [a, b, ...others] = [1, 2, 3, 4, 5]
// console.log(a, b, others);

// const [pizza, pasta, ...otherFoods] = [...restaurant.mainMenu, ...restaurant.starterMenu];
// console.log(pizza, pasta, otherFoods);
// console.log(typeof otherFoods);

// const {sat, ...weekdays} = restaurant.openingHours;
// console.log(sat, weekdays); 

// const add = function(...numbers) {
//   let sum = 0, N = numbers.length;
//   for (let i = 0; i < N; i++)
//     sum += numbers[i];
  
//   console.log(sum);
// }

// add(2, 3);
// add(4, 5, 6);
// add(6, 7, 8, 1, 2, 3);

// const x = [12, 78, 9, 10];
// add(67, ...x, 56, 7, 0);

// TODO Spread Operator

// const arr = [1, 5, 8];
// const newarr = [3, 4, ...arr];

// console.log(newarr);

// const newMenu = [...restaurant.mainMenu, 'Gnocci', 'Noodles'];
// console.log(newMenu);
// console.log(...newMenu);

// * Merging 2 or More arrays
// const aOne = [1, 2, 3, 4];
// const aTwo = [5, 6, 7, 8];

// const aThree = [...aOne, ...aTwo];
// console.log(aThree);

// // ! Spread Operator works on all Iterables (arrays, sets, maps, strings) !!! Objects (ES2018)
// const str = "abcdefghijklmnopqrst";
// const alphabets = [...str];

// console.log(alphabets);

// * Real World Example
// const ingredients = [
//   prompt("Enter ingredients for Pasta, Ingredient1 ?"),
//   prompt("Ingredient2 ?"),
//   prompt("Ingredient3 ?")
// ]

// console.log(ingredients);

// restaurant.orderPasta(...ingredients);

// * Objects Spread (ES2018)

// const newRestaurant = {...restaurant};
// newRestaurant.name = "my rest";

// console.log(newRestaurant);
// console.log(restaurant);

// TODO Destructuring Objects

// const {name, openingHours, categories} = restaurant;
// console.log(name, openingHours, categories);

// // * Different Names
// const {name: restName, openingHours: hrs, categories: tags} = restaurant;
// console.log(restName, hrs, tags);

// // * Default Values
// const {menu: rMenu = ['Coffee', 'Sandwich'], categories: catgs = ['Italian', 'Continental']} = restaurant;
// console.log(rMenu, catgs);

// // * Mutating Variables
// const obj = {a: 45, b: 67, c: 88};
// let a = 1, b = 10;

// ({a, b} = obj);
// console.log(a, b);
// console.log(typeof a, typeof b);

// // * Nested Destructuring Objects
// const {openingHours: {fri: {open, close}}} = restaurant;
// console.log(open, close);

// const order = {
//   time: "22:30",
//   address: "911 Baker Street",
//   mainIndex: 1,
//   startIndex: 1 
// };

// restaurant.orderDelivery(order);


// TODO Destructring Arrays
// const arr = [11, 23, 54];
// const [a, b, c] = arr;

// console.log(a, b, c);
// console.log(arr);

// const [x, y] = restaurant.categories;
// console.log(x, y);

// let [main, , secondary] = restaurant.categories;
// console.log(main, secondary);

// // * Swapping elements
// [main, secondary] = [secondary, main] 
// console.log(main, secondary);

// console.log(restaurant.order(1, 2));


// const nested = [2, 4, [56, 78]];
// const [i, , [j, k]] = nested;

// console.log(i, j, k);

// const [p = 1, q = 1, r = 1] = [78, 99];
// console.log(p, q, r);
