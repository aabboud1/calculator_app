'use strict';

function counter() {
  let seconds = 0;
  setInterval(() => {
    seconds += 1;
    document.getElementById('app').innerHTML = `<p>It has taken you ${seconds} seconds to solve this problem.</p>`;
  }, 1000);
}

const calculator = {
  // holds a string value that represents the input of the user or the result of an operation
  displayValue: '0',
  // will store the first operand for any expression
  firstOperand: null,
  // will store the operator for an expression
  waitingForSecondOperand: false,
  // way to check if both the first operand and the operator have been inputted.
  operator: null,
};

function inputDigit(digit) {
  const { displayValue, waitingForSecondOperand } = calculator;
  
  if(waitingForSecondOperand === true ) {
    calculator.displayValue = digit;
    calculator.waitingForSecondOperand = false;
  }
  else{
    calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
  }
  console.log(calculator)
}


function handleOperator (nextOperator) {
  // Destructureing the properties on the calculator object
  const {firstOperand, displayValue, operator} = calculator
  
  //parseFloat is used to string to floating number we are converting displayValue
  const inputValue = parseFloat(displayValue);

  if (operator && calculator.waitingForSecondOperand)  {
    calculator.operator = nextOperator;
    console.log(calculator);
    return;
  }
  //Check to see if first op and is null and inputval is not a NAN value
  if (firstOperand === null && !isNaN(inputValue)) {
    //used to updated firstOperand property
    calculator.firstOperand = inputValue;
  }else if (operator) {
    const result = calculate(firstOperand, inputValue, operator);
    calculator.displayValue = String(result);
    calculator.firstOperand = result;
  }
  
  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;
}

function calcuate (firstOperand, secondOperand, operator) {
  if (operator === '+') {
    return firstOperand + secondOperand;
  }else if (operator === '-') {
    return firstOperand - secondOperand;
  }else if (operator === '*') {
    return firstOperand * secondOperand;
  }else if (operator === '/') {
    return firstOperand / secondOperand;
  }
  return secondOperand
}

function resetCalculator() {
  calculator.displayValue = '0';
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
  console.log(calculator);
}

function updateDisplay() {
  // select the element with class of `calculator-screen`
  const display = document.querySelector('.calculator-screen');
  // update the value of the element with the contents of `displayValue`
  display.value = calculator.displayValue
}

updateDisplay();

const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', event => {
  const { target } = event;
  const { value } = target;
  if (!target.matches('button')) {
    return;
  }

  switch (value) {
    case '+':
    case '-':
    case '*':
    case '/':
    case '=':
      handleOperator(value);
      break;
    case '.':
      inputDecimal(value);
      break;
    case 'all-clear':
      resetCalculator();
      break;
    default:
      // check if the key is an integer
      if (Number.isInteger(parseFloat(value))) {
        inputDigit(value);
      }
  }

  updateDisplay();
});

function inputDecimal (dot) {
  if(calculator.waitingForSecondOperand === true) {
    calculator.displayValue = '0.'
    calculator.waitingForSecondOperand = false;
    return
  }
  //check
  if (!calculator.displayValue.includes(dot)) {
    //append the dot
    calculator.displayValue += dot;
  }
}


// counter();
calculator();
