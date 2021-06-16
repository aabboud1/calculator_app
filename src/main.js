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
keys.addEventListener('click', (event) => {
   // Access the clicked element
  const {target} = event;
  const {value} = target;

  if (target.matches('button')) {
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
  }

  // Check if the clicked element is a button.
  // If not, exit from the function
  if(!target.matches('button')) {
    return;
  }
  //check if the button is an operator
  if(target.classList.contains('operator')) {
    handleOperator(target.value);
    updateDisplay();
    return;
  }
  //check if the button is a decimal
  if (target.classList.contains('decimal')) {
    inputDecimal(target.value);
    updateDisplay();
    return;
  }

  //check if button is clear all
  if (target.classList.contains('all-clear')) {
    resetCalculator();
    updateDisplay();    
    return;
  }

  inputDigit(target.value);
  updateDisplay();

})

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
