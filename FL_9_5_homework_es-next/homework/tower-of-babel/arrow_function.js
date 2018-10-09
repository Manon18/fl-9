let inputs = process.argv.slice(2);
let result = inputs.map((value) => {return value[0].toUpperCase()})
.reduce((previousValue, nextValue) => {return previousValue += nextValue});

console.log(result);