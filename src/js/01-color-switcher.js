const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
let timerId = null;

function getRandomHexColor() {
	return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

btnStart.addEventListener('click', (e) => {
	e.target.disabled = true;
	btnStop.disabled = false;
	timerId = setInterval(() => {
		document.body.style.backgroundColor = getRandomHexColor();
	}, 1000);
});

btnStop.addEventListener('click', (e) => {
	e.target.disabled = true;
	btnStart.disabled = false;
	clearInterval(timerId);
});