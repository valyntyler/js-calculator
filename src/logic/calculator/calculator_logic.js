// imports
import Calculator from "../../model/calculator/calculator.js";
import attachCallbacks from "./calculator_button_logic.js";
import handleKeyboard from "./calculator_keyboard_logic.js";

// html
const panel_screen = document.querySelector("#panel-screen");

const fst_number_element = document.querySelector("#crt-calc #fst-num");
const snd_number_element = document.querySelector("#crt-calc #snd-num");
const operator_element = document.querySelector("#crt-calc #operator");
const prev_calculation = document.querySelector("#prv-calc");

// exports
export default function handle_calculator() {
  const updateElements = () => {
    // update calculation
    fst_number_element.innerHTML = calc.getFirstNumber;
    snd_number_element.innerHTML = calc.getSecndNumber;
    operator_element.innerHTML = calc.getOperator.symbol;

    // update previous calculation
    const prev_calc = calc.getPreviousCalculation;
    const prev_calc_string = prev_calc != null ? prev_calc.toString() : "";
    prev_calculation.innerHTML = prev_calc_string;
  };

  // animate error when calculation fails
  const animateError = () => {
    // return if animation already playing
    if (panel_screen.getAnimations().length > 0) {
      return;
    }

    // toggle animation class
    panel_screen.classList.remove("error");
    panel_screen.offsetWidth;
    panel_screen.classList.add("error");
  };

  // calculator class encapsulates state and logic
  let calc = new Calculator(updateElements, animateError);

  // setup button callbacks
  attachCallbacks(calc);

  // handle keyboard input
  handleKeyboard(calc);
}
