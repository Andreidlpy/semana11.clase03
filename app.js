document.addEventListener('DOMContentLoaded', initializeCalculator);

const buttons = document.querySelectorAll('#calculator-numbers button');
const calculatorView = document.querySelector('#calculator-view');

let operacion = '';
let resultado = '';
let historial = [];
let nuevaOperacion = true;
function initializeCalculator() {
    updateView();

    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            if( nuevaOperacion ){
                operacion = '';
                nuevaOperacion = false;
            }
            operacion += button.value;
            updateView()
        });
    });

    const actions = document.querySelectorAll('#calculator-actions button');

    actions.forEach((action) => {
        action.addEventListener('click', () => {
            if (operacion === '') return;

            calculateResult();

            if (action.value === '=') {
                calculateResult();
                nuevaOperacion = true;
            } else {
                operacion += action.value;
            }
        });
    });

    const buttonClear = document.querySelector('#button-clear');

    buttonClear.addEventListener('click', () => {
        clearCalculator();
    });

    const buttonSubtract = document.querySelector('#button-subtract');

    buttonSubtract.addEventListener('click', () => {
        removeLastCharacter();
    });
}

function updateView() {
    calculatorView.innerHTML = operacion || resultado || '0';
}

function calculateResult() {
    try {
        let resultadoCalculo = math.evaluate(operacion);
        historial.push(`${operacion} = ${resultadoCalculo}`);
        operacion = resultadoCalculo.toString();
        updateView();
    } catch (error) {
        calculatorView.innerHTML = 'Error';
    }
}

function clearCalculator() {
    calculatorView.innerHTML = '0';
    operacion = '';
    resultado = '';
}

function removeLastCharacter() {
    operacion = operacion.slice(0, -1);

    if (operacion === '') {
        calculatorView.innerHTML = '0';
    } else {
        calculatorView.innerHTML = operacion;
    }
}
