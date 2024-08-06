const buttons = document.querySelectorAll('.btn');
const display = document.querySelector('.current');
const historyDisplay = document.querySelector('.history');
let currentValue = '0';
let historyValue = '';
let operator = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (value === 'AC') {
            currentValue = '0';
            historyValue = '';
            operator = '';
            historyDisplay.textContent = '';
        } else if (value === 'DEL') {
            if (currentValue.length > 1) {
                currentValue = currentValue.slice(0, -1);
            } else {
                currentValue = '0';
            }
        } else if (value === '=') {
            if (operator && currentValue !== '') {
                historyValue += currentValue;
                try {
                    currentValue = eval(historyValue);
                } catch {
                    currentValue = 'Error';
                }
                historyDisplay.textContent = historyValue;
                historyValue = '';
            }
        } else if (['+', '-', '*', '/', '%'].includes(value)) {
            if (currentValue !== '') {
                historyValue = `${currentValue} ${value} `;
                operator = value;
                currentValue = '';
            }
        } else {
            if (currentValue === '0' && value !== '00') {
                currentValue = value;
            } else {
                currentValue += value;
            }
        }

        display.textContent = currentValue;
    });
});
