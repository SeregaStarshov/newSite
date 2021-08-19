

const day = document.querySelector('.day'),
	timesDay = document.querySelector('.times-day'),
	currentTimes = document.querySelector('.current-times'),
	restTime = document.querySelector('.rest-time');


const currentDate = new Date();
const newYear = new Date('31 december 2021 23:59:59');



function getCurrentDay() {
	const currentDay = currentDate.toLocaleString('ru', { weekday: "long" });
	day.textContent = 'Сегодня: ' + currentDay[0].toUpperCase() + currentDay.substring(1);
}
getCurrentDay();


function getCurrentTime() {

	const currentTime = currentDate.toLocaleTimeString('ru', { hour12: true });
	const timeFormat = currentTime.substring(8);

	let hours, minutes, seconds;

	if (currentDate.getHours() < 10) {
		hours = `0${currentDate.getHours()}`;
	} else {
		currentDate.getHours();
	}

	if (currentDate.getMinutes() < 10) {
		minutes = `0${currentDate.getMinutes()}`;
	} else {
		minutes = currentDate.getMinutes();
	}

	if (currentDate.getSeconds() < 10) {
		seconds = `0${currentDate.getSeconds()}`;
	} else {
		seconds = currentDate.getSeconds();
	}


	currentTimes.textContent = `Текущее время: ${hours}:${minutes}:${seconds} ${timeFormat}`;

	function getTimesDay() {
		if (timeFormat === 'AM') {
			if (hours > 0 && hours < 4) {
				timesDay.textContent = 'Доброй ночи';
			} else if (hours >= 4 && hours <= 12) {
				timesDay.textContent = 'Доброе утро';
			}
		} else if (timeFormat === 'PM') {
			if (hours > 0 && hours <= 4) {
				timesDay.textContent = 'Добрый день';
			} else if (hours > 4) {
				timesDay.textContent = 'Добрый вечер';
			}
		}
	}
	getTimesDay();
}
getCurrentTime();

function getRestTime() {
	const timeRemaining = (newYear - currentDate.getTime()) / 1000;
	const days = Math.floor(timeRemaining / 60 / 60 / 24);

	restTime.textContent = `До нового года осталось: ${days} дня(дней)`;
}
getRestTime();
