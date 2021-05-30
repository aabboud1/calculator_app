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
  const { displayValue } = calculator;
   // Overwrite `displayValue` if the current value is '0' otherwise append to it
   calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
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
  const target = event;

  // Check if the clicked element is a button.
  // If not, exit from the function
  if(!target.matches('button')) {
    return;
  }
  //check if the button is an operator
  if(target.classList.contains('operator')) {
    console.log('operator', target.value)
  }
  //check if the button is a decimal
  if (target.classList.contains('decimal')) {
    inputDecimal(target.value);
    updateDisplay();
    return;
  }

  //check if button is clear all
  if (target.classList.contains('all-clear')) {
    console.log('clear', target.value);
    return;
  }

  inputDigit(target.value);
  updateDisplay();

})

function inputDecimal (dot) {
  //check
  if (!calculator.displayValue.includes(dot)) {
    //append the dot
    calculator.displayValue += dot;
  }
}

// counter();
calculator();
