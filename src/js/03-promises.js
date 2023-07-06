//подключение библиотеки Notiflix
import { Notify } from 'notiflix/build/notiflix-notify-aio';

//поиск и прослушивание формы
document.querySelector('.form').addEventListener('submit', (e) => {
	//сброс дефолтного поведения
	e.preventDefault();
	//получение значений задержки, шага и кол-ва
	const delay = Number(e.target.elements.delay.value);
	const step = Number(e.target.elements.step.value);
	const amount = Number(e.target.elements.amount.value);

	for (let i = 0; i < amount; i++) {
		const position = i + 1;
		const currentDelay = delay + (i * step);
		//вызов промиса с двумя сценариями и выводами уведомлений
		createPromise(position, currentDelay)
		.then(({ position, delay }) => {
			Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
		})
		.catch(({ position, delay }) => {
			Notify.failure(`Rejected promise ${position} in ${delay}ms`);
		});
	}
});

//функция создания промиса с рандомным исполнением операции
function createPromise(position, delay) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			const shouldResolve = Math.random() > 0.3;
			if (shouldResolve) {
				resolve({ position, delay });
			} else {
				reject({ position, delay });
			}
		}, delay);
	});
}