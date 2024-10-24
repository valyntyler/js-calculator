// imports
import Operator from "../../model/calculator/operator.js";

// html
const all_clear_button = document.querySelector(".calc-btn#all-clear");
const clear_button = document.querySelector(".calc-btn#clear");
const equals_button = document.querySelector(".calc-btn#equals");
const point_button = document.querySelector(".calc-btn#point");

const digit_buttons = document.querySelectorAll(".calc-btn.digit");
const operator_buttons = document.querySelectorAll(".calc-btn.operator");

// exports
export default function attachCallbacks(calc) {
  digit_buttons.forEach((btn) => {
    setButtonCallbacks(btn, () => {
      calc.appendDigit(btn.innerHTML);
    });
  });

  operator_buttons.forEach((element) => {
    setButtonCallbacks(element, () => {
      calc.setOperator = new Operator(element.id);
    });
  });

  setButtonCallbacks(point_button, () => {
    calc.appendDecimal();
  });

  setButtonCallbacks(clear_button, () => {
    calc.clear();
  });

  setButtonCallbacks(all_clear_button, () => {
    calc.allClear();
  });

  setButtonCallbacks(equals_button, () => {
    calc.calculate();
  });
}

function setButtonCallbacks(btn, onclick) {
  const toggleVisualOn = () => {
    btn.classList.add("pressed");
  };

  const toggleVisualOff = () => {
    btn.classList.remove("pressed");
  };

  btn.ontouchstart = toggleVisualOn;
  btn.ontouchend = toggleVisualOff;

  btn.onmousedown = toggleVisualOn;
  btn.onmouseup = toggleVisualOff;
  btn.onmouseout = toggleVisualOff;

  btn.onclick = onclick;
}
