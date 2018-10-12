
// Car - make, model, vin, getDescription(),

class Person {
    constructor(name = 'guest', age = 0) {
        this.name = name;
        this.age = age;
    }
    getGreeting() {
       // return  'Hi. I am ' + this.name  +'!';
       return `Hi. I am ${this.name}!`;
    }
    getDescription() {
        return `${this.name} is ${this.age} year(s) old.`
    }
}

class Student extends Person {
    constructor(name, age, major)  {
        super(name, age); //passing in defaults
        this.major = major;
    }
    hasMajor() {
        return !!this.major; //double flip from fasley -> true -> false
    }
    getDescription() { //over righting from Person
        let description = super.getDescription();
        if(this.hasMajor()) {
            description += ` Their major is  ${this.major}.`;
        }
        return description;
    }
}
class Traveler extends Person {
    constructor(name, age, home) {
        super(name, age);
        this.home = home;
    }
    hasHome() {
        return !!this.home;
    }
    getGreeting() {
        let greeting = super.getGreeting();
        if(this.hasHome()) {
            greeting += `. I am from ${this.home}`;
        }
        return greeting;
    }
}

const me = new Traveler('Mateusz Sawka', 38, 'San Francisco');
console.log(me.getGreeting());

const other = new Traveler();
console.log(other.getGreeting());