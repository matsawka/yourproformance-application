class OldSyntax {
    constructor() {
        this.name = 'Mateusz';
        this.getGreeting = this.getGreeting.bind(this);
    }
    getGreeting() {
        return `Hi. My name is ${this.name}`;
    }
}
const oldSyntax = new OldSyntax();
const getGreeting = oldSyntax.getGreeting;
console.log((oldSyntax).getGreeting());
console.log(getGreeting()); // this would break without binding

// ---- new syntax with babel-transform-class-properties

class NewSyntax {
    name = 'Jen';
    getGreeting = () => {
        return `Hi. My name is ${this.name}`;
    }
}
const newSyntax = new NewSyntax();
console.log(newSyntax);

const newGetGreeting = newSyntax.getGreeting;
console.log(newGetGreeting());