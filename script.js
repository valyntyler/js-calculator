import Calculator from "./src/Calculator.js";
import Operation from "./src/Operation.js";

// elements
const calc_form = document.querySelector("#calculator-form");

const first_number = document.querySelector("#first-number");
const second_number = document.querySelector("#second-number");
const operation_select = document.querySelector("#operation");

const number_buttons = document.querySelectorAll(".number-button");
const operator_buttons = document.querySelectorAll(".operator-button");
const c_button = document.querySelector("#clear");
const ac_button = document.querySelector("#all-clear");
const equals_button = document.querySelector("#equals");

// calculator object
const calc = new Calculator(
  (onchange = function () {
    first_number.value = calc.getFirstNumber;
    second_number.value = calc.getSecondNumber;
    operation_select.value = calc.getOperation?.operation;
  })
);

// callbacks
number_buttons.forEach((element) => {
  element.addEventListener("click", function () {
    calc.setFirstNumber = (calc.getFirstNumber ? calc.getFirstNumber : "") + element.innerHTML
  });
});

operator_buttons.forEach((element) => {
  element.addEventListener("click", function () {
    calc.setOperation = new Operation(element.name);
  });
});

ac_button.addEventListener("click", function () {
  console.log('cleared all')
  calc.setFirstNumber = null;
  calc.setSecondNumber = null;
  calc.setOperation = null;
});

window.addEventListener("load", function () {
  calc.parseUrl(window.location.search);
});
