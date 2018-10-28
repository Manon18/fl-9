function nightTime() {
  let currentdate = new Date();
  let getTime = currentdate.getHours();
  let beginOfNight = 23;
  let endOfNight = 6;

  if (getTime >= beginOfNight && getTime <= endOfNight) {
    return true;
  }

  return false;
}

function weekend() {
  let today = new Date();

  if (today.getDay() === 0 || today.getDay() === 6) {
    return true;
  }

  return false;
}

class Store {
 
  pizzaSlicePrice(number) {
    this._pizzaSlicePrice = number;
  } 

  weekendDiscount(number) {
    this._weekendDiscount = number;
  }

  nightDiscount(number) {
    this._nightDiscount = number;
  }

  bonus(number) {
    this._bonus = number;
  }

  getDiscount() {
    return 0;
  }

  buyPizzaSlice() {
    let priceAfterDiscount = this.getPriceAfterDiscount();

    return `Price after discount is ${priceAfterDiscount} and you have ${this._bonus} bonuses`;
  }

  getPriceAfterDiscount() {
    let discount = this.getDiscount();
    let priceAfterDiscount = this._pizzaSlicePrice - this._pizzaSlicePrice * discount;

    return priceAfterDiscount;
  }
}

function getDiscount(store) {
  store.getDiscount = function() {
    let discount = 0;

    if (nightTime()) {
      discount += this._nightDiscount;
    }

    if (weekend()) {
      discount += this._weekendDiscount;
    }

    return discount;
  };
}

function setBonus(store) {
  store.bonus = function(number) {
    let bonusRate = 10;
    let additionBonuses = this.getPriceAfterDiscount() / bonusRate;
    this._bonus = additionBonuses + number;
  };
}

let store = new Store();
store.pizzaSlicePrice(100);
store.nightDiscount(0.3);
store.weekendDiscount(0.1);
store.bonus(3);

console.log(store.buyPizzaSlice());

getDiscount(store);
setBonus(store);
store.bonus(5);

console.log(store.buyPizzaSlice());
