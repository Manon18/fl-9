let arg1 = process.argv[2];
let arg2 = process.argv[3];
    
import Modules from './modules_default_export_math';
console.log(Modules.PI);
console.log(Modules.sqrt(+arg1));
console.log(Modules.square(+arg2));