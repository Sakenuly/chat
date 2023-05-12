const BUTTONS = {
	settings: document.querySelector('.chat__settings'),
	exit: document.querySelector('.chat__exit'),
	send: document.querySelector('.chat__send-message'),
	closePopup: document.querySelectorAll('.popup__close'),
	enterCode: document.querySelector('.form__button-enter'),
	entry: document.querySelector('.form__button-entry'),
	getCode: document.querySelector('.form__button-get'),
	applyName: document.querySelector('.form__send-name'),
};
const CLOSE_BUTTONS = {
	confirmation: document.querySelector('#close-confirmation'),
	settings: document.querySelector('#close-settings'),
};
const CHAT_ITEMS = {
	messageContainer: document.querySelector('.chat__list-messages'),
};
const INPUTS = {
	message: document.querySelector('.chat__input'),
	confirm: document.querySelector('#code'),
	email: document.querySelector('#mail'),
	userName: document.querySelector('.form__input'),
};

export {BUTTONS, CLOSE_BUTTONS, INPUTS, CHAT_ITEMS};
