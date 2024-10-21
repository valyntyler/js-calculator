// imports
import attachCallbacks from "./calculator_button_logic.js";
import handleKeyboard from "./calculator_keyboard_logic.js";

// exports
export default function handle_calculator(calc) {
  // setup button callbacks
  attachCallbacks(calc);

  // handle keyboard input
  handleKeyboard(calc);
}
