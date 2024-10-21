import { CalculatorKey, DigitKey, OperatorKey } from "../model/calculator_key.js";

const regex_digit = /\d/;
const regex_point = /\.|,/;

const regex_add = /\+/;
const regex_sub = /-/;
const regex_mul = /\*|x|X/;
const regex_div = /\/|:/;

const regex_eq = /=|Enter/;
const regex_cl = /^c$|Backspace/;
const regex_ac = /^a$|Delete/;

// exports
export default function parseKey(key) {
  switch (true) {
    // input
    case regex_digit.test(key): return new DigitKey(key);
    case regex_point.test(key): return CalculatorKey.Point;
    // operators
    case regex_add.test(key): return OperatorKey.Add;
    case regex_sub.test(key): return OperatorKey.Sub;
    case regex_mul.test(key): return OperatorKey.Mul;
    case regex_div.test(key): return OperatorKey.Div;
    // operations
    case regex_cl.test(key): return CalculatorKey.Cl;
    case regex_ac.test(key): return CalculatorKey.Ac;
    case regex_eq.test(key): return CalculatorKey.Eq;
    default: return new CalculatorKey("");
  }
}
