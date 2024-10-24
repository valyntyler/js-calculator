// imports
import handle_menu from "./src/logic/menu/menu_logic.js";
import handle_calculator from "./src/logic/calculator/calculator_logic.js";
import generate_background from "./src/logic/background/bkg_scroll.js";

import Background from "./src/model/background/background.js";
import Calculator from "./src/model/calculator/calculator.js";
import Settings from "./src/model/menu/settings.js";
import Theme from "./src/model/menu/theme.js";

// html
const panel_screen = document.querySelector("#panel-screen");

const fst_number_element = document.querySelector("#crt-calc #fst-num");
const snd_number_element = document.querySelector("#crt-calc #snd-num");
const operator_element = document.querySelector("#crt-calc #operator");
const prev_calculation = document.querySelector("#prv-calc");

const bkg_scroll_element = document.querySelector("#scroll-container");

const div_zero_toggle = document.querySelector("#div-zero");
const bkg_scrl_toggle = document.querySelector("#bkg-scroll");

const root_element = document.querySelector("html");
const theme_selects = document.querySelectorAll("input[name=theme]")

const menu_element = document.querySelector(".menu")
const menu_button = document.querySelector("#menu-button")

// background
let bkg = new Background();
bkg.onchange = () => {
  if (bkg.isScrolling) bkg_scroll_element.classList.add("running");
  else bkg_scroll_element.classList.remove("running");
};

// calculator
let calc = new Calculator();
calc.onchange = () => {
  // update calculation
  fst_number_element.innerHTML = calc.getFirstNumber;
  snd_number_element.innerHTML = calc.getSecndNumber;
  operator_element.innerHTML = calc.getOperator.symbol;

  // update previous calculation
  const prev_calc = calc.getPreviousCalculation;
  const prev_calc_string = prev_calc != null ? prev_calc.toString() : "";
  prev_calculation.innerHTML = prev_calc_string;
};
calc.onfail = () => {
  // return if animation already playing
  if (panel_screen.getAnimations().length > 0) {
    return;
  }

  // toggle animation class
  panel_screen.classList.remove("error");
  panel_screen.offsetWidth;
  panel_screen.classList.add("error");
};

// settings
let settings = new Settings();
settings.onchange = () => {
  bkg.isScrolling = settings.isScrollAllowed;
  calc.isDivZeroAllowed = settings.isDivZeroAllowed;
};

div_zero_toggle.onclick = (e) => {
  settings.setIsDivZeroAllowed = e.target.checked;
};

bkg_scrl_toggle.onclick = (e) => {
  settings.setIsScrollAllowed = e.target.checked;
};

// themes
let theme = new Theme();
theme.onchange = () => {
  root_element.className = theme.id
  theme_selects.forEach(select => {
    select.checked = false
    if (select.value === theme.id) {
      select.checked = true
    }
  });
}

theme_selects.forEach((select) => {
  select.onclick = () => {
    theme.id = select.value
  };
});

// reload preferences
window.onload = () => {
  settings.fetchLocalStorage();
  theme.fetchLocalStorage();
};

handle_menu();
handle_calculator(calc);
generate_background();

// mobile
menu_button.onclick = () => {
  menu_element.classList.toggle("open")
}
