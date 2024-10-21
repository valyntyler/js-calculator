export class CalculatorKey {
  static Point = new CalculatorKey("point");
  static Cl = new CalculatorKey("cl");
  static Ac = new CalculatorKey("ac");
  static Eq = new CalculatorKey("eq");

  constructor(value) {
    this.id = value;
  }
}

export class DigitKey extends CalculatorKey {
  static ID = "digit";

  constructor(value) {
    super(DigitKey.ID);
    this.digit = value;
  }
}

export class OperatorKey extends CalculatorKey {
  static ID = "operator";

  static Add = new OperatorKey("add");
  static Sub = new OperatorKey("sub");
  static Mul = new OperatorKey("mul");
  static Div = new OperatorKey("div");

  constructor(value) {
    super(OperatorKey.ID);
    this.operator = value;
  }
}
