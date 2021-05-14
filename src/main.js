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

function updateDisplay() {
  // select the element with class of `calculator-screen`
  const display = document.querySelector('.calculator-screen');
  // update the value of the element with the contents of `displayValue`
  display.value = calculator.displayValue
}

const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', (event) => {
   // Access the clicked element
  const target = event;

  // Check if the clicked element is a button.
  // If not, exit from the function
  if(!target.matches('button')) {
    return;
  }
})

// counter();
calculator();
