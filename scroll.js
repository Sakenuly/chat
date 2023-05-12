// Cкролл и кнопка вниз
import {CHAT_ITEMS} from './const.js';
const buttonDown = document.querySelector('.button-up');
function scroll() {
	const heigthContainer = CHAT_ITEMS.messageContainer.clientHeight;
	const scrollUp = CHAT_ITEMS.messageContainer.scrollTop * -1;
	if (scrollUp >= (heigthContainer / 2)) {
		buttonDown.classList.add('_active-down');
	} else {
		buttonDown.classList.remove('_active-down');
	}
}

CHAT_ITEMS.messageContainer.addEventListener('scroll', scroll);
function scrollDown() {
	const lastMessage = document.querySelector('.chat__message');
	lastMessage.scrollIntoView({
		block: 'nearest',
		behavior: 'smooth',
	});
}

export {scrollDown, buttonDown};
