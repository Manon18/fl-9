import '../styles/styles.css';
import { calculator } from './interface-module'

const calculatorForm = `<div class="main-container">    
<div class="container-calc">
  <input type="number" disabled name="user-numbers" id="numb">

  <div class="numbers">
    <div value="nine" type="button" class="style-numbers">9</div>
    <div value="eight" type="button" class="style-numbers">8</div>
    <div value="seven" type="button" class="style-numbers">7</div>
    <div value="six" type="button" class="style-numbers">6</div>
    <div value="five" type="button" class="style-numbers">5</div>
    <div value="four" type="button" class="style-numbers">4</div>
    <div value="three" type="button" class="style-numbers">3</div>
    <div value="two" type="button" class="style-numbers">2</div>
    <div value="one" type="button" class="style-numbers">1</div>
    <div value="zero" type="button" class="style-numbers">0</div>
  </div>

  <div class="operations">
    <div value="addition" type="button" class="style-operations">+</div>
    <div value="subtraction" type="button" class="style-operations">-</div>
    <div value="division" type="button" class="style-operations">/</div>
    <div value="multiplication" type="button" class="style-operations">*</div>
    <div value="point" id="clean" type="button" class="style-symbols">C</div>
    <div value="assign" type="button" class="style-assign">=</div>
  </div>
</div>
</div>`;

document.body.innerHTML = calculatorForm;

let numbers = document.getElementsByClassName('style-numbers');
let inputValue = document.getElementById('numb');
let operations = document.getElementsByClassName('style-operations');
let assign = document.getElementsByClassName('style-assign')[0];

inputValue.value = '0';

for (let i = 0; i < numbers.length; i++) {
  numbers[i].addEventListener('click', function() {
    inputValue.value = calculator.getNewValue(parseInt(numbers[i].innerText));
  });
}

for (let y = 0; y < operations.length; y++) {
  operations[y].addEventListener('click', function() {    
    calculator.setOperation(this.getAttribute('value'));
  });
}

assign.addEventListener('click', function() {  
  inputValue.value = calculator.calculateResult();
});

let clean = document.getElementById('clean');
clean.addEventListener('click', function() {
  calculator.clean();
  inputValue.value = calculator.getCurrentValue();
});