var json = {
  "name": {
    "first": "Yosuke",
    "family": process.argv[2]
  },
  "birth": {
    "year": 1982,
    "month": 12,
    "day": process.argv[3]
  }
};
    
let newObj = {familyName: process.argv[2], birthDay: process.argv[3]};
let {familyName, birthDay} = newObj;
    
console.log(familyName);
console.log(birthDay);