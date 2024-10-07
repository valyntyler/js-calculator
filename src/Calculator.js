import Operation from "./Operation.js";

export default class Calculator {
  #first_number = null;
  #second_number = null;
  #operation = null;
  #onchange_callback = () => {};

  constructor(onchange = () => {}) {
    this.#onchange_callback = onchange;
  }

  // getters
  get getFirstNumber() {
    return this.#first_number;
  }

  get getSecondNumber() {
    return this.#second_number;
  }

  get getOperation() {
    return this.#operation;
  }

  // setters
  set setFirstNumber(value) {
    this.#first_number = isNaN(value) ? null : value;
    this.#onchange_callback();
  }

  set setSecondNumber(value) {
    this.#second_number = isNaN(value) ? null : value;
    this.#onchange_callback();
  }

  set setOperation(value) {
    this.#operation = value;
    this.#onchange_callback();
  }

  // methods
  parseUrl(url) {
    const params = new URLSearchParams(url);
    this.setFirstNumber = parseFloat(params.get("fnum"));
    this.setSecondNumber= parseFloat(params.get("snum"));
    this.setOperation = new Operation(params.get("oper"));
  }

  calculate() {
    return this.setOperation.calculate(this.getFirstNumber, this.getSecondNumber);
  }
}
