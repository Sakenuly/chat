import Cookies from 'https://cdn.skypack.dev/js-cookie@3.0.5';
import {renderMessages} from './messages.js';
import {CHAT_ITEMS} from './const.js';
let socket;
const newMessageArray = [];
const heigthContainer = CHAT_ITEMS.messageContainer.clientHeight;
const scrollUp = CHAT_ITEMS.messageContainer.scrollTop * -1;
const buttonDown = document.querySelector('.button-up');
const getBottomElem = document.elementFromPoint(CHAT_ITEMS.messageContainer.offsetLeft, CHAT_ITEMS.messageContainer.offsetHeight + CHAT_ITEMS.messageContainer.offsetTop).querySelector('.chat__text');
// Const scrollDate = document.elementFromPoint(ul.offsetLeft, ul.offsetTop).querySelector('.chat__text').getAttribute('data-date');

function openSocket() {
	socket = new WebSocket(`wss://edu.strada.one/websockets?${Cookies.get('userToken')}`);
	socket.onopen = function () {
		renderMessages();
	};

	socket.onclose = function () {
		if (Cookies.get('userToken')) {
			openSocket();
			console.log('работаем');
		} else {
			console.log('закрыто');
		}
	};

	socket.onmessage = function (event) {
		if (buttonDown.classList.contains('_active-down')) {
			newMessageArray.push(JSON.parse(event.data)._id);
		}

		buttonDown.textContent = newMessageArray.length;
		renderMessages();
	};
}

export {socket, openSocket, newMessageArray};
