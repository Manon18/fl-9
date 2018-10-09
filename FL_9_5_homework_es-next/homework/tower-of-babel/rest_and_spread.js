    var rawArgs = process.argv.slice(2);
    var args = [];
    
    rawArgs.forEach(val => {
      let commaSep = val.split(',');
      commaSep.forEach(val => {
        if(val !== '') args.push(+val);
      });
    });
    
    let avg = function(...args) {
      return args.reduce( (previousVal, nextVal) => (previousVal + nextVal)) / args.length;
    }

    console.log(avg(...args));