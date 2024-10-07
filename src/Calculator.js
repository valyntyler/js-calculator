import Operation from "./Operation.js";

export default class Calculator {
  #first_number = null;
  #second_number = null;
  #operation = null;
  #onchange_callback = null;

  constructor(
    first_number = null,
    second_number = null,
    operation = null,
    onchange = () => {}
  ) {
    this.first_number = first_number
    this.second_number = second_number
    this.operation = operation
    this.onchange = onchange
  }

  // getters
  get getFirstNumber() {
    return this.#first_number
  }

  get getSecondNumber() {
    return this.#second_number
  }

  get getOperation() {
    return this.#operation
  }

  // setters
  set firstNumber(value) {
    this.#first_number = value
    this.#onchange_callback()
  }

  set secondNumber(value) {
    this.#second_number = value
    this.#onchange_callback()
  }

  set operation(value) {
    this.#operation = value
    this.#onchange_callback()
  }

  // static methods
  static parseUrl(url) {
    const params = new URLSearchParams(url);
    const first_number = parseFloat(params.get("fnum"));
    const second_number = parseFloat(params.get("snum"));
    const operation = new Operation(params.get("oper"));
    return new Calculation(first_number, second_number, operation);
  }

  // methods
  calculate() {
    return this.operation.calculate(this.first_number, this.second_number);
  }
}
