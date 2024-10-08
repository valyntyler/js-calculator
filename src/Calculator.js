import Operator from "./Operator.js";

export default class Calculator {
  #fst_number_string = "";
  #snd_number_string = "";
  #operator = Operator.Empty;
  #previous_calculation = null;
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

  get getPreviousCalculation() {
    return this.#previous_calculation;
  }

  set setOperator(value) {
    if (this.#operator == Operator.Empty && this.#fst_number_string !== "") {
      this.#operator = value;
      this.#previous_calculation = null;
      this.#fst_number_string = parseFloat(this.#fst_number_string).toString()
      this.#onchange();
    }
  }

  appendDigit(digit) {
    if (this.#previous_calculation != null) {
      this.#fst_number_string = "";
      this.#previous_calculation = null;
    }

    if (this.#operator == Operator.Empty) {
      this.#fst_number_string += digit;
    } else {
      this.#snd_number_string += digit;
    }
    this.#onchange();
  }

  appendDecimal() {
    if (this.#previous_calculation != null) {
      this.#previous_calculation = null
      this.#fst_number_string = ''
    }

    if (this.#operator == Operator.Empty) {
      if (this.#fst_number_string.toString().match(/\./) == null) {
        this.#fst_number_string += ".";
      }
    } else {
      if (this.#snd_number_string.match(/\./) == null) {
        this.#snd_number_string += ".";
      }
    }
    this.#onchange();
  }

  clear() {
    if (this.#snd_number_string !== "") {
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
      // clean up second number
      this.#snd_number_string = parseFloat(this.#snd_number_string).toString()
      // remember previous calculation
      this.#previous_calculation = new PreviousCalculation(
        this.getFirstNumber,
        this.getSecndNumber,
        this.getOperator
      );
      // perform calculations
      this.#fst_number_string = this.#operator.calculate(
        parseFloat(this.#fst_number_string),
        parseFloat(this.#snd_number_string)
      );
      this.#snd_number_string = "";
      this.#operator = Operator.Empty;
      this.#onchange();
    }
  }
}

class PreviousCalculation {
  constructor(fst_number, snd_number, operator) {
    this.fst_number = fst_number;
    this.snd_number = snd_number;
    this.operator = operator;
  }

  toString = () => {
    return `${this.fst_number}${this.operator.symbol}${this.snd_number}=`;
  };
}
