// imports
import Calculator from "./src/calculator.js";
import Operator from "./src/operator.js";
import { CalculatorKey, DigitKey, OperatorKey } from "./src/calculator_key.js";

// html elements
// =============

// operations
const fst_number_element = document.querySelector("#current-first-number");
const snd_number_element = document.querySelector("#current-second-number");
const operator_element = document.querySelector("#current-operator");
const prev_calculation = document.querySelector("#previous-calculation");

// calculator
const all_clear_button = document.querySelector(".calculator-button#all-clear");
const clear_button = document.querySelector(".calculator-button#clear");
const equals_button = document.querySelector(".calculator-button#equals");
const point_button = document.querySelector(".calculator-button#point");
const digit_buttons = document.querySelectorAll(".calculator-button.digit");
const operator_buttons = document.querySelectorAll(
  ".calculator-button.operator"
);

// menu
const dropdowns = document.querySelectorAll(".dropdown");

// scrolling background
const scroll_container = document.querySelector("#scroll-container");
const row_template = document.querySelector("#scroll-row-template");

// regex
// =====
const regex_digit = /\d/;
const regex_point = /\.|,/;

const regex_add = /\+/;
const regex_sub = /-/;
const regex_mul = /\*|x|X/;
const regex_div = /\/|:/;

const regex_eq = /=|Enter/;
const regex_cl = /c/;
const regex_ac = /C|A/;

// calculator class
// ================
let calc = new Calculator(
  (onchange = () => {
    fst_number_element.innerHTML = calc.getFirstNumber;
    snd_number_element.innerHTML = calc.getSecndNumber;
    operator_element.innerHTML = calc.getOperator.symbol;
    prev_calculation.innerHTML =
      calc.getPreviousCalculation != null
        ? calc.getPreviousCalculation.toString()
        : "";
  }),
  () => {
    play_error_shake();
  }
);

// callbacks
// =========

// take keyboard input
function parseKey(key) {
  switch (true) {
    // input
    case regex_digit.test(key):
      return new DigitKey(key);
    case regex_point.test(key):
      return CalculatorKey.Point;
    // operators
    case regex_add.test(key):
      return OperatorKey.Add;
    case regex_sub.test(key):
      return OperatorKey.Sub;
    case regex_mul.test(key):
      return OperatorKey.Mul;
    case regex_div.test(key):
      return OperatorKey.Div;
    // operations
    case regex_cl.test(key):
      return CalculatorKey.Cl;
    case regex_ac.test(key):
      return CalculatorKey.Ac;
    case regex_eq.test(key):
      return CalculatorKey.Eq;
  }
}

document.addEventListener("keydown", (event) => {
  event.preventDefault();
  const key = parseKey(event.key);
  switch (key.id) {
    // input
    case DigitKey.ID:
      let digit_btn = null;
      digit_buttons.forEach((element) => {
        if (element.innerHTML == key.digit) {
          digit_btn = element;
        }
      });
      digit_btn.classList.add("pressed")
      break;
    case CalculatorKey.Point.id:
      point_button.classList.add("pressed");
      break;
    // operators
    case OperatorKey.ID:
      let op_btn = null;
      operator_buttons.forEach((element) => {
        if (element.id == key.operator) {
          op_btn = element;
        }
      });
      op_btn.classList.add("pressed")
      break;
    // operations
    case CalculatorKey.Cl.id:
      clear_button.classList.add("pressed");
      break;
    case CalculatorKey.Ac.id:
      all_clear_button.classList.add("pressed");
      break;
    case CalculatorKey.Eq.id:
      equals_button.classList.add("pressed");
      break;
  }
});

document.addEventListener("keyup", (event) => {
  event.preventDefault();
  const key = parseKey(event.key);
  switch (key.id) {
    // input
    case DigitKey.ID:
      let digit_btn = null;
      digit_buttons.forEach((element) => {
        if (element.innerHTML == key.digit) {
          digit_btn = element;
        }
      });
      digit_btn.classList.remove("pressed")
      calc.appendDigit(key.digit);
      break;
    case CalculatorKey.Point.id:
      point_button.classList.remove("pressed");
      calc.appendDecimal();
      break;
    // operators
    case OperatorKey.ID:
      let op_btn = null;
      operator_buttons.forEach((element) => {
        if (element.id == key.operator) {
          op_btn = element;
        }
      });
      op_btn.classList.remove("pressed")
      calc.setOperator = new Operator(key.operator);
      break;
    // operations
    case CalculatorKey.Cl.id:
      clear_button.classList.remove("pressed");
      calc.clear();
      break;
    case CalculatorKey.Ac.id:
      all_clear_button.classList.remove("pressed");
      calc.allClear();
      break;
    case CalculatorKey.Eq.id:
      equals_button.classList.remove("pressed");
      calc.calculate();
      break;
  }
});

// take on-screen keypad input
// utility function
function setCalcBtnCallbacks(btnElement, onclick) {
  btnElement.onmousedown = () => {
    btnElement.classList.add("pressed");
  };
  btnElement.onmouseup = () => {
    btnElement.classList.remove("pressed");
  };
  btnElement.onmouseout = () => {
    btnElement.classList.remove("pressed");
  };
  btnElement.onclick = () => {
    onclick();
  };
}

// digit buttons
digit_buttons.forEach((element) => {
  setCalcBtnCallbacks(element, () => {
    calc.appendDigit(element.innerHTML);
  });
});

// operator buttons
operator_buttons.forEach((element) => {
  setCalcBtnCallbacks(element, () => {
    calc.setOperator = new Operator(element.id);
  });
});

// point button
setCalcBtnCallbacks(point_button, () => {
  calc.appendDecimal();
});

// clear button
setCalcBtnCallbacks(clear_button, () => {
  calc.clear();
});

// all clear button
setCalcBtnCallbacks(all_clear_button, () => {
  calc.allClear();
});

// equals button
setCalcBtnCallbacks(equals_button, () => {
  calc.calculate();
});

// handle menu buttons
document.onclick = (e) => {
  dropdowns.forEach((dropdown) => {
    if (e.target.closest(".dropdown") != dropdown) {
      dropdown.classList.remove("active");
    }
  });
};

document.querySelectorAll(".menu-button").forEach((element) => {
  element.onclick = () => {
    const dropdown = element.parentElement;
    dropdown.classList.toggle("active");
  };
});

const DIV_ZERO_STRING = "div_zero";
const BKG_SCROLL_STRING = "bkg_scroll";

function load_localstorage() {
  const div_zero_local = localStorage.getItem(DIV_ZERO_STRING);
  const bkg_scroll_local = localStorage.getItem(BKG_SCROLL_STRING);

  const isReduced =
    window.matchMedia(`(prefers-reduced-motion: reduce)`) === true ||
    window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;

  const default_div_zero = false;
  const default_bkg_scroll = !isReduced;

  div_zero_toggle.checked =
    div_zero_local === null ? default_div_zero : div_zero_local === "true";
  bkg_scroll_toggle.checked =
    bkg_scroll_local === null
      ? default_bkg_scroll
      : bkg_scroll_local === "true";

  update_bkg_scroll();
}

function update_div_zero() {
  calc.setIsDivZeroAllowed = div_zero_toggle.checked;
}

function update_bkg_scroll() {
  if (bkg_scroll_toggle.checked) {
    document.querySelector("#scroll-container").classList.add("running");
  } else {
    document.querySelector("#scroll-container").classList.remove("running");
  }
}

const div_zero_toggle = document.querySelector("#div-zero");
const bkg_scroll_toggle = document.querySelector("#bkg-scroll");

window.addEventListener("load", () => {
  load_localstorage();
  update_div_zero();
  update_bkg_scroll();
});

function play_error_shake() {
  const display = document.querySelector("#display");
  if (display.getAnimations().length > 0) {
    return;
  }

  display.classList.remove("shaking");
  display.offsetWidth;
  display.classList.add("shaking");
}

div_zero_toggle.onchange = () => {
  localStorage.setItem(DIV_ZERO_STRING, div_zero_toggle.checked);
  update_div_zero();
};

bkg_scroll_toggle.onchange = () => {
  localStorage.setItem(BKG_SCROLL_STRING, bkg_scroll_toggle.checked);
  update_bkg_scroll();
};

// mobile
document.querySelector(".hamburger-button").onclick = () => {
  document.querySelector("#menu-wrapper").classList.toggle("open");
};

// handle text scrolling

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
