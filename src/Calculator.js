import Operator from "./Operator.js";

export default class Calculator {
  #fst_number_string = "";
  #snd_number_string = "";
  #operator = Operator.Empty;
  #onchange = () => {};
  #oncalculate = () => {};

  constructor(onchange = () => {}, oncalculate = (pf, ps, po) => {}) {
    this.#onchange = onchange;
    this.#oncalculate = oncalculate;
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
    if (this.#operator == Operator.Empty && this.#fst_number_string !== "") {
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
    if (this.#snd_number_string !== "" ) {
      this.#snd_number_string = "";
    } else if (this.#operator != Operator.Empty) {
      this.#operator = Operator.Empty;
    } else if (this.#fst_number_string !== "") {
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
      this.#fst_number_string !== "" &&
      this.#snd_number_string !== "" &&
      this.#operator != Operator.Empty
    ) {
      // save previous values
      const prev_fst = this.getFirstNumber
      const prev_snd = this.getSecndNumber
      const prev_opr = this.getOperator
      // perform calculations
      this.#fst_number_string = this.#operator.calculate(
        parseFloat(this.#fst_number_string),
        parseFloat(this.#snd_number_string)
      );
      this.#snd_number_string = ''
      this.#operator = Operator.Empty
      this.#onchange()
      this.#oncalculate(prev_fst, prev_snd, prev_opr)
    }
  }
}
