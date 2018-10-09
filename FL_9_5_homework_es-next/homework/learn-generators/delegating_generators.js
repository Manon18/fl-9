function *flat (arr) {
  if(Array.isArray(arr)) {
    let i = 0;
    while (i < arr.length) {
      yield *flat(arr[i]);
      i++;
    }
  } else {
    yield arr;
  }
}
    
let A = [1, [2, [3, 4], 5], 6];
for (var f of flat(A)) {
    console.log( f );
}