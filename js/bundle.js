/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
function calc() {


    const result = document.querySelector('.calculating__result span');

    let sex, height, weight, age, ratio;

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');

    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');

    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    function initLocalData(selector, activeClass) {
        let elements = document.querySelectorAll(selector);
        elements.forEach(elem => {
            elem.classList.remove(activeClass);
            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass);
            }
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            }
        });
    }
    initLocalData('#gender div', 'calculating__choose-item_active');
    initLocalData('.calculating__choose_big div', 'calculating__choose-item_active');


    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '0000';
            return;
        } 

        if (sex == 'female') {
            result.textContent = ((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio).toFixed(0);
        }else {
            result.textContent = ((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio).toFixed(0);
        }
    }

    calcTotal();

    function getStaticInform (selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute("data-ratio")) {
                    ratio = e.target.getAttribute("data-ratio");
                    localStorage.setItem('ratio', e.target.getAttribute("data-ratio"));
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute("id"));
                }
                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });
                e.target.classList.add(activeClass);
                calcTotal();
            });
        });
    }

    getStaticInform('#gender div', 'calculating__choose-item_active');
    getStaticInform('.calculating__choose_big div', 'calculating__choose-item_active');
    

    function getDynamicInform (selector) {
        const input = document.querySelector(selector);



        input.addEventListener('input', () => {

            if (input.value.match(/\D/g)) {
                input.style.border = '2px solid red';
            } else {
                input.style.border = 'none';
            }

            switch (input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                    
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }
            calcTotal();
        });
        
    }
    getDynamicInform ('#height');
    getDynamicInform ('#weight');
    getDynamicInform ('#age');
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc); 

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _sevices_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../sevices/services */ "./js/sevices/services.js");


function cards(){
    class MenuCard {
        constructor (src, alt, title, descr, price, parantSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parant = document.querySelector(parantSelector);
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');
            if (this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }
            
            element.innerHTML = `
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">Меню ${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
            `;
            this.parant.append(element);

        }
    }

    (0,_sevices_services__WEBPACK_IMPORTED_MODULE_0__.getResours)('http://localhost:3000/menu')
    .then(data => {
        data.data.forEach(({img, altimg, title, descr, price}) => {
            new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
        });
    });


    // function createCard (data) {
    //     data.forEach(({img, altimg, title, descr, price}) => {
    //        const element = document.createElement('div');
    //         element.classList.add('menu__item');
    //         element.innerHTML = `
    //             <img src=${img} alt=${altimg}>
    //             <h3 class="menu__item-subtitle">Меню ${title}</h3>
    //             <div class="menu__item-descr">${descr}</div>
    //             <div class="menu__item-divider"></div>
    //             <div class="menu__item-price">
    //                 <div class="menu__item-cost">Цена:</div>
    //                 <div class="menu__item-total"><span>${price * 27}</span> грн/день</div>
    //             </div>
    //         `;
    //         document.querySelector('.menu .container').append(element);
    //     });
    // }

    // const getCard = async function (url) {
    //     const res = await fetch(url);

    //     if (!res.ok) {
    //         throw new Error(`Could not fetch ${url}, status ${res.status}`);
    //     }

    //     return await res.json();
    // };

    // getCard('http://localhost:3000/menu')
    // .then(data => createCard(data));

    // getCard('http://localhost:3000/menu')
    // .then(data => {
    //     data.forEach(({img, altimg, title, descr, price}) => {
    //         new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
    //     });
    // });    
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards); 

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _sevices_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../sevices/services */ "./js/sevices/services.js");



function forms(formSelector, modalTamerId) {


    const forms = document.querySelectorAll(formSelector);

    const message = {
        loading: 'img/054 spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    function bindPostData (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.append(statusMessage);
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);

            const json = Object.fromEntries(formData.entries());

            
            (0,_sevices_services__WEBPACK_IMPORTED_MODULE_0__.postData)('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksDialog(message.success);
                statusMessage.remove();
            })
            .catch(() => {
                showThanksDialog(message.failure);
            })
            .finally(() => {
                form.reset();
            });  
            
        });
    }

    function showThanksDialog(message) {
        const modalDialog = document.querySelector('.modal__dialog');
        modalDialog.classList.add('hide');
        (0,_modal__WEBPACK_IMPORTED_MODULE_1__.openModal)('.modal', modalTamerId);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div data-close class="modal__close">x</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        document.querySelector('.modal').append(thanksModal);

        setTimeout(() => {
            modalDialog.classList.add('show');
            modalDialog.classList.remove('hide');
            thanksModal.remove();
            (0,_modal__WEBPACK_IMPORTED_MODULE_1__.closeModal)('.modal');
        }, 3000);

    }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/*! namespace exports */
/*! export closeModal [provided] [no usage info] [missing usage info prevents renaming] */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! export openModal [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__,
/* harmony export */   "closeModal": () => /* binding */ closeModal,
/* harmony export */   "openModal": () => /* binding */ openModal
/* harmony export */ });
function openModal(modalSelector, modalTamerId) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    console.log(modalTamerId);
    
    if (modalTamerId) {
        clearTimeout(modalTamerId); 
    }
} 
function closeModal (modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.remove('show');
    modal.classList.add('hide');
    document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector, modalTamerId) {

    const modalBtn = document.querySelectorAll(triggerSelector),
          modal = document.querySelector(modalSelector);


    modalBtn.forEach(element => {
        element.addEventListener('click',() => openModal(modalSelector, modalTamerId));
    });


    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal(modalSelector);
            }   
        });    

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });



    function showModalByScroll () {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal(modalSelector, modalTamerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener ('scroll', showModalByScroll);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _timer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./timer */ "./js/modules/timer.js");
	
	
	function slider({container, slide, next, prev, total, current, wrapper, field}) {

		const slids = document.querySelectorAll(slide),
		      prevArrow = document.querySelector(prev),
		      nextArrow = document.querySelector(next),
		      totalSlids = document.querySelector(total),
		      currentSlid = document.querySelector(current),
		      slidesWrapper = document.querySelector(wrapper),
		      slidesField = document.querySelector(field),
		      width = window.getComputedStyle(slidesWrapper).width,
		      carousel = document.querySelector(container);



	let index = 1;
	let offset = 0;

	function setActiveDot () {
		dotsArr.forEach(dot => {
			dot.style.opacity = '.5';
			dotsArr[index-1].style.opacity = '1';
		});
	}
	function delLetter(arg) {
		return +(arg.replace(/\D/g, ''));
	}

	slidesField.style.width = 100 * slids.length +'%';
	slids.forEach (slide => { 
		slide.style.width = width;
	});

	slidesField.style.display = 'flex';
	slidesField.style.transition = '0.5s all';
	slidesWrapper.style.overflow = 'hidden';
	currentSlid.innerHTML = `${(0,_timer__WEBPACK_IMPORTED_MODULE_0__.getZero)(index)}`;
	totalSlids.textContent = `${(0,_timer__WEBPACK_IMPORTED_MODULE_0__.getZero)(slids.length)}`;

	const dots = document.createElement('ol');
	carousel.style.position = 'relative';
	carousel.append(dots);
	dots.classList.add('carousel-indicators');
	const dotsArr = [];

	for (let i = 0; i < slids.length; i++) {
		const dot = document.createElement('li');
		dot.classList.add('dot');
		dot.setAttribute('data-slide-to', i+1);
		dots.append(dot);
		dotsArr[i] = dot;
	}
	dotsArr[index-1].style.opacity = '1';

	dots.addEventListener('click', e => {
		const slideTo = e.target.getAttribute('data-slide-to');

		offset = delLetter(width) * (slideTo - 1);
		index = slideTo;
		currentSlid.innerHTML = `${(0,_timer__WEBPACK_IMPORTED_MODULE_0__.getZero)(index)}`;

		slidesField.style.transform = `translateX(-${offset}px)`;
		
		setActiveDot();
	});

	nextArrow.addEventListener('click', () => {
		if (offset == delLetter(width) * (slids.length - 1)) {
			offset = 0;
		} else {
			offset += delLetter(width);
		}

		slidesField.style.transform = `translateX(-${offset}px)`;

		if (index == slids.length) {
			index = 1;
			currentSlid.innerHTML = `${(0,_timer__WEBPACK_IMPORTED_MODULE_0__.getZero)(index)}`;
			
		} else {
			index++;
			currentSlid.innerHTML = `${(0,_timer__WEBPACK_IMPORTED_MODULE_0__.getZero)(index)}`;
		}
		setActiveDot();
	});

	prevArrow.addEventListener('click', () => {
		if (offset == 0) {
			offset = delLetter(width) * (slids.length - 1);
			
		} else {
			offset -= delLetter(width);
		}
		slidesField.style.transform = `translateX(-${offset}px)`;

		if (index == 1) {
			index = slids.length;
			currentSlid.innerHTML = `${(0,_timer__WEBPACK_IMPORTED_MODULE_0__.getZero)(index)}`;
		} else {
			index--;
			currentSlid.innerHTML = `${(0,_timer__WEBPACK_IMPORTED_MODULE_0__.getZero)(index)}`;
		}
		setActiveDot();
	});


	}

	/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
function tabs(tabsSelector, tabContentSelector, tabParentSelector, activeClass) {
    const tabs = document.querySelectorAll(tabsSelector),
          tabContent = document.querySelectorAll(tabContentSelector),
          tabParent = document.querySelector(tabParentSelector);

    function hideTabContent() {
        tabContent.forEach(element => {
            element.classList.add('hide');
            element.classList.remove('fade');
        });

        tabs.forEach(element => {
            element.classList.remove(activeClass);
        });
    }

    function showTabContent(i = 0) {
        // tabContent[i].style.display = 'block';
        tabContent[i].classList.remove('hide');
        tabContent[i].classList.add('fade');
        tabs[i].classList.add(activeClass);
    }

    hideTabContent();
    showTabContent();

    tabParent.addEventListener('click', (event) => {
        const target = event.target;
        if (target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((tab, i) => {
                if (tab == target) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs); 

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getZero [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__,
/* harmony export */   "getZero": () => /* binding */ getZero
/* harmony export */ });
function getZero(num) {
    if (num >= 0 && num < 10) {
        return `0${num}`;
    } else {
        return num;
    }
}

function timer (id, deadLine) {

    function getTimeRemeining (endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60)) % 24),
            minutes = Math.floor((t / (1000 * 60)) % 60),
            seconds = Math.floor((t / (1000)) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
            };
        }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds');

        const updater = setInterval(updateClock, 1000);
        updateClock();
        

        function updateClock () {
            const t = getTimeRemeining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(updater);
            }
        }

    }
        
    setClock(id, deadLine);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);


/***/ }),

/***/ "./js/script.js":
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");












window.addEventListener('DOMContentLoaded', () => {

    const modalTamerId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__.openModal)('.modal', modalTamerId), 50000);


    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_4__.default)('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__.default)('[data-modal]', '.modal', modalTamerId);
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_5__.default)('.timer', '2020-11-10');
    (0,_modules_calc__WEBPACK_IMPORTED_MODULE_6__.default)();
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_0__.default)();
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_1__.default)('form', modalTamerId);
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_2__.default)({
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


/***/ }),

/***/ "./js/sevices/services.js":
/*!********************************!*\
  !*** ./js/sevices/services.js ***!
  \********************************/
/*! namespace exports */
/*! export getResours [provided] [no usage info] [missing usage info prevents renaming] */
/*! export postData [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "postData": () => /* binding */ postData,
/* harmony export */   "getResours": () => /* binding */ getResours
/* harmony export */ });
const postData = async function (url, data) {
    const res = await axios.post(url, data);
    return await res;
};
function getResours(url) {
    return axios.get(url);
}




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./js/script.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=bundle.js.map