import Calculator from "./src/Calculator.js";
import Operation from "./src/Operation.js";

// elements
const calc_form = document.querySelector("#calculator-form");

const prev_first_number = document.querySelector("#previous-first-number");
const prev_second_number = document.querySelector("#previous-second-number");
const prev_operation = document.querySelector("#previous-operation");

const first_number = document.querySelector("#first-number");
const second_number = document.querySelector("#second-number");
const operation_select = document.querySelector("#operation");

const number_buttons = document.querySelectorAll(".number-button");
const operator_buttons = document.querySelectorAll(".operator-button");
const c_button = document.querySelector("#clear");
const ac_button = document.querySelector("#all-clear");
const equals_button = document.querySelector("#equals");

// calculator objects;
const prev = new Calculator(
  (onchange = function () {
    prev_first_number.innerHTML = prev.getFirstNumber;
    prev_second_number.innerHTML = prev.getSecondNumber;
    prev_operation.innerHTML = prev.getOperation?.symbol();
  })
);

const calc = new Calculator(
  (onchange = function () {
    first_number.value = calc.getFirstNumber;
    second_number.value = calc.getSecondNumber;
    operation_select.value = calc.getOperation?.operation;
  })
)

// callbacks
first_number.addEventListener('input', function(event) {
  event.preventDefault()
  calc.setFirstNumber = first_number.value
})

second_number.addEventListener('input', function(event) {
  event.preventDefault()
  calc.setSecondNumber = second_number.value
})

operation_select.addEventListener('input', function(event) {
  calc.setOperation = new Operation(operation_select.value)
})

number_buttons.forEach((element) => {
  element.addEventListener("click", function () {
    if (calc.getOperation?.operation == null) {
      calc.setFirstNumber =
        (calc.getFirstNumber ? calc.getFirstNumber : "") + element.innerHTML;
    } else {
      calc.setSecondNumber =
        (calc.getSecondNumber ? calc.getSecondNumber : "") + element.innerHTML;
    }
  });
});

operator_buttons.forEach((element) => {
  element.addEventListener("click", function () {
    calc.setOperation = new Operation(element.name);
  });
});

c_button.addEventListener("click", function () {
  if (calc.getSecondNumber != null) {
    console.log('cleared second');
    calc.setSecondNumber = null;
  } else if (calc.getOperation.operation != null) {
    calc.setOperation = new Operation(null);
  } else if (calc.getFirstNumber != null) {
    calc.setFirstNumber = null;
  }
});

ac_button.addEventListener("click", function () {
  calc.setFirstNumber = null;
  calc.setSecondNumber = null;
  calc.setOperation = new Operation(null);
});

window.addEventListener("load", function () {
  prev.parseUrl(window.location.search);
  calc.setFirstNumber = prev.calculate()
  calc.setSecondNumber = null
  calc.setOperation = new Operation(null)
});
