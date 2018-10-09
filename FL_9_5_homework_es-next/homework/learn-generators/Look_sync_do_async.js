let fs = require('fs');
    
function run (generator) {
  let it = generator(go);

  function go (e, res) {
    if (e) {
      return it.throw(e);
    } else {
      it.next(res);
    }
  }

  go();
}
    
run(function* (done) {
  let firstFile;

  try {
    let dirFiles = yield fs.readdir('NoNoNoNo', done);
    firstFile = dirFiles[0];
  } catch (e) {
    firstFile = null;
  }
    
  console.log(firstFile);
});