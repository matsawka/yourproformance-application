var nameVar = 'Mateusz';
nameVar = 'Sawka';
console.log('nameVar', nameVar);

let nameLet = 'Jen';
//let nameLet = 'Julie';
nameLet = 'Julie';
console.log('nameLet', nameLet);

const nameConst = 'Frank';
//nameConst = 'Gunther';
console.log('nameConst', nameConst);

// Block scoping

const fullName = 'May Sawka';
let firstName = '';
if(fullName) {
    firstName = fullName.split(' ')[0];
    console.log(firstName);
}
console.log(firstName);