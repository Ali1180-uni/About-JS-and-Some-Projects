let sum = (a,b) => {return a + b}
let sub = (a,b) => {return a - b}
let mul = (a,b) => {return a * b}

const g = 9.8;
const PI = 3.14;

// module.exports = 123; //This Value is return when it is required by another file

//Also Create an object of all the values and pass it to it 

const obj = {
    sum: sum,
    sub: sub,
    mul: mul,
    g: g,
    PI: PI
};

module.exports = obj; // File Passed to another file by required keyword used in that file which import data