function reverseNumber(number) {
  let numberString = number.toString();
  let reversedNumber = '';

  if (numberString.charAt(0) === '-') {
    reversedNumber = '-' + 
    numberString
      .substring(1)
      .split('')
      .reverse()
      .join('');

    return +reversedNumber;
  }

  reversedNumber = numberString
    .split('')
    .reverse()
    .join('');

  return +reversedNumber;
}
