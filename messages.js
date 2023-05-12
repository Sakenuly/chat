import {INPUTS, CHAT_ITEMS, BUTTONS} from './const.js';
import {request} from './fetch.js';
import {socket} from './socket.js';
import {newMessageArray} from './socket.js';
import Cookies from 'js-cookie';

function sendMessageSocket(e) {
	e.preventDefault();
	socket.send(JSON.stringify({text: INPUTS.message.value}));
	CHAT_ITEMS.messageContainer.scrollTop += 1e9;
}

BUTTONS.send.addEventListener('click', sendMessageSocket);

function upperDate(data) {
	const chatDate = document.querySelector('.chat__date');
	chatDate.textContent = data.getDate() + ':' + (Number(data.getMonth()) + 1);
}

// Function renderMessages() {
// 	template.content.replaceChildren();
// 	if (Cookies.get('userToken')) {
// 		request('history')
// 			.then(function render(data, i = 0) {
// 				if (data.messages.length === i) {
// 					CHAT_ITEMS.messageContainer.textContent = '';
// 					CHAT_ITEMS.messageContainer.append(template.content.cloneNode(true));
// 					console.log(data.messages);
// 					messagesDate();

// 					// CHAT_ITEMS["message container"].scrollTop += 1e9
// 					return;
// 				}

// 				const liElem = document.createElement('li');
// 				const date = new Date(data.messages[i].createdAt);
// 				const mins = ('0' + date.getMinutes()).slice(-2);
// 				const time = `${date.getHours()}:${mins}`;
// 				upperDate(date);
// 				liElem.className = 'chat__message';
// 				if (data.messages[i].user.email === Cookies.get('userMail')) {
// 					liElem.classList.add('chat__message_outgoing');
// 					liElem.insertAdjacentHTML('beforeend', `<p class="chat__text chat__text_outgoing" data-date="${data.messages[i].createdAt}">${data.messages[i].user.name + ':' + data.messages[i].text}</p> <span class="chat__time-messages">${time}</span>`);
// 				} else {
// 					liElem.insertAdjacentHTML('beforeend', `<p class="chat__text" data-date="${data.messages[i].createdAt}">${data.messages[i].user.name + ':' + data.messages[i].text}</p> <span class="chat__time-messages">${time}</span>`);
// 				}

// 				template.content.appendChild(liElem);
// 				return render(data, i + 1);
// 			});
// 	}
// }
let gg = 20;
function renderMessages() {
	template.content.replaceChildren();
	if (Cookies.get('userToken')) {
		request('history')
			.then(function render(data, i = 0) {
				if (gg === i) {
					CHAT_ITEMS.messageContainer.textContent = '';
					CHAT_ITEMS.messageContainer.append(template.content.cloneNode(true));
					messagesDate();
					console.log(data.messages);
					// CHAT_ITEMS.messageContainer.scrollTop += 1e9
					return;
				}

				const liElem = document.createElement('li');
				const date = new Date(data.messages[i].createdAt);
				const mins = ('0' + date.getMinutes()).slice(-2);
				const time = `${date.getHours()}:${mins}`;
				upperDate(date);
				liElem.className = 'chat__message';
				if (data.messages[i].user.email === Cookies.get('userMail')) {
					liElem.classList.add('chat__message_outgoing');
					liElem.insertAdjacentHTML('beforeend', `<p class="chat__text chat__text_outgoing" id=${data.messages[i]._id} data-date="${data.messages[i].createdAt}">${data.messages[i].user.name + ':' + data.messages[i].text}</p> <span class="chat__time-messages">${time}</span>`);
				} else {
					liElem.insertAdjacentHTML('beforeend', `<p class="chat__text" id=${data.messages[i]._id} data-date="${data.messages[i].createdAt}">${data.messages[i].user.name + ':' + data.messages[i].text}</p> <span class="chat__time-messages">${time}</span>`);
				}

				template.content.appendChild(liElem);
				return render(data, i + 1, gg);
			});
	}
}

const mS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

const block2 = document.querySelector('.chat__date');
const ul = CHAT_ITEMS.messageContainer;
ul.addEventListener('scroll', messagesDate);

function messagesDate() {
	if (!(document.elementFromPoint(ul.offsetLeft, ul.offsetTop).querySelector('.chat__text'))) {
		return;
	}

	const buttonDown = document.querySelector('.button-up');
	const getBottomElem = document.elementFromPoint(ul.offsetLeft + 10, ul.offsetHeight + ul.offsetTop - 14).querySelector('.chat__text');
	if (document.elementFromPoint(ul.offsetLeft + 10, ul.offsetHeight + ul.offsetTop - 13).classList.contains('chat__message') && newMessageArray.includes(document.elementFromPoint(ul.offsetLeft + 10, ul.offsetHeight + ul.offsetTop - 13).querySelector('.chat__text').getAttribute('id'))) {
		newMessageArray.shift();
		document.elementFromPoint(ul.offsetLeft + 10, ul.offsetHeight + ul.offsetTop - 13).querySelector('.chat__text').removeAttribute('id');
		console.log(getBottomElem);
		console.log(newMessageArray);
		buttonDown.textContent = newMessageArray.length;
		if (buttonDown.textContent === '0') {
			buttonDown.textContent = '▼';
		}
	}

	let scrollDate = document.elementFromPoint(ul.offsetLeft, ul.offsetTop).querySelector('.chat__text').getAttribute('data-date');
	if (scrollDate) {
		scrollDate = new Date(scrollDate);
		block2.textContent = scrollDate.getDate() + ' ' + mS[scrollDate.getMonth()];
	}
}

function checkScroll() {
	const topLimit = CHAT_ITEMS.messageContainer.scrollHeight + (CHAT_ITEMS.messageContainer.scrollTop - CHAT_ITEMS.messageContainer.clientHeight) + 10;
	if (gg === 300) {
		console.log('Сообщений больше нет');
		return CHAT_ITEMS.messageContainer.removeEventListener('scroll', checkScroll);
	}

	if (topLimit === 10) {
		gg += 20;
		renderMessages();
		return topLimit;
	}
}

CHAT_ITEMS.messageContainer.addEventListener('scroll', checkScroll);

export {renderMessages};
