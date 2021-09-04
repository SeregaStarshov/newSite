const togglePopup = () => {
	const popup = document.querySelector('.popup');
	const popupBtn = document.querySelectorAll('.popup-btn');
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

export default togglePopup;
