import Calculator from "./src/Calculator.js";
import Operation from "./src/Operation.js";

const fst_number = document.querySelector('#current-first-number')
const snd_number = document.querySelector('#current-second-number')

document.addEventListener("keypress", (event) => {
  if (event.key.match(/\d/) != null) {
    console.log('pressed digit');
    fst_number.innerHTML += event.key
  } else if (event.key.match(/\.|,/) != null) {
    console.log('pressed .');
  } else if (event.key.match(/\+/) != null) {
    console.log('pressed +');
  } else if (event.key.match(/-/) != null) {
    console.log('pressed -');
  } else if (event.key.match(/\*|x|X/) != null) {
    console.log('pressed ×');
  } else if (event.key.match(/\/|:/) != null) {
    console.log('pressed ÷');
  } else if (event.key.match(/=/) != null) {
    console.log('pressed =');
  } else if (event.key.match(/c/) != null) {
    console.log('pressed C');
  } else if (event.key.match(/C|A/) != null) {
    console.log('pressed AC');
  } 
});

document.querySelectorAll(".number-button").forEach((element) => {
  element.addEventListener("click", () => {
    console.log(element.innerHTML);
  });
});
