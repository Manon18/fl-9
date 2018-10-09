function *factorial(n){
  let factorialNumRes = 1;
  for(let i = 1; i <= n; i++) {
    factorialNumRes *= i;
    yield factorialNumRes;
  }
}
    
for (var n of factorial(5)) {
  console.log(n)
}