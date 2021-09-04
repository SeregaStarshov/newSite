import { calcBlock, calcInput } from './validation';

const calc = (price = 100) => {
	const calcType = document.querySelector('.calc-type');
	const totalValue = document.getElementById('total');
	calcType.value = '';
	calcInput.forEach(item => item.value = '');

	const countSum = () => {

		let total = 0;
		let countValue = 1;
		let dayValue = 1;
		const typeValue = calcType.options[calcType.selectedIndex].value;
		const squareValue = +calcInput[0].value;

		if (calcInput[1].value > 1) {
			countValue += (calcInput[1].value - 1) / 10;
		}

		if (calcInput[2].value && calcInput[2].value < 5) {
			dayValue *= 2;
		} else if (calcInput[2].value && calcInput[2].value < 10) {
			dayValue *= 1.5;
		}

		if (typeValue && squareValue) {
			total = Math.ceil(price * typeValue * squareValue * countValue * dayValue);

			let count = 0;
			const timerId = setInterval(() => {
				if (total <= 1000) {
					count += 25;
				} else if (total > 1000 && total < 2500) {
					count += 35;
				} else if (total > 2500) {
					count += 65;
				}

				totalValue.textContent = count;
				if (totalValue.textContent >= total) {
					totalValue.textContent = total;
					clearInterval(timerId);
				}
			}, 5);
		}

	};

	calcBlock.addEventListener('change', event => {
		const target = event.target;

		if (target === calcType || calcInput) {
			countSum();
		}
	});
};

export default calc;
