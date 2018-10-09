function askFoo () {
  return new Promise(function (resolve, reject) {
    resolve('foo');
  });
}
    
function run (generator) {   
  let gen = generator();

  function handle(result) {
    if (result.done) return Promise.resolve(result.value);

    return Promise.resolve(result.value)
      .then((res) => handle(gen.next(res)),
        (err) => handle(gen.throw(err)));
  }

  try {
    handle(gen.next());
  } catch(ex) {
    return Promise.reject(ex);
  }      
}
    
run(function* () {
  let foo = yield askFoo();
  console.log(foo);
});