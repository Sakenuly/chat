import {BUTTONS, CLOSE_BUTTONS, INPUTS, CHAT_ITEMS} from './const.js';
import Cookies from 'js-cookie';
import {request} from './fetch.js';
import {openSocket, socket} from './socket.js';
function authCheck() {
	if (Cookies.get('userToken')) {
		openSocket();
		document.documentElement.className = '';
	} else {
		document.documentElement.className = '_active-popup-authorization';
	}
}

function checkCode(e) {
	e.preventDefault();
	let code = '';
	if (INPUTS.confirm.value.trim().length) {
		code = INPUTS.confirm.value;
	} else {
		INPUTS.confirm.value = '';
	}

	if (code) {
		document.documentElement.className = '';
		INPUTS.confirm.value = '';
	}
}

function updateName() {
	request('auth')
		.then(data => {
			INPUTS.userName.value = data.name;
		});
}

function addClassPopup(e) {
	e.preventDefault();
	const targetElement = e.target;
	if (targetElement === BUTTONS.enterCode) {
		document.documentElement.classList.add('_active-popup-confirmation');
	} else if (targetElement === CLOSE_BUTTONS.confirmation || targetElement.classList.contains('popup__wrapper')) {
		document.documentElement.classList.remove('_active-popup-confirmation');
	}

	if (targetElement === BUTTONS.settings) {
		updateName();
		document.documentElement.classList.add('_active-popup-settings');
	} else if (targetElement === CLOSE_BUTTONS.settings || targetElement.classList.contains('popup__wrapper')) {
		document.documentElement.classList.remove('_active-popup-settings');
	}

	if (targetElement === BUTTONS.exit) {
		document.documentElement.className = '_active-popup-authorization';
		Cookies.remove('userToken');
		Cookies.remove('userMail');
		CHAT_ITEMS.messageContainer.textContent = '';
		socket.close();
	}
}

export {checkCode, addClassPopup, authCheck, updateName};
