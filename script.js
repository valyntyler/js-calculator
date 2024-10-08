import Calculator from "./src/Calculator.js";
import Operator from "./src/Operator.js";

const fst_number_element = document.querySelector("#current-first-number");
const snd_number_element = document.querySelector("#current-second-number");
const operator_element = document.querySelector("#current-operator");

const prev_fst_number_element = document.querySelector(
  "#previous-first-number"
);
const prev_snd_number_element = document.querySelector(
  "#previous-second-number"
);
const prev_operator_element = document.querySelector("#previous-operation");
const prev_equals_element = document.querySelector("#previous-equals-sign");

let calc = new Calculator(
  () => {
    fst_number_element.innerHTML = calc.getFirstNumber;
    snd_number_element.innerHTML = calc.getSecndNumber;
    operator_element.innerHTML = calc.getOperator.symbol;
    // clear previous
    prev_fst_number_element.innerHTML = "";
    prev_snd_number_element.innerHTML = "";
    prev_operator_element.innerHTML = "";
    prev_equals_element.innerHTML = "";
  },
  (f, s, o) => {
    prev_fst_number_element.innerHTML = f;
    prev_snd_number_element.innerHTML = s;
    prev_operator_element.innerHTML = o.symbol;
    prev_equals_element.innerHTML = "=";
  }
);

document.addEventListener("keypress", (event) => {
  if (event.key.match(/\d/) != null) {
    calc.appendDigit(event.key);
  } else if (event.key.match(/\.|,/) != null) {
    calc.appendDecimal();
  } else if (event.key.match(/\+/) != null) {
    calc.setOperator = new Operator("add");
  } else if (event.key.match(/-/) != null) {
    calc.setOperator = new Operator("sub");
  } else if (event.key.match(/\*|x|X/) != null) {
    calc.setOperator = new Operator("mul");
  } else if (event.key.match(/\/|:/) != null) {
    calc.setOperator = new Operator("div");
  } else if (event.key.match(/=|Enter/) != null) {
    calc.calculate();
  } else if (event.key.match(/c/) != null) {
    calc.clear();
  } else if (event.key.match(/C|A/) != null) {
    calc.allClear();
  }
});

document.querySelectorAll(".number-button").forEach((element) => {
  element.addEventListener("click", () => {
    calc.appendDigit(element.innerHTML);
  });
});

document.querySelectorAll(".operator-button").forEach((element) => {
  element.addEventListener("click", () => {
    calc.setOperator = new Operator(element.id);
  });
});

document.querySelector("#decimal").addEventListener('click', () => {
  calc.appendDecimal();
});

document.querySelector("#clear").addEventListener("click", () => {
  calc.clear();
});

document.querySelector("#all-clear").addEventListener("click", () => {
  calc.allClear();
});

document.querySelector("#equals").addEventListener("click", () => {
  calc.calculate();
});
