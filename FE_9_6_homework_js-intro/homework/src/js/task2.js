let oneSide = +prompt('First side');
let twoSide = +prompt('Secont side');
let angle = +prompt('Angle');
const pNumber = 180;
const floatPrecision = 2;

let angleC = Math.PI / pNumber * angle;
let thirdSide = Math.sqrt(oneSide * oneSide + twoSide * twoSide - 2 * oneSide * twoSide * Math.cos(angleC));

let perimeter = oneSide + twoSide + thirdSide;

let perSquare = perimeter / 2;
let square = Math.sqrt(perSquare * ((perSquare - oneSide) * (perSquare - twoSide) * (perSquare - thirdSide)));

let resOne = 'c length: ' + +thirdSide.toFixed(floatPrecision) + '\n';
let resTwo = 'Triangle square: ' + +square.toFixed(floatPrecision) + '\n';
let resThree = 'Triangle perimeter: ' + +perimeter.toFixed(floatPrecision) + '\n';

let sumRes = resOne + resTwo + resThree;

let outputData = '';
const minLength = 0;
const minDegree = 0;

if(isNaN(oneSide) || isNaN(twoSide) || isNaN(thirdSide)
  || oneSide <= minLength || twoSide <= minLength || angle <= minDegree
  || perimeter === 0 || square === 0 || thirdSide === 0
  || +perimeter.toFixed(floatPrecision) === 0 
  || +square.toFixed(floatPrecision) === 0
  || +thirdSide.toFixed(floatPrecision) === 0) {
  outputData = 'Invalid data';
} else {
  outputData = sumRes;
}

console.log(outputData);
