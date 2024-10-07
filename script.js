import Calculation from "./src/Calculation.js"
import Operation from "./src/Operation.js"

// elements
const first_number = document.querySelector('#first-number')
const second_number = document.querySelector('#second-number')

const calc_form = document.querySelector('#calculator-form')
const equals_button = document.querySelector('#equals')

const operation_select = document.querySelector('#operation')
const operator_buttons = document.querySelectorAll('.operator-button')

// callbacks
calc_form.addEventListener('input', function() {
    console.log('hello')
})

equals_button.addEventListener('click', function() {
    console.log(first_number.value + second_number.value)
})

operator_buttons.forEach(element => {
    element.addEventListener('click', function() {
        calculation.operation = new Operation(element.name)
        operation_select.value = element.name
    })
});

const calculation = new Calculation(0, 0, Operation.Add)
