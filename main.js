
import {BUTTONS} from './const.js';
import {patch, getInfo, validMailSend} from './fetch.js';
import {checkCode, addClassPopup} from './DOM.js';
import {buttonDown, scrollDown} from './scroll.js';
// Import {sendMessage} from './modules/messages';
import {authCheck} from './DOM.js';
BUTTONS.applyName.addEventListener('click', patch);
BUTTONS.entry.addEventListener('click', getInfo);
BUTTONS.getCode.addEventListener('click', validMailSend);
BUTTONS.entry.addEventListener('click', checkCode);
// BUTTONS.send.addEventListener('click', sendMessage);
document.addEventListener('click', addClassPopup);
buttonDown.addEventListener('click', scrollDown);
authCheck();
