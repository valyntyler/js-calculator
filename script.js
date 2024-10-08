import Calculator from "./src/Calculator.js";
import Operation from "./src/Operation.js";

document.addEventListener("keypress", (event) => {
  if (event.key.match(/\d/) != null) {
    console.log('pressed digit', event.key);
  } else if (event.key.match(/\+/) != null) {
    console.log('pressed +');
  } else if (event.key.match(/-/) != null) {
    console.log('pressed -');
  } else if (event.key.match(/\*|x|X/) != null) {
    console.log('pressed ×');
  } else if (event.key.match(/\/|:/) != null) {
    console.log('pressed ÷');
  } 
});

document.querySelectorAll(".number-button").forEach((element) => {
  element.addEventListener("click", () => {
    console.log(element.innerHTML);
  });
});
