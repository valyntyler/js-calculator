// imports
import handle_menu from "./src/logic/menu/menu_logic.js";
import handle_calculator from "./src/logic/calculator/calculator_logic.js";
import generate_background from "./src/logic/background/bkg_scroll.js";

import Background from "./src/model/background/background.js";
import Settings from "./src/model/menu/settings.js";

const bkg_scroll_element = document.querySelector("#scroll-container");
const div_zero_toggle = document.querySelector("#div-zero")
const bkg_scrl_toggle = document.querySelector("#bkg-scroll")

let bkg = new Background();
bkg.onchange = () => {
  if (bkg.isScrolling) bkg_scroll_element.classList.add("running");
  else bkg_scroll_element.classList.remove("running");
};

let settings = new Settings()
settings.onchange = () => {
    bkg.isScrolling = settings.isScrollAllowed
}

// settings
div_zero_toggle.onclick = e => {
    settings.setIsDivZeroAllowed = e.target.checked
}

bkg_scrl_toggle.onclick = e => {
    settings.setIsScrollAllowed = e.target.checked
}

window.onload = () => {
    settings.fetchLocalStorage()
}

handle_menu();
handle_calculator();
generate_background();

// function update_div_zero() {
//   calc.setIsDivZeroAllowed = div_zero_toggle.checked;
// }


// const div_zero_toggle = document.querySelector("#div-zero");
// const bkg_scroll_toggle = document.querySelector("#bkg-scroll");

// window.addEventListener("load", () => {
//   load_localstorage();
//   update_div_zero();
//   update_bkg_scroll();
// });

// div_zero_toggle.onchange = () => {
//   localStorage.setItem(DIV_ZERO_STRING, div_zero_toggle.checked);
//   update_div_zero();
// };

// bkg_scroll_toggle.onchange = () => {
//   localStorage.setItem(BKG_SCROLL_STRING, bkg_scroll_toggle.checked);
//   update_bkg_scroll();
// };

// // mobile
// document.querySelector(".hamburger-button").onclick = () => {
//   document.querySelector("#menu-wrapper").classList.toggle("open");
// };
