console.log('person.js');

const isAdult = (age) =>  (age >=18) ? "true" : "false";

const canDrink = (age) => {
    return (age >=21) ? "true" : "false";
}
const isSenior = (age) => {
    return (age >=65) ? "true" : "false";
}
export { isAdult, canDrink, isSenior as default};