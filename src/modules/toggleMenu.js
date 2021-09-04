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

export default toggleMenu;
