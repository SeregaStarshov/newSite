window.addEventListener('DOMContentLoaded', () => {


	//Таймер=========================================
	function countTimer(deadline) {
		const timerHours = document.getElementById('timer-hours');
		const timerMinutes = document.getElementById('timer-minutes');
		const timerSeconds = document.getElementById('timer-seconds');
		const timerDays = document.getElementById('timer-days');

		function getTimeRemaining() {
			const dateStop = new Date(deadline).getTime();
			const dateNow = new Date().getTime();
			const timeRemaining = (dateStop - dateNow) / 1000;
			const seconds = Math.floor(timeRemaining % 60);
			const minutes = Math.floor((timeRemaining / 60) % 60);
			const hours = Math.floor(timeRemaining / 60 / 60) % 24;
			const days = Math.floor(timeRemaining / 60 / 60 / 24);

			return { timeRemaining, days, hours, minutes, seconds };
		}
		// как по другому через setInterval сделать я незнаю
		const timerId = setInterval(() => {
			const timer = getTimeRemaining();

			if (timer.timeRemaining <= 0) {
				clearInterval(timerId);
				timer.days = 0;
				timer.hours = 0;
				timer.minutes = 0;
				timer.seconds = 0;
			}

			if (timer.days < 10) {
				timerDays.textContent = `0${timer.days}`;
			} else {
				timerDays.textContent = timer.days;
			}

			if (timer.hours < 10) {
				timerHours.textContent = `0${timer.hours}`;
			} else {
				timerHours.textContent = timer.hours;
			}
			if (timer.minutes < 10) {
				timerMinutes.textContent = `0${timer.minutes}`;
			} else {
				timerMinutes.textContent = timer.minutes;
			}

			if (timer.seconds < 10) {
				timerSeconds.textContent = `0${timer.seconds}`;
			} else {
				timerSeconds.textContent = timer.seconds;
			}
		});

		//updateClock();
	}

	countTimer('02 September 2021 00:59');

	//Меню================================

	const toggleMenu = () => {

		const menu = document.querySelector('menu');//всплывающее меню
		const handlerMenu = () => {
			menu.classList.toggle('active-menu');
		};

		document.addEventListener('click', event => {

			const target = event.target;

			if (target.closest('.menu')) {
				handlerMenu();
			} else if (target.closest('.close-btn')) {
				event.preventDefault();
				handlerMenu();
			} else if (target.closest('menu>ul')) {
				handlerMenu();
			} else if (target !== target.closest('menu')) {
				menu.classList.remove('active-menu');
			}
		});
	};
	toggleMenu();

	//popup=========================================

	const togglePopup = () => {
		const popup = document.querySelector('.popup');
		const popupBtn = document.querySelectorAll('.popup-btn');
		//const popupClose = document.querySelector('.popup-close');
		const popupContent = popup.querySelector('.popup-content');
		const serviceBlock = document.querySelector('a[href="#service-block"]');

		//анимация==========================================
		popupBtn.forEach(elem => {
			elem.addEventListener('click', () => {
				let top = -400;
				popup.style.display = 'block';
				popupContent.style.cssText = `top: ${top}px;`;

				const timerId = setInterval(() => {
					top += 20;
					popupContent.style.top = top + 'px';
					if (popupContent.offsetTop > 58 || screen.width < 768) {
						clearInterval(timerId);
						popupContent.style.cssText = `top: 10%;`;
					}
				}, 10);

			});
		});

		popup.addEventListener('click', event => {
			let target = event.target;

			if (target.classList.contains('popup-close')) {
				popup.style.display = 'none';
			} else {
				target = target.closest('.popup-content');

				if (!target) {
					popup.style.display = 'none';
				}
			}

		});
		//плавность прокрутки===========================================
		serviceBlock.addEventListener('click', event => {
			event.preventDefault();
			const timerId = setInterval(() => {
				document.documentElement.scrollTop += 30;
				if (document.documentElement.scrollTop > 830) {
					clearInterval(timerId);
				}
			}, 2);

		});
	};
	togglePopup();

	//tabs=============================================================

	const tabs = () => {
		const tabHeader = document.querySelector('.service-header');
		const tab = document.querySelectorAll('.service-header-tab');
		const tabContent = document.querySelectorAll('.service-tab');

		const toggleTabContent = index => {
			for (let i = 0; i < tabContent.length; i++) {
				if (index === i) {
					tab[i].classList.add('active');
					tabContent[i].classList.remove('d-none');
				} else {
					tab[i].classList.remove('active');
					tabContent[i].classList.add('d-none');
				}
			}
		};

		tabHeader.addEventListener('click', event => {
			let target = event.target;
			target = target.closest('.service-header-tab');
			if (target) {
				tab.forEach((item, i) => {

					if (item === target) {
						toggleTabContent(i);
					}
				});
			}
		});
	};
	tabs();
	//слайдер============================================
	const slider = () => {
		const slide = document.querySelectorAll('.portfolio-item');
		const btn = document.querySelectorAll('.portfolio-btn');
		const slider = document.querySelector('.portfolio-content');
		const portfolioDots = document.querySelector('.portfolio-dots');

		let currentSlide = 0;
		let interval;

		//создаем элементы списка(portfolioDots) по кол-ву эл-тов в слайдере
		for (let i = 0; i < slide.length; i++) {
			const dot = document.createElement('li');
			if (i === 0) {
				dot.classList.add('dot', 'dot-active');
			}
			dot.classList.add('dot');
			portfolioDots.append(dot);
		}
		const dots = document.querySelectorAll('.dot');

		const prevSlide = (elem, index, strClass) => {
			elem[index].classList.remove(strClass);
		};

		const nextSlide = (elem, index, strClass) => {
			elem[index].classList.add(strClass);
		};

		const autoPlaySlide = () => {
			prevSlide(slide, currentSlide, 'portfolio-item-active');
			prevSlide(dots, currentSlide, 'dot-active');
			currentSlide++;

			if (currentSlide >= slide.length) {
				currentSlide = 0;
			}
			nextSlide(slide, currentSlide, 'portfolio-item-active');
			nextSlide(dots, currentSlide, 'dot-active');
		};

		const startSlide = (time = 2000) => {
			interval = setInterval(autoPlaySlide, time);
		};

		const stopSlide = () => {
			clearInterval(interval);
		};

		slider.addEventListener('click', event => {
			event.preventDefault();

			const target = event.target;

			if (!target.matches('.portfolio-btn, .dot')) {
				return;
			}

			prevSlide(slide, currentSlide, 'portfolio-item-active');
			prevSlide(dots, currentSlide, 'dot-active');

			if (target.matches('#arrow-right')) {
				currentSlide++;
			} else if (target.matches('#arrow-left')) {
				currentSlide--;
			} else if (target.matches('.dot')) {
				dots.forEach((item, index) => {
					if (item === target) {
						currentSlide = index;
					}
				});
			}

			if (currentSlide >= slide.length) {
				currentSlide = 0;
			} else if (currentSlide < 0) {
				currentSlide = slide.length - 1;
			}

			nextSlide(slide, currentSlide, 'portfolio-item-active');
			nextSlide(dots, currentSlide, 'dot-active');
		});

		slider.addEventListener('mouseover', event => {
			if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
				stopSlide();
			}
		});

		slider.addEventListener('mouseout', event => {
			if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
				startSlide();
			}
		});

		startSlide(2000);
	};
	slider();

	//dataAttributes=====================================
	const commandPhoto = document.querySelectorAll('.command__photo');

	commandPhoto.forEach(item => {
		const attribute = item.src;
		item.addEventListener('mouseover', event => {
			event.target.src = event.target.dataset.img;
		});

		item.addEventListener('mouseout', event => {
			event.target.src = attribute;
		});
	});

	//поля ввода===========================================

	const calcBlock = document.querySelector('.calc-block');
	const calcInput = calcBlock.querySelectorAll('input');

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
	// const formBtn = document.querySelectorAll('.form-btn[type="submit"]');
	// console.log(formBtn);

	inputNames.forEach(item => {

		item.addEventListener('input', event => {
			const target = event.target;
			if (item === target) {
				if (item.value.trim() === '') {
					item.value = '';
					return;
				}

				item.value = item.value.replace(/[^а-яё ]/gi, '')
				//item.value = item.value.replace(/-(?![а-яё])|(?<![а-яё])-/ig, '')
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
		inputUserMessage.value = inputUserMessage.value.replace(/[^а-яё\W\d ]/ig, '');
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
		item.addEventListener('blur', event => {
			const target = event.target;
			if (target === item) {
				if (item.value.trim() === '') {
					item.value = '';
					return;
				}

				item.value = item.value.replace(/[^\+\d]/ig, '');
			}
		});
	});



	//калькулятор=======================================================
	const calc = (price = 100) => {
		const calcType = document.querySelector('.calc-type');
		//const calcSquare = document.querySelector('.calc-square');
		//const calcDay = document.querySelector('.calc-day'); вместо этих переменных взял уже созданную ранее calcInput
		//const calcCount = document.querySelector('.calc-count');
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
	calc(100);

	//send-ajax-form=======================================
	const forms = document.querySelectorAll('form');
	const sendForm = () => {
		const errorMessage = 'Что то пошло не так...';
		const loadMessage = 'Загрузка...';
		const successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

		const statusMessage = document.createElement('div');
		statusMessage.style.cssText = 'font-size: 2rem; color: white';

		forms.forEach(item => {
			item.addEventListener('submit', event => {
				event.preventDefault();
				item.appendChild(statusMessage);
				statusMessage.textContent = loadMessage;
				const formData = new FormData(item);
				const body = {};
				formData.forEach((val, key) => {
					body[key] = val;
				});
				postData(body, () => {
					statusMessage.textContent = successMessage;
				}, error => {
					statusMessage.textContent = errorMessage;
					console.error(error);
				});
			});
		});

		// form.addEventListener('submit', event => {
		// 	event.preventDefault();
		// 	form.appendChild(statusMessage);
		// 	statusMessage.textContent = loadMessage;
		// 	const formData = new FormData(form);
		// 	console.log(formData)
		// 	const body = {};
		// 	formData.forEach((val, key) => {
		// 		console.log(val, key)
		// 		body[key] = val;
		// 	});
		// 	postData(body, () => {
		// 		statusMessage.textContent = successMessage;
		// 	}, error => {
		// 		statusMessage.textContent = errorMessage;
		// 		console.error(error);
		// 	});
		// });


		function postData(body, outputData, errorData) {
			const request = new XMLHttpRequest();

			request.addEventListener('readystatechange', () => {

				if (request.readyState !== 4) {
					return;
				}

				if (request.status === 200) {
					outputData();
				} else {
					errorData(request.status);
				}

			});

			request.open('POST', 'server.php');
			request.setRequestHeader('Content-Type', 'application/json');
			request.send(JSON.stringify(body));
		}
	};
	sendForm();

	//очистка форм после отправки==================================================
	forms.forEach(item => {
		item.addEventListener('submit', event => {
			if (event.target === item) {
				const itemCollection = item.elements;
				for (let i = 0; i < itemCollection.length - 1; i++) {
					itemCollection[i].value = '';
				}
			}
		});
	});
});
