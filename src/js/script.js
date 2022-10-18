import calc from './modules/calc';
import cards from './modules/cards';
import forms from './modules/forms';
import menu from './modules/menu';
import modal from './modules/modal';
import slider from './modules/slider';
import tabs from './modules/tabs';

document.addEventListener('DOMContentLoaded', function() {

    calc();
    cards();
    forms('form');
    calc();
    menu();
    modal('[data-modal]', '.modal-contact');
    slider({
        container: '.offer__slide',
        pagination: '.offer__indicators',
        prevArrow: '.offer__slider-prev',
        nextArrow: '.offer__slider-next',
        wrapper: '.offer__slider-container',
        field: '.offer__slider-inner'
    });
    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
});