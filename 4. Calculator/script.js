const display = document.querySelector('.display');
const numberButtons = document.querySelectorAll('.numbers button');
const operationButtons = document.querySelectorAll('.operations button');   
const clearButton = document.querySelector('.clear button');

let currentInput = '';
let previousInput = '';
let operation = null;

function updateDisplay() {
    display.textContent = currentInput;
}

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        currentInput += button.textContent;
        updateDisplay();
    });
});


operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.textContent === '=') {
            if (operation && previousInput) {
                currentInput = eval(`${previousInput} ${operation} ${currentInput}`).toString();
                operation = null;
                previousInput = '';
                updateDisplay();
            }
        } else {
            if (currentInput) {
                previousInput = currentInput;
                operation = button.textContent;
                currentInput = '';
            }
            updateDisplay();
        }
    });
});

clearButton.addEventListener('click', () => {
    currentInput = '';
    previousInput = '';
    operation = null;
    updateDisplay();
});

updateDisplay();