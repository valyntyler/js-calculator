class Operation {
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

class Calculation {
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

const fnum = document.querySelector('#fnum')
const snum = document.querySelector('#snum')

document.querySelector('#fnum').addEventListener('oninput', function (event) {
    console.log('changed')
})

document.querySelector('#calculator-form').addEventListener('submit', function (event) {
    event.preventDefault() // Prevent the default form submission
    const formData = new URLSearchParams(new FormData(event.target)).toString();
    const newUrl = window.location.href.split('?')[0] + '?' + formData;
    window.history.pushState({}, '', newUrl); // Update the URL without reloading

    calc = Calculation.parseUrl(formData)

    result = calc.calculate()
    fnum.value = result
    snum.value = ''
})

window.addEventListener('load', function() {
    calc = Calculation.parseUrl(window.location.search)
 
    fnum.value = calc.first_number
    snum.value = calc.second_number
});
