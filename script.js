// imports
import Calculator from "./src/calculator.js";
import Operator from "./src/operator.js";

// html elements
const fst_number_element = document.querySelector("#current-first-number");
const snd_number_element = document.querySelector("#current-second-number");
const operator_element = document.querySelector("#current-operator");
const prev_calculation = document.querySelector("#previous-calculation");

const all_clear_button = document.querySelector(".calculator-button#all-clear");
const clear_button = document.querySelector(".calculator-button#clear");
const equals_button = document.querySelector(".calculator-button#equals");
const point_button = document.querySelector(".calculator-button#point");
const digit_buttons = document.querySelectorAll(".calculator-button.digit");
const operator_buttons = document.querySelectorAll(
  ".calculator-button.operator"
);

const dropdowns = document.querySelectorAll(".dropdown");

// calculator class
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
document.addEventListener("keypress", (event) => {
  event.preventDefault();
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

// take on-screen keypad input
// digit buttons
digit_buttons.forEach((digit_button) => {
  digit_button.onmousedown = () => {
    digit_button.classList.add("pressed");
  };
  digit_button.onmouseup = () => {
    digit_button.classList.remove("pressed");
  };
  digit_button.onclick = () => {
    calc.appendDigit(digit_button.innerHTML);
  };
});

// operator buttons
operator_buttons.forEach((operator_button) => {
  operator_button.onmousedown = () => {
    operator_button.classList.add("pressed");
  };
  operator_button.onmouseup = () => {
    operator_button.classList.remove("pressed");
  };
  operator_button.onclick = () => {
    calc.setOperator = new Operator(operator_button.id);
  };
});

// point button
point_button.onmousedown = () => {
  point_button.classList.add("pressed");
};
point_button.onmouseup = () => {
  point_button.classList.remove("pressed");
};
point_button.onclick = () => {
  calc.appendDecimal();
};

// clear button
clear_button.onmousedown = () => {
  clear_button.classList.add("pressed");
};
clear_button.onmouseup = () => {
  clear_button.classList.remove("pressed");
};
clear_button.onclick = () => {
  calc.clear();
};

// all clear button
all_clear_button.onmousedown = () => {
  all_clear_button.classList.add("pressed");
};
all_clear_button.onmouseup = () => {
  all_clear_button.classList.remove("pressed");
};
all_clear_button.onclick = () => {
  calc.allClear();
};

// equals button
equals_button.onmousedown = () => {
  equals_button.classList.add("pressed");
};
equals_button.onmouseup = () => {
  equals_button.classList.remove("pressed");
};
equals_button.onclick = () => {
  calc.calculate();
};

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
