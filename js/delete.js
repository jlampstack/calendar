class Calculator {
	constructor(prevOperandText, currentOperandText) {
		this.prevOperandText = prevOperandText;
		this.currentOperandText = currentOperandText;
		this.clear();
	}

	clear() {
		this.currentOperand = '';
		this.prevOperand = '';
		this.operation = undefined;
	}

	delete() {
		this.currentOperand = this.currentOperand.toString().slice(0, -1);
	}

	appendNumber(num) {
		if (num === '.' && this.currentOperand.includes('.')) return;
		this.currentOperand = this.currentOperand.toString() + num.toString();
	}

	chooseOperation(operation) {
		if (this.currentOperand === '') return;
		if (this.prevOperand !== '') {
			this.compute();
		}
		this.operation = operation;
		this.prevOperand = this.currentOperand;
		this.currentOperand = '';
	}

	compute() {
		let computation;
		const prev = parseFloat(this.prevOperand);
		const current = parseFloat(this.currentOperand);

		if (isNaN(prev) || isNaN(current)) return;

		switch (this.operation) {
			case '+':
				computation = prev + current;
				break;
			case '-':
				computation = prev - current;
				break;
			case '÷':
				computation = prev / current;
				break;
			case '*':
				computation = prev * current;
				break;
			default:
				return;
		}
		this.currentOperand = computation;
		this.operation = undefined;
		this.prevOperand = '';
	}

	// helper function to make numbers comma delimited
	getDislayNumber(number) {
		return number;
	}

	// Makes display prettier
	updateDisplay() {
		this.currentOperandText.innerText = this.currentOperand;
		if (this.operation != null) {
			this.prevOperandText.innerText = `${this.prevOperand} ${this.operation}`;
		}
	}
}

const query = document.querySelector.bind(document);
const queryAll = document.querySelectorAll.bind(document);

const calculatorElement = query('#calculator');
const numberButtons = queryAll('[data-num]');
const operationButtons = queryAll('[data-operation]');
const equalsButton = query('[data-equals]');
const deleteButton = query('[data-delete]');
const allClearButton = query('[data-all-clear]');

const prevOperandText = query('#calculator .prev-operand');
const currentOperandText = query('#calculator .current-operand');

const calculator = new Calculator(prevOperandText, currentOperandText);

numberButtons.forEach(button => {
	button.addEventListener('click', () => {
		calculator.appendNumber(button.innerText);
		calculator.updateDisplay();
	});
});

operationButtons.forEach(button => {
	button.addEventListener('click', () => {
		calculator.chooseOperation(button.innerText);
		calculator.updateDisplay();
	});
});

equalsButton.addEventListener('click', button => {
	calculator.compute();
	calculator.updateDisplay();
});

equalsButton.addEventListener('click', button => {
	calculator.compute();
	calculator.updateDisplay();
});

allClearButton.addEventListener('click', button => {
	calculator.clear();
	calculator.updateDisplay();
});

deleteButton.addEventListener('click', button => {
	calculator.delete();
	calculator.updateDisplay();
});
