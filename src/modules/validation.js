const calcBlock = document.querySelector('.calc-block');
const calcInput = calcBlock.querySelectorAll('input');//передать в калькулятор
export { calcBlock, calcInput };

const validation = () => {

	calcBlock.addEventListener('input', event => {
		const target = event.target;

		calcInput.forEach(item => {
			if (item === target) {
				item.value = item.value.replace(/^0|\D/, '');
			}
		});
	});
	//валидация полей имя, сообщение============================
	const inputNames = document.querySelectorAll('input[name="user_name"]');
	const inputUserMessage = document.querySelector('input[name="user_message"]');
	const inputEmail = document.querySelectorAll('input[name="user_email"]');
	const inputPhone = document.querySelectorAll('input[name="user_phone"]');

	inputNames.forEach(item => {

		item.addEventListener('input', event => {
			const target = event.target;
			if (item === target) {
				if (item.value.trim() === '') {
					item.value = '';
					return;
				}

				item.value = item.value.replace(/[^а-яё ]/gi, '')
					.replace(/\s+/g, ' ')
					.replace(/(?<![а-яё])[а-яё]/ig, match => match.toUpperCase())
					.replace(/(?<=[А-Яа-яЁё])[а-яё]/ig, match => match.toLowerCase());
			}
		});

		item.addEventListener('blur', () => {
			item.value = item.value.trim();
		});
	});

	//message===========================================
	inputUserMessage.addEventListener('input', () => {
		inputUserMessage.value = inputUserMessage.value.replace(/[^а-яё0-9!?\., -]/ig, '');
	});

	inputUserMessage.addEventListener('blur', () => {
		inputUserMessage.value = inputUserMessage.value.replace(/-{2,}/ig, '-').trim()
			.replace(/-(?![а-яё\d])|(?<![а-яё\d])-/ig, '')
			.replace(/\s+/g, ' ')
			.replace(/(?<=[а-яё])\./gi, '. ')
			.replace(/^[^а-яё]+/g, '');
	});

	//email=============================================
	inputEmail.forEach(item => {
		item.addEventListener('blur', event => {
			const target = event.target;
			if (target === item) {
				if (item.value.trim() === '') {
					item.value = '';
					return;
				}

				item.value = item.value.replace(/[^-!'~@\.\*\w]/ig, '');
			}
		});
	});
	//phone================================================
	inputPhone.forEach(item => {
		item.addEventListener('input', event => {
			const target = event.target;
			if (target === item) {
				if (item.value.trim() === '') {
					item.value = '';
					return;
				}

				item.value = item.value.replace(/[^0-9\+]/ig, '');
			}
		});

		item.addEventListener('blur', event => {
			const target = event.target;
			if (target === item) {
				if (item.value.length < 9 || item.value.length > 16) {
					item.value = '';
				}
			}
		});
	});
};

export default validation;
