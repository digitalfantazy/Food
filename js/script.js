'use strict';

import tabs from'./modules/tabs';
import modal from'./modules/modal';
import timer from'./modules/timer';
import cards from'./modules/cards';
import calc from'./modules/calc';
import forms from'./modules/forms';
import slider from'./modules/slider';
import { openModal } from './modules/modal';


window.addEventListener('DOMContentLoaded', () => {

    const modalTimerId = setTimeout(() => openModal('.modal',modalTimerId), 50000); // Через 50 секунд вызовет модальное окно


    tabs('.tabheader__item','.tabcontent','.tabheader__items','tabheader__item_active');
    modal('[data-modal]','.modal', modalTimerId);
    timer('.timer', '2023-06-11');
    cards();
    calc('.calculating__result span');
    forms('form', modalTimerId);
    slider({ // Деструктуризация 
        container: '.offer__slider',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        slide: '.offer__slide',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });


});