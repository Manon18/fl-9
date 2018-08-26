function getMin() {
  let minimumNumber = arguments[0];

  for (let y = 0; y < arguments.length; y++) {
    if (minimumNumber > arguments[y]) {
      minimumNumber = arguments[y];
    }
  }

  return minimumNumber;
}
