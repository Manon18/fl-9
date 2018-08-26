function closestToZero(args) {
  let minNum = arguments[0];

  for (let y = 1; y < arguments.length; y++) {
    if (Math.abs(arguments[y]) < Math.abs(minNum)) {
      minNum = arguments[y];
    }
  }

  return minNum;
}
