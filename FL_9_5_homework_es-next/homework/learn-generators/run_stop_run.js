function *range(from, to) {
  for(; from <= to;) {
    yield from++;
  }
}
    
for (var r of range(5, 10)) {
    console.log( r );
}