import Calculation from "./Calculation.js"
import Operation from "./Operation.js"

const form = document.querySelector('#calculator-form')
const fnum = document.querySelector('#fnum')
const snum = document.querySelector('#snum')
const result = document.querySelector('#result')

var calculation = new Calculation(0, 0, Operation.Add)

form.addEventListener('submit', function(event) {
    event.preventDefault()

    fnum.value = calculation.calculate()
    snum.value = ''
})

form.addEventListener('change', function(event) {
    calculation.first_number = parseFloat(fnum.value)
    calculation.second_number = parseFloat(snum.value)
    result.innerHTML = calculation.calculate()
})
