import Calculation from "./src/Calculator.js";
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

// callbacks
number_buttons.forEach((element) => {
  element.addEventListener("click", function () {
    console.log(element.innerHTML)
  });
});

operator_buttons.forEach((element) => {
  element.addEventListener("click", function () {
    console.log(element.name)
    calc.calculation.operation = new Operation(element.name)
    operation_select.value = element.name
  });
});

ac_button.addEventListener("click", function () {
  calc.setCalculation = new Calculation(0, 0, null);
});

window.addEventListener("load", function () {
  calc.setCalculation = Calculation.parseUrl(window.location.search);
});

class Calculator {
  constructor() {
    this.calculation = new Calculation(null, null, null);
  }

  get getCalculation() {
    return this.calculation;
  }

  set setCalculation(value) {
    this.calculation = value;
    this.updateValues();
  }

  updateValues() {
    first_number.value = this.calculation.first_number;
    second_number.value = this.calculation.second_number;
    operation_select.value = this.calculation.operation?.operation;
  }
}

const calc = new Calculator();
calc.updateValues();
