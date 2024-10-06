export default class Calculation {
    constructor(first_number, second_number, operation) {
        this.first_number = first_number
        this.second_number = second_number
        this.operation = operation
    }

    static parseUrl(url) {
        const params = new URLSearchParams(url);
        const first_number = parseFloat(params.get('fnum'));
        const second_number = parseFloat(params.get('snum'));
        const operation = new Operation(params.get('oper'));
        return new Calculation(first_number, second_number, operation)
    }

    calculate() {
        return this.operation.calculate(this.first_number, this.second_number)
    }
}
