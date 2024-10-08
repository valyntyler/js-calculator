import Operator from "./Operator.js";

export default class Calculator {
  #fst_number_string = "";
  #snd_number_string = "";
  #operator = Operator.Empty;
  #onchange = () => {};

  constructor(onchange = () => {}) {
    this.#onchange = onchange;
  }

  get getFirstNumber() {
    return this.#fst_number_string;
  }

  get getSecndNumber() {
    return this.#snd_number_string;
  }

  get getOperator() {
    return this.#operator;
  }

  set setOperator(value) {
    if (this.#operator == Operator.Empty && this.#fst_number_string != "") {
      this.#operator = value;
    }
    this.#onchange();
  }

  appendDigit(digit) {
    if (this.#operator == Operator.Empty) {
      this.#fst_number_string += digit;
    } else {
      this.#snd_number_string += digit;
    }
    this.#onchange();
  }

  clear() {
    if (this.#snd_number_string != "") {
      this.#snd_number_string = "";
    } else if (this.#operator != Operator.Empty) {
      this.#operator = Operator.Empty;
    } else if (this.#fst_number_string != "") {
      this.#fst_number_string = "";
    }
    this.#onchange();
  }

  allClear() {
    this.#fst_number_string = "";
    this.#snd_number_string = "";
    this.#operator = Operator.Empty;
    this.#onchange();
  }

  calculate() {
    if (
      this.#fst_number_string != "" &&
      this.#snd_number_string != "" &&
      this.#operator != Operator.Empty
    ) {
      this.#fst_number_string = this.#operator.calculate(
        parseFloat(this.#fst_number_string),
        parseFloat(this.#snd_number_string)
      );
      this.#snd_number_string = ''
      this.#operator = Operator.Empty
    }
    this.#onchange();
  }
}
