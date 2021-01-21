// //************* Coding Challenge #1 ****************//

// const Car = function (make, speed) {
//     this.make = make;
//     this.speed = speed;
// }

// Car.prototype.accelerate = function () {
//     this.speed += 10;
//     console.log(`${this.make} (Speed = ${this.speed}km/hr)`);
// }

// Car.prototype.brake = function () {
//     this.speed -= 5;
//     console.log(`${this.make} (Speed = ${this.speed}km/hr)`);
// }

// const bmw = new Car('Bmw M3 GTR', 120);
// const merc = new Car('Mercedes AMG', 95);

// bmw.accelerate();
// bmw.accelerate();

// merc.brake();

// //************* ******************* ****************//

// //************* Coding Challenge #2 ****************//

// class CarCl {
//     constructor(make, speed) {
//         this.make = make;
//         this.speed = speed;
//     }

//     accelerate() {
//         this.speed += 10;
//         console.log(`${this.make} (Speed = ${this.speed}km/hr)`);
//     }

//     brake() {
//         this.speed -= 5;
//         console.log(`${this.make} (Speed = ${this.speed}km/hr)`);
//     }

//     get speedUS() {
//         return `${this.speed/1.6} mi/hr`;
//     }

//     set speedUS(speed) {
//         this.speed = speed * 1.6;
//     }
// }

// const ford = new CarCl('Ford Mustang', 120);
// ford.accelerate();

// console.log(ford.speedUS);

// ford.speedUS = 100;

// ford.accelerate();
// console.log(ford);

// console.log(ford.speedUS);


// ford.brake();
// console.log(ford);


//************* ******************* ****************//

//************* Coding Challenge #3 ****************//

const Car = function (make, speed) {
    this.make = make;
    this.speed = speed;
}

Car.prototype.accelerate = function () {
    this.speed += 10;
    console.log(`${this.make} (Speed = ${this.speed}km/hr)`);
}

Car.prototype.brake = function () {
    this.speed -= 5;
    console.log(`${this.make} (Speed = ${this.speed}km/hr)`);
}

const EV = function (make, speed, charge) {
    Car.call(this, make, speed);
    this.charge = charge;
}

EV.prototype = Object.create(Car.prototype);

EV.prototype.chargeBattery = function (chargeTo) {
    this.charge = chargeTo;
}

EV.prototype.accelerate = function () {
    this.speed += 20;
    this.charge -= 1;
    console.log(`${this.make} is going at ${this.speed} km/hr, with a charge of ${this.charge}%`);
}

const tesla = new EV('Tesla', 100, 24);
tesla.accelerate();

tesla.chargeBattery(90);
tesla.accelerate();
tesla.brake();

//************* ******************* ****************//

//************* Coding Challenge #4 ****************//

class CarCl {
    constructor(make, speed) {
        this.make = make;
        this.speed = speed;
    }

    accelerate() {
        this.speed += 10;
        console.log(`${this.make} (Speed = ${this.speed}km/hr)`);
    }

    brake() {
        this.speed -= 5;
        console.log(`${this.make} (Speed = ${this.speed}km/hr)`);
    }
}

class EVCl extends CarCl {

    //! Private fields
    #charge;

    constructor(make, speed, charge) {
        super(make, speed);
        this.#charge = charge;
    }

    accelerate() {
        this.speed += 20;
        this.#charge -= 1;
        console.log(`${this.make} is going at ${this.speed} km/hr, with a charge of ${this.#charge}%`);
        return this;
    }

    brake() {
        this.speed -= 5;
        console.log(`${this.make} is going at ${this.speed} km/hr, with a charge of ${this.#charge}%`);
        return this;
    }

    chargeBattery(chargeTo) {
        this.#charge = chargeTo;
        return this;
    }
}

const rivian = new EVCl('Rivian', 120, 23);
rivian.accelerate().accelerate().brake().accelerate().chargeBattery(90).accelerate();

//************* ******************* ****************//