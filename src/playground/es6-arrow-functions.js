const square = function(x){
    return x * x;
};
console.log('sq', square(8));

function squared(x){
    return x * x;
};
console.log('squared', squared(8));


//const squareArrow = (x) => {
//    return x * x;
//}; 
// same as -->
const squareArrow = (x) => x * x;


console.log('squareArrow', squareArrow(19));


const getFirstName = (name) => {
    return name.split(' ')[0];
}
const getFirstNameShort = (name) => name.split(' ')[0];

console.log('getFirstName:', getFirstName('Mateusz Sawka'));
console.log('getFirstNameShort:', getFirstNameShort('Mateusz Sawka'));