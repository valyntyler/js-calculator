export default class Operation {
    static Add = new Operation('add')
    static Subtract = new Operation('sub')
    static Multiply = new Operation('mul')
    static Divide = new Operation('div')

    constructor(operation) {
        this.operation = operation
    }

    calculate(first_number, second_number) {
        switch(this.operation) {
            case 'add':
                return first_number + second_number
            case 'sub':
                return first_number - second_number
            case 'mul':
                return first_number * second_number
            case 'div':
                return first_number / second_number
        }
    }
}
