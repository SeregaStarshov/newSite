
import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopup from './modules/togglePopup';
import tabs from './modules/tabs';
import slider from './modules/slider';
import showCommandPhoto from './modules/showСommandPhoto';
import validation from './modules/validation';
import calc from './modules/calc';
import sendForm from './modules/sendForm';

//Таймер=========================================
countTimer('12 September 2021 00:59');

//Меню================================
toggleMenu();

//popup=========================================
togglePopup();

//tabs=============================================================
tabs();
//слайдер============================================
slider();

//dataAttributes=====================================
showCommandPhoto();

//поля ввода===========================================
validation();

//калькулятор=======================================================
calc(100);

//send-ajax-form=======================================
sendForm();
console.log(55)