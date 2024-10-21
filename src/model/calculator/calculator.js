import Operator from "./operator.js";

export default class Calculator {
  #fst_number_string = "";
  #snd_number_string = "";
  #operator = Operator.Empty;
  #previous_calculation = null;

  #is_div_zero_allowed = false;

  onchange = () => {};
  onfail = () => {};

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
      this.#fst_number_string = parseFloat(this.#fst_number_string).toString();
      this.onchange();
    } else {
      this.onfail();
    }
  }

  get isDivZeroAllowed() {
    return this.#is_div_zero_allowed;
  }

  set isDivZeroAllowed(value) {
    this.#is_div_zero_allowed = value;
  }

  appendDigit(digit) {
    if (this.#previous_calculation != null) {
      this.#fst_number_string = "";
      this.#previous_calculation = null;
    }

    if (this.#operator == Operator.Empty) {
      if (this.#fst_number_string.length + digit.length <= 10) {
        this.#fst_number_string += digit;
      } else {
        this.onfail();
      }
    } else {
      if (this.#snd_number_string.length + digit.length <= 10) {
        this.#snd_number_string += digit;
      } else {
        this.onfail();
      }
    }
    this.onchange();
  }

  appendDecimal() {
    if (this.#previous_calculation != null) {
      this.#previous_calculation = null;
      this.#fst_number_string = "";
    }

    const f = (target) => {};

    if (this.#operator == Operator.Empty) {
      if (
        this.#fst_number_string.toString().match(/\./) == null &&
        this.#fst_number_string.length < 10
      ) {
        this.#fst_number_string += ".";
      } else {
        this.onfail();
      }
    } else {
      if (
        this.#snd_number_string.toString().match(/\./) == null &&
        this.#snd_number_string.length < 10
      ) {
        this.#snd_number_string += ".";
      } else {
        this.onfail();
      }
    }
    this.onchange();
  }

  clear() {
    this.#previous_calculation = null;
    if (this.#snd_number_string !== "") {
      this.#snd_number_string = "";
    } else if (this.#operator != Operator.Empty) {
      this.#operator = Operator.Empty;
    } else if (this.#fst_number_string !== "") {
      this.#fst_number_string = "";
    } else {
      this.onfail();
    }
    this.onchange();
  }

  allClear() {
    if (this.#fst_number_string !== "") {
      this.#previous_calculation = null;
      this.#fst_number_string = "";
      this.#snd_number_string = "";
      this.#operator = Operator.Empty;
      this.onchange();
    } else {
      this.onfail();
    }
  }

  calculate() {
    if (
      !this.#is_div_zero_allowed &&
      this.#snd_number_string == 0 &&
      this.#operator.id === Operator.Divide.id
    ) {
      this.onfail();
      return;
    }

    if (
      this.#fst_number_string !== "" &&
      this.#snd_number_string !== "" &&
      this.#operator != Operator.Empty
    ) {
      // clean up second number
      this.#snd_number_string = parseFloat(this.#snd_number_string).toString();
      // remember previous calculation
      this.#previous_calculation = new PreviousCalculation(
        this.getFirstNumber,
        this.getSecndNumber,
        this.getOperator
      );
      // perform calculations

      let result = this.#operator.calculate(
        parseFloat(this.#fst_number_string),
        parseFloat(this.#snd_number_string)
      ); //.toString().substring(0, 10);
      this.#fst_number_string = result;

      this.#snd_number_string = "";
      this.#operator = Operator.Empty;
      this.onchange();
    } else {
      this.onfail();
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
