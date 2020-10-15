'use strict';

import tabs from './modules/tabs';
import modal from './modules/modal';
import timer from './modules/timer';
import calc from './modules/calc';
import cards from './modules/cards';
import forms from './modules/forms';
import slider from './modules/slider';
import {openModal} from './modules/modal';


window.addEventListener('DOMContentLoaded', () => {

    const modalTamerId = setTimeout(() => openModal('.modal', modalTamerId), 50000);


    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    modal('[data-modal]', '.modal', modalTamerId);
    timer('.timer', '2020-11-10');
    calc();
    cards();
    forms('form', modalTamerId);
    slider({
        container: '.offer__slider',
        slide: '.offer__slide',
        next: '.offer__slider-next',
        prev: '.offer__slider-prev',
        total: '#total',
        current: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
});
