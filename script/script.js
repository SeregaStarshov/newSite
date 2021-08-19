window.addEventListener('DOMContentLoaded', () => {



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

	countTimer('20 august 2021 00:07');
});
