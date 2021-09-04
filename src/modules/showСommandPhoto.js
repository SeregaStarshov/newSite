function showCommandPhoto() {
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
}

export default showCommandPhoto;
