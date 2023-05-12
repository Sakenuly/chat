import {INPUTS} from './const.js';
import {openSocket} from './socket.js';
import {socket} from './socket.js';
import Cookies from 'https://cdn.skypack.dev/js-cookie@3.0.5';

function validMailSend(e) {
	e.preventDefault();
	const email = INPUTS.email.value;
	validateEmail(email) ? request('sendToken') : alert('Введите корректную почту');
}

function validateEmail(email) {
	const re = /\S+@\S+\.\S+/;
	return re.test(email);
}

async function getInfo() {
	request('auth')
		.then(data => {
			Cookies.set('userMail', data.email);
			Cookies.set('userToken', data.token);
			if (data.email === data.name) {
				alert('Смените ваше имя');
				document.documentElement.className = '_active-popup-settings';
			} else {
				alert('Авторизация прошла успешно.');
			}

			openSocket();
			return data;
		});
}

async function patch() {
	request('changeName')
		.then(data => {
			socket.close();
			alert('Вы сменили имя на ' + data.name);
		});
}

// Переделать на обычную функцию и повторяющиеся объекты ссылать друг на друга с помощью this или еще как то, можно попробовать с помощью методов объектов.
// const requestObj = () => ( {
// 	url: {
// 		auth: 'https://edu.strada.one/api/user/me',
// 		sendToken: 'https://edu.strada.one/api/user',
// 		changeName: 'https://edu.strada.one/api/user',
// 		history: 'https://edu.strada.one/api/messages',
// 	},
// 	type: {
// 		auth: {
// 			method: 'GET',
// 			headers: {
// 				'Content-Type': 'application/json;charset=utf-8',
// 				Authorization: `Bearer ${INPUTS.confirm.value || Cookies.get('userToken')}`,
// 			},
// 		},
// 		sendToken: {
// 			method: 'POST',
// 			headers: {
// 				'Content-Type': 'application/json;charset=utf-8',
// 			},
// 			body: JSON.stringify({ email: INPUTS.email.value }),
// 		},
// 		changeName: {
// 			method: 'PATCH',
// 			headers: {
// 				'Content-Type': 'application/json;charset=utf-8',
// 				Authorization: `Bearer ${Cookies.get('userToken')}`,
// 			},
// 			body: JSON.stringify({ name: INPUTS.userName.value }),
// 		},
// 		history: {
// 			method: 'GET',
// 			headers: {
// 				'Content-Type': 'application/json;charset=utf-8',
// 				Authorization: `Bearer ${INPUTS.confirm.value || Cookies.get('userToken')}`,
// 			},
// 		},
// 	},
// });

function requestObj() {
	return {
		url: {
			auth: 'https://edu.strada.one/api/user/me',
			sendToken: 'https://edu.strada.one/api/user',
			changeName: 'https://edu.strada.one/api/user',
			history: 'https://edu.strada.one/api/messages',
		},
		type: {
			auth: {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json;charset=utf-8',
					Authorization: `Bearer ${INPUTS.confirm.value || Cookies.get('userToken')}`,
				},
			},
			sendToken: {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json;charset=utf-8',
				},
				body: JSON.stringify({email: INPUTS.email.value}),
			},
			changeName: {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json;charset=utf-8',
					Authorization: `Bearer ${Cookies.get('userToken')}`,
				},
				body: JSON.stringify({name: INPUTS.userName.value}),
			},
			history: {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json;charset=utf-8',
					Authorization: `Bearer ${INPUTS.confirm.value || Cookies.get('userToken')}`,
				},
			},
		},
	};
}

async function request(name) {
	const url = requestObj().url[name];
	const requestType = requestObj().type[name];
	try {
		const response = await fetch(url, requestType);
		const result = await response.json();
		console.log(result);
		if (response.status < 200 || response.status > 299) {
			throw (response.message);
		}

		return result;
	} catch (error) {
		alert(error);
	}
}

export {getInfo, patch, validMailSend, request, requestObj};

