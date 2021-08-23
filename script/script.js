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

	countTimer('25 august 2021 00:59');

	//Меню================================

	const toggleMenu = () => {

		const menu = document.querySelector('menu');//всплывающее меню
		const handlerMenu = () => {
			menu.classList.toggle('active-menu');
		};

		document.addEventListener('click', event => {

			let target = event.target;
			console.log(target);
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
});
