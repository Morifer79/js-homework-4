//подключение библиотеки Flatpickr
import flatpickr from "flatpickr";
//подключение стилей библиотеки
import "flatpickr/dist/flatpickr.min.css";
//подключение библиотеки Notiflix
import {Report} from 'notiflix/build/notiflix-report-aio';

//объект параметров Flatpickr
const options = {
	enableTime: true,
	time_24hr: true,
	defaultDate: new Date(),
	minuteIncrement: 1,
	onClose(selectedDates) {
		console.log(selectedDates[0]);
	},
};

//инициализация
const flatpickrValue = flatpickr("#datetime-picker", options);

//конвертация двойного индекса
function addLeadingZero(value) {
	return String(value).padStart(2, '0');
}

//разметка таймера
function markupTimer(days, hours, minutes, seconds) {
	document.querySelector('[data-days]').textContent = addLeadingZero(days);
	document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
	document.querySelector('[data-minutes]').textContent = addLeadingZero(minutes);
	document.querySelector('[data-seconds]').textContent = addLeadingZero(seconds);
}

//функция преобразования миллисекунд из разницы дат
function convertMs(ms) {
	const second = 1000;
	const minute = second * 60;
	const hour = minute * 60;
	const day = hour * 24;

	const days = Math.floor(ms / day);
	const hours = Math.floor((ms % day) / hour);
	const minutes = Math.floor(((ms % day) % hour) / minute);
	const seconds = Math.floor((((ms % day) % hour) % minute) / second);

	return { days, hours, minutes, seconds };
}

//поиск и прослушивание кнопки
document.querySelector('button[data-start]').addEventListener('click', onClick);

//колбек-функция клика
function onClick() {
	const selectedDate = flatpickrValue.selectedDates[0];
	//вывод предупреждения корректности
	if (selectedDate < new Date()) {
		Report.warning('ATTENTION', '"Please choose a date in the future"', '🎬');
		return;
	}
	//функция обратного отсчёта
	function countdown() {
		const currentDate = new Date();
		const difference = selectedDate - currentDate;
		//сброс интервала и разметки по завершению
		if (difference <= 0) {
		clearInterval(timerId);
		markupTimer(0, 0, 0, 0);
		return;
		}
		const { days, hours, minutes, seconds } = convertMs(difference);
		markupTimer(days, hours, minutes, seconds);
	}
	//запуск обратного отсчёта и установка интервала
	countdown();
	const timerId = setInterval(countdown, 1000);
}