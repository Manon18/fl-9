const max = process.argv[2];
let FizzBuzz = {
  [Symbol.iterator]() {
    let count = 1;
    return {
      next() {
        if(count > max) {
          return { done: true };
        }

        let number = count++;

        if (number % 3 === 0 && number % 5 === 0) {
            number = 'FizzBuzz';
        } else if (number % 5 === 0) {
            number = 'Buzz';
        } else if (number % 3 === 0) {
            number = 'Fizz';
        }

        return {done: false, value: number};
      }
    }
  }
}
    
for (let n of FizzBuzz) {
  console.log(n);
}