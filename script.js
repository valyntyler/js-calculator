// imports
import handle_menu from "./src/logic/menu/menu_logic.js";
import handle_calculator from "./src/logic/calculator/calculator_logic.js";
import generate_background from "./src/logic/background/bkg_scroll.js";

handle_menu();
handle_calculator();
generate_background();







// const DIV_ZERO_STRING = "div_zero";
// const BKG_SCROLL_STRING = "bkg_scroll";

// function load_localstorage() {
//   const div_zero_local = localStorage.getItem(DIV_ZERO_STRING);
//   const bkg_scroll_local = localStorage.getItem(BKG_SCROLL_STRING);

//   const isReduced =
//     window.matchMedia(`(prefers-reduced-motion: reduce)`) === true ||
//     window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;

//   const default_div_zero = false;
//   const default_bkg_scroll = !isReduced;

//   div_zero_toggle.checked =
//     div_zero_local === null ? default_div_zero : div_zero_local === "true";
//   bkg_scroll_toggle.checked =
//     bkg_scroll_local === null
//       ? default_bkg_scroll
//       : bkg_scroll_local === "true";

//   update_bkg_scroll();
// }

// function update_div_zero() {
//   calc.setIsDivZeroAllowed = div_zero_toggle.checked;
// }

// function update_bkg_scroll() {
//   if (bkg_scroll_toggle.checked) {
//     document.querySelector("#scroll-container").classList.add("running");
//   } else {
//     document.querySelector("#scroll-container").classList.remove("running");
//   }
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
