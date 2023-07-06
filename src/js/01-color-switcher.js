//поиск кнопок
const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
let timerId = null;

//генератор цвета
function getRandomHexColor() {
	return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}
//прослушивание кнопки Старт
btnStart.addEventListener('click', (e) => {
//смена значений активности кнопок
	e.target.disabled = true;
	btnStop.disabled = false;
	//установка интервала для смены цвета фона
	timerId = setInterval(() => {
		document.body.style.backgroundColor = getRandomHexColor();
	}, 1000);
});

//прослушивание кнопки Стоп
btnStop.addEventListener('click', (e) => {
	//смена значений активности кнопок
	e.target.disabled = true;
	btnStart.disabled = false;
	//сброс интервала
	clearInterval(timerId);
});