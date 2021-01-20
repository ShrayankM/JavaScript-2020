//************* Coding Challenge #1 ****************//

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

const bmw = new Car('Bmw M3 GTR', 120);
const merc = new Car('Mercedes AMG', 95);

bmw.accelerate();
bmw.accelerate();

merc.brake();

//************* ******************* ****************//

//************* Coding Challenge #2 ****************//

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

    get speedUS() {
        return `${this.speed/1.6} mi/hr`;
    }

    set speedUS(speed) {
        this.speed = speed * 1.6;
    }
}

const ford = new CarCl('Ford Mustang', 120);
ford.accelerate();

console.log(ford.speedUS);

ford.speedUS = 100;

ford.accelerate();
console.log(ford);

console.log(ford.speedUS);


ford.brake();
console.log(ford);


//************* ******************* ****************//