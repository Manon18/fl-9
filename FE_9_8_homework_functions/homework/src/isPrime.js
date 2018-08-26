function isPrime(number) {
  let minNumOne = 1;
  let minNumTwo = 2;
  let fromSecondNum = 2;

  if (number === minNumOne) {
    return false;
  } else if (number === minNumTwo) {
    return true;
  }

  for (let i = fromSecondNum; i < number; i++) {

    if (number % i !== 0) {
      return true;
    }
    return false;
  }
}
