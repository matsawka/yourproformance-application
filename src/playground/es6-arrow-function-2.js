// arguments objects - no longer bound with arrow functions

const add = (a, b) => {
    //console.log(arguments);
    return a + b;
}
console.log(add(55,1, 1001));

// this keyword - no longer bound with arrow functions

const user = {
    name: 'Mateusz',
    cities: ['San Francisco','New York', 'Dublin'],
    printPlacesLived: function() {
        //const that = this; ES5
        console.log(this.name);
        console.log(this.cities);
    
       /* ES5
       this.cities.forEach(function(city){
           console.log(that.name + ' has lived in ' + city);
       });*/

       this.cities.forEach((city) => {
           console.log(this.name + ' has lived in ' + city);
       });
    },
    printPlacesLivedShort() { //ES
        return this.cities.map((city) => this.name + ' has lived in ' + city);
        
/*
       this.cities.forEach((city) => {
           console.log(this.name + ' has lived in ' + city);
       });*/
    }
};
user.printPlacesLived();
user.printPlacesLivedShort();
console.log(user.printPlacesLivedShort());

//Challenge area:

const multiplier = {
    numbers : [1,2,3],
    multiplyBy : 2,
    multiply() {
        return this.numbers.map((number) => number * this.multiplyBy);

    }
    //numbers - array of numbers
    //multiplyBy  - single number
    //multiply - return a new array where the numbers have been multipled
    //[1,2,3] x 2 = [2,4,6]
};

console.log(multiplier.multiply());