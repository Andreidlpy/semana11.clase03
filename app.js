document.addEventListener('DOMContentLoaded', createCalculator);
const buttons = document.querySelectorAll('#calculator-numbers button');
const calculatorView = document.querySelector('#calculator-view');

let operacion = '';
let resultado = '';

function createCalculator (){

    updateView()

    buttons.forEach(( button ) => {
        button.addEventListener( 'click', () => {
            operacion += button.value;
            updateView();
        })
    })

    const actions = document.querySelectorAll('#calculator-actions button');

    actions.forEach(( action ) => {
        action.addEventListener( 'click', () => { 

            if( operacion === '' ) return;

            if( action.value === '=' ){
                calcularResultado();
            }else{
                operacion += action.value
            }
        
        })
    })

    const buttonClear = document.querySelector('#button-clear');

    buttonClear.addEventListener( 'click' , ( ) => {
        calculatorView.innerHTML = '0';
        operacion = '';
        resultado = '';
    });

    buttonSubstract = document.querySelector('#button-substract');

    buttonSubstract.addEventListener( 'click' , ( ) => {
    
        operacion = operacion.split('').splice(0 , operacion.length - 1).join('');
        
        if( operacion === '' ) {
            calculatorView.innerHTML = '0';
        } else{
            calculatorView.innerHTML = operacion;
        }
    });

}


function updateView () {
    calculatorView.innerHTML = operacion || resultado || '0';
};

function calcularResultado (){
    try {
        resultado = eval(operacion);
        operacion = resultado.toString();
        updateView();
    } catch (error) {
        calculatorView.innerHTML = 'Error';
        operacion = '';
        resultado = '';
    }
};

