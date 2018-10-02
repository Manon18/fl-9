function Product(productSettings) {
  let _placedInCartName;
  let _logs = [];
  let _priceOfProduct = productSettings.price;
  
  function getPrice() {
    return _priceOfProduct;
  }

  function setPrice(newPrice) {
    if (isNaN(newPrice) || !isFinite(newPrice)) {
      console.log('Invalid price' + newPrice);
      return this;
    }

    if (newPrice > _priceOfProduct) {
      let setPriceLog = `change price from ${newPrice} to ${_priceOfProduct}`;
      _priceOfProduct = newPrice;
      _logs.push(setPriceLog);
    } else {
      let setPriceHistoryLog = `try to change price from ${_priceOfProduct} to ${newPrice}`;
      _logs.push(setPriceHistoryLog);
    }

    return this;
  }

  function add(newCartName) {
    _placedInCartName = newCartName;
    let dateCart = new Date();

    let historyLogToAdd = `${productSettings.name} is added to ${newCartName} on ${dateCart}`;
    _logs.push(historyLogToAdd);

    return this;
  }

  function removeProduct() {
    _placedInCartName = '';
    let dateCartRemove = new Date();

    let removeProductLog = `${productSettings.name} was removed from ${_placedInCartName} on ${dateCartRemove}`;
    _logs.push(removeProductLog);

    return this;
  }

  function getHistory() {
    return _logs;
  }

  return {
    getPrice: getPrice,
    setPrice: setPrice,
    add: add,
    removeProduct: removeProduct,
    getHistory: getHistory,
    name: productSettings.name,
    description: productSettings.description
  }
}

function ShoppingCart(shoppingCartSettings) {
  let cartProducts = [];
  let _logs = [];
  let dateShopingCart = new Date();
  let historyLogCreate = `${shoppingCartSettings.name} was created in ${dateShopingCart}`;
  _logs.push(historyLogCreate);

  function addNewProduct(product) {
    if (typeof product !== 'object') {
      console.log('Please, try to add product instance.');
      return this;
    }

    if (cartProducts.length >= shoppingCartSettings.maxCount) {
      let min = cartProducts[0].getPrice();

      for (let i = 1; i < cartProducts.length; i++) {
        if(cartProducts[i] < min) {
          min = cartProducts[i];
        }
      }

      cartProducts.splice(min, 1);
    }
    let dateOdAddingToCart = new Date();
    product.add(shoppingCartSettings.name);

    cartProducts.push(product);
    let historyLogAdd = `${product.name} was added to ${shoppingCartSettings.name} on ${dateOdAddingToCart}`;
    _logs.push(historyLogAdd);

    return this;
  }

  function removeProduct(id) {
    let productRemove = cartProducts[id];
    let dateRemoveFromShoppingCart = new Date();
    let historyLogRemove = `${productRemove.name} was removed from ${shoppingCartSettings.name} on \
    ${dateRemoveFromShoppingCart}`;

    productRemove.removeProduct();
    cartProducts.splice(id, 1);
    _logs.push(historyLogRemove);

    return this;
  }

  function getAvaragePrice() {
    let sum = 0;
    for (let i = 0; i < cartProducts.length; i++) {
      sum += cartProducts[i].getPrice();
    }
    let average = sum / cartProducts.length;
    return average;
  }

  function getProducts() {
    return cartProducts;
  }

  function getFormattedListOfProducts() {
    let dateNow = new Date();
    let formattedList = cartProducts.map(function(value) {
      return `${value.name} - is on ${shoppingCartSettings.name} from ${dateNow} description: \
      ${JSON.stringify(value.description)}`;

    });

    return formattedList;
  }

  function getTotalPrice() {
    let totalPrice = 0;
    for (let i = 0; i < cartProducts.length; i++) {
      totalPrice += cartProducts[i].getPrice();
    }
    return totalPrice;
  }

  function getHistory() {
    return _logs;
  }

  return {
    addNewProduct,
    removeProduct,
    getAvaragePrice,
    getProducts,
    getFormattedListOfProducts,
    getTotalPrice,
    getHistory
  }
}

const papaya = new Product({
  name: 'papaya',
  description: {
    color: 'yellow',
    size: 'medium'
  },
  price: 35
});

const coconut = new Product({
  name: 'coconut',
  description: {
    color: 'white',
    size: 'small'
  },
  price: 20
});

const vasyaShopCart = new ShoppingCart({
  name: 'vasyasCart',
  owner: 'Vasya',
  maxSize: 5
});

vasyaShopCart
  .addNewProduct(papaya)
  .addNewProduct(papaya)
  .addNewProduct(coconut)
  .removeProduct(1)
  .addNewProduct(papaya);

console.log(vasyaShopCart.getHistory());
console.log(papaya.getHistory());
console.log('average price:', vasyaShopCart.getTotalPrice());

vasyaShopCart
  .addNewProduct('apple string');

coconut
  .setPrice(10)
  .setPrice(100);

console.log(coconut.getHistory());

console.table(vasyaShopCart.getFormattedListOfProducts());
