// imports
import {
  CalculatorKey,
  DigitKey,
  OperatorKey,
} from "./model/calculator_key.js";
import Operator from "./model/operator.js";
import parseKey from "./utils/keyboard_parse.js";

// html
const all_clear_button = document.querySelector(".calc-btn#all-clear");
const clear_button = document.querySelector(".calc-btn#clear");
const equals_button = document.querySelector(".calc-btn#equals");
const point_button = document.querySelector(".calc-btn#point");

const digit_buttons = document.querySelectorAll(".calc-btn.digit");
const operator_buttons = document.querySelectorAll(".calc-btn.operator");

// exports
export default function handleKeyboard(calc) {
  document.addEventListener("keydown", (event) => {
    updateVisual(event.key, true);
  });
  document.addEventListener("keyup", (event) => {
    updateVisual(event.key, false);
  });

  document.addEventListener("keypress", (event) => {
    event.preventDefault();
    const key = parseKey(event.key);
    switch (key.id) {
      // input
      case DigitKey.ID:
        calc.appendDigit(key.digit);
        break;
      case CalculatorKey.Point.id:
        calc.appendDecimal();
        break;

      // operators
      case OperatorKey.ID:
        calc.setOperator = new Operator(key.operator);
        break;

      // operations
      case CalculatorKey.Cl.id:
        calc.clear();
        break;
      case CalculatorKey.Ac.id:
        calc.allClear();
        break;
      case CalculatorKey.Eq.id:
        calc.calculate();
        break;
    }
  });
}

function updateVisual(event_key, state) {
  const key = parseKey(event_key);
  switch (key.id) {
    // input
    case DigitKey.ID:
      const digitBtn = Array.from(digit_buttons).find(
        (e) => e.innerHTML == key.digit
      );
      toggleVisual(digitBtn, state)
      break;
    case CalculatorKey.Point.id:
      toggleVisual(point_button, state);
      break;

    // operators
    case OperatorKey.ID:
      const operatorBtn = Array.from(operator_buttons).find(
        (e) => e.id == key.operator
      )
      toggleVisual(operatorBtn, state)
      break;

    // operations
    case CalculatorKey.Cl.id:
      toggleVisual(clear_button, state);
      break;
    case CalculatorKey.Ac.id:
      toggleVisual(all_clear_button, state);
      break;
    case CalculatorKey.Eq.id:
      toggleVisual(equals_button, state);
      break;
  }
}

function toggleVisual(btn, state) {
  if (state) {
    btn.classList.add("pressed");
  } else {
    btn.classList.remove("pressed");
  }
}
