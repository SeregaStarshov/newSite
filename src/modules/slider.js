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

export default slider;
