function *upper (items) {
  for (let it of items) {
    try {
      yield it.toUpperCase();
    } catch (err) {
      yield null, err;
    }
  }
}

let bad_items = ['a', 'B', 1, 'c'];
    
for (var item of upper(bad_items)) {
  console.log(item);
}