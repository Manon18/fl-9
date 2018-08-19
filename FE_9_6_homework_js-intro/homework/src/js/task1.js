let userMoney = +prompt('Price');
let userDiscount = +prompt('Discount');
const floatPrecision = 2;
const maxPercentage = 100;

let saved = userMoney * userDiscount / maxPercentage;
let priceWithDiscount = userMoney - saved;

let resPriceWithoutDiscount = 'Price without discount: ' + +userMoney.toFixed(floatPrecision) + '\n';
let resDiscount = 'Discount: ' + +userDiscount.toFixed(floatPrecision) + '%' + '\n';
let resPriceWithDiscount = 'Price with discount: ' + +priceWithDiscount.toFixed(floatPrecision) + '\n';
let resSaved = 'Saved: ' + +saved.toFixed(floatPrecision);

let sumOptions = resPriceWithoutDiscount + resDiscount + resPriceWithDiscount + resSaved;

let res = '';

function validateMoney(money) {
  const minMoney = 0;
  return !isNaN(money) && money >= minMoney;
}

function validateDiscount(discount) {
  const minDiscount = 0;
  const maxDicount = 100;
  return !isNaN(discount) && discount >= minDiscount && discount <= maxDicount;
}

if(validateMoney(userMoney) && validateDiscount(userDiscount)) {
  res = sumOptions;
} else {
  res = 'Invalid data';
}

console.log(res);
