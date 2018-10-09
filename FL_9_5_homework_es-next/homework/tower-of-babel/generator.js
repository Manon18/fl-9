const max = process.argv[2];

let FizzBuzz = function* (){
  let count = 1;

  while (count <= max) {
    let number = count;
    count++;

    if (number % 3 === 0 && number % 5 === 0) {
        number = 'FizzBuzz';
    } else if (number % 5 === 0) {
        number = 'Buzz';
    } else if (number % 3 === 0) {
        number = 'Fizz';
    }
    yield number;
  }
}();
    
for (let n of FizzBuzz) {
  console.log(n);
}