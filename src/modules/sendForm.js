const forms = document.querySelectorAll('form');

const sendForm = () => {
	const errorMessage = 'Что то пошло не так...';
	const loadMessage = 'Загрузка...';
	const successMessage = 'Спасибо! Мы скоро с вами свяжемся!';
	let status = 0;

	const statusMessage = document.createElement('div');
	statusMessage.style.cssText = 'font-size: 2rem; color: white';

	forms.forEach(item => {
		item.addEventListener('submit', event => {
			event.preventDefault();
			item.appendChild(statusMessage);
			showPreloader();
			const formData = new FormData(item);
			const body = {};
			formData.forEach((val, key) => {
				body[key] = val;
			});
			postData(body)
				.then(response => {
					if (response.status !== 200) {
						throw new Error();
					}
					status = response.status;
					return (response.text());
				})
				.then(data => {
					console.log(data);
					statusMessage.textContent = successMessage;
					setTimeout(() => {
						statusMessage.textContent = '';
					}, 3000);
				})
				.catch(error => {
					statusMessage.textContent = errorMessage;
					console.error(error);
				});
		});

		//очистка форм после отправки==================================================
		item.addEventListener('submit', event => {
			if (event.target === item) {
				const itemCollection = item.elements;
				for (let i = 0; i < itemCollection.length - 1; i++) {
					itemCollection[i].value = '';
				}
			}
		});

	});

	const postData = body => fetch('./server.php', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body),
	});

	function showPreloader() {
		let i = 0;
		const timerId = setInterval(() => {
			if (i < loadMessage.length && status !== 200) {
				statusMessage.textContent += loadMessage[i++];
			} else if (i === loadMessage.length && status !== 200) {
				i = 0;
				statusMessage.textContent = '';
				statusMessage.textContent += loadMessage[i++];
			} else if (status === 200) {
				clearInterval(timerId);
				status = 0;
			}
		}, 90);
	}
};

export default sendForm;
