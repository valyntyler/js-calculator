import Calculator from "./src/calculator.js";
import Operator from "./src/operator.js";

const fst_number_element = document.querySelector("#current-first-number");
const snd_number_element = document.querySelector("#current-second-number");
const operator_element = document.querySelector("#current-operator");
const prev_calculation = document.querySelector("#previous-calculation");

let calc = new Calculator(() => {
  fst_number_element.innerHTML = calc.getFirstNumber;
  snd_number_element.innerHTML = calc.getSecndNumber;
  operator_element.innerHTML = calc.getOperator.symbol;
  prev_calculation.innerHTML =
    calc.getPreviousCalculation != null
      ? calc.getPreviousCalculation.toString()
      : "";
});

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

document.querySelector("#decimal").addEventListener("click", () => {
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

// handle menu buttons
document.querySelectorAll("#scroll-container-wrapper, #calculator").forEach(element => {
  element.onmousedown = () => {
    document.querySelectorAll(".dropdown").forEach(dd => {
      dd.classList.remove("active")
    });
  }
});

document.querySelectorAll(".menu-button").forEach((element) => {
  element.onclick = () => {
    const dropdown = element.parentElement;
    dropdown.classList.toggle("active");
  };
});

// handle text scrolling
const scroll_container = document.querySelector("#scroll-container");
const row_template = document.querySelector("#scroll-row-template");

for (let i = 0; i < 64; i++) {
  const row_instance = row_template.content.cloneNode(true);
  scroll_container.appendChild(row_instance);
}

document.querySelectorAll(".scroll-row").forEach((element) => {
  const ul_template = document.querySelector("#scroll-ul-template");
  for (let i = 0; i < 2; i++) {
    const ul_instance = ul_template.content.cloneNode(true);
    element.appendChild(ul_instance);
  }
});

document.querySelectorAll(".scroll-row ul").forEach((element) => {
  const li_template = document.querySelector("#scroll-li-template");
  for (let i = 0; i < 64; i++) {
    const li_instance = li_template.content.cloneNode(true);
    element.appendChild(li_instance);
  }
});
