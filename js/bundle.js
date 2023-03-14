/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
    // Калькулятор калорий

    const result = document.querySelector('.calculating__result span');

    let sex, height, weight, age, ratio = 1.375;

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

    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

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

    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

    function calcTotal() {
        
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '____'; // Можете придумать что угодно
            return;
        }

        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }

    calcTotal();

    function getStaticInformation(selector, activeClass) {
        const elements = document.querySelectorAll(selector);
        // console.log(elements);

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }

                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });

                e.target.classList.add(activeClass);

                calcTotal();
            });
        });
    }

    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {

            if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }

            switch (input.getAttribute('id')) {
                case "height":
                    height = +input.value;
                    break;
                case "weight":
                    weight = +input.value;
                    break;
                case "age":
                    age = +input.value;
                    break;
            }

            calcTotal();
        });
    }

    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_servises__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/servises */ "./js/services/servises.js");


function cards() {
    
    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 62;
            this.changeToRUB();
        }

        changeToRUB() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');
            if (this.classes.length === 0) { // Выставляем значение по умолчанию
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {  
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
                </div>
            `;
            this.parent.append(element);
        }

    }


    (0,_services_servises__WEBPACK_IMPORTED_MODULE_0__.getResourses)('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => { // Деструктуризиует объекты на отдельные свойства
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });

}

// fetch('http://localhost:3000/menu')
//     .then(data => data.json())
//     .then(res => console.log(res));

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_servises__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/servises */ "./js/services/servises.js");
 // Импортировали их сюда



function forms(fromSelector, modalTimerId) {
    
       // Формы отправки данных

       const forms = document.querySelectorAll(fromSelector);
    //    console.log(forms);
       
       const message = {
           loading: 'img/form/spinner.svg',
           success: 'Успешно, Скоро мы с вами свяжемся',
           failure: 'Ошибка или что-то пошло не так'
       };
   
       forms.forEach(item => {
           bindPostData(item);
       });
   
   
       function bindPostData(form) {
           form.addEventListener('submit', (event) => {
               event.preventDefault();
   
               let statusMessage = document.createElement('img');
               statusMessage.src = message.loading; // Подгрузка картинки, вместо текста
               statusMessage.style.cssText = `
                   display: block;
                   margin: 0 auto;
               `;
               // statusMessage.textContent = message.loading;
               // form.append(statusMessage);
   
               form.insertAdjacentElement('afterend', statusMessage);
   
   
               const formData = new FormData(form); // FormData - формирует данные ключ-значение
   
               const json = JSON.stringify(Object.fromEntries(formData.entries())); // fromEntries из массива в объект
   
               // const object = {}; // Для работы с JSON форматом 
               // formData.forEach(function(value, key) {
               //     object[key] = value;
               // });
               // console.log(object);
   
               // fetch('server.php', { // Возвращает promise 
               //     method: "POST",
               //     headers: {
               //         'Content-type': 'application/json'
               //     },
               //     body: JSON.stringify(object)
               // })
               (0,_services_servises__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
               // .then(data => data.text()) // Текстовый ответ от сервера 
               .then(data => { // data - ответ от сервера 
                   console.log(data);
                   showThanksModal(message.success);
                   // setTimeout(() => { // убираем надпись после о результате (Убрали потому что добавили окно благодарности )
                   statusMessage.remove();
               }).catch(() => {
                   showThanksModal(message.failure);
               }).finally(() => {
                   form.reset(); // Очищаем поля после того как ввели 
               });
   
               // Старый способ
               // request.addEventListener('load', () => {
               //     if (request.status === 200) {
               //         console.log(request.response);
               //         showThanksModal(message.success);
               //         form.reset(); // Очищаем поля после того как ввели 
               //         // setTimeout(() => { // убираем надпись после о результате (Убрали потому что добавили окно благодарности )
               //             statusMessage.remove();
               //         // },5000);
               //     } else { 
               //         showThanksModal(message.failure);
               //     }
               // });
           });
       }
   
       //Окно благодарности
   
       function showThanksModal(message) {
           const prevModalDialog = document.querySelector('.modal__dialog');
   
           prevModalDialog.classList.add('hide');
           (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', modalTimerId);
   
           const thanksModal = document.createElement('div'); // Новое модальное окно с благодарностью
           thanksModal.classList.add('modal__dialog');
           thanksModal.innerHTML = `
               <div class="modal__content">
                   <div class="modal__close" data-close>×</div>
                   <div class="modal__title">${message}</div>
               </div>
           `;
   
           document.querySelector('.modal').append(thanksModal); // Вызывается 
           setTimeout(() => {
               thanksModal.remove();
               prevModalDialog.classList.add('show');
               prevModalDialog.classList.remove('hide');
               (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
           },5000);
       }
   
       // fetch('https://jsonplaceholder.typicode.com/posts', { // (Пример) fetch запрос, лучше чем XMLHTTP запрос
       //     method: "POST",
       //     body: JSON.stringify({name: 'Alex'}),
       //     headers: {
       //         'Content-type': 'application/json'
       //     }
       // })
       // .then(response => response.json())
       // .then(json => console.log(json));
   
       // fetch('http://localhost:3000/menu')
       //     .then(data => data.json())
       //     .then(res => console.log(res));
   
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "openModal": () => (/* binding */ openModal)
/* harmony export */ });
// Чтобы экспортировать ф-ции и использовать их в других ф-циях и файлах
// Пришлось вынести их за основную ф-цию modal

function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden'; // Не позволяет прокручивать страницу, когда открыто модальное окно

    // console.log(modalTimerId);

    if (modalTimerId) {
        clearInterval(modalTimerId); // Чтобы оно не высвечивалось постоянно, только один раз или когда пользователь уже нажал на кнопку

    }
}

function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}


function modal(triggerSelector, modalSelector, modalTimerId) {

    const modalTrigger = document.querySelectorAll(triggerSelector), // Атрибут
    //   modalClose = document.querySelector('[data-close]'),
      modal = document.querySelector(modalSelector);

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', () => openModal(modalSelector, modalTimerId)); // Ещё раз колбэк ф-ция для того чтоб openmodal не срабатывала
                                                                       // сразу как загрузится страница, после клика внутри себя она запускает openmodal!!!
    });


    // modalClose.addEventListener('click', () => {
    //     modal.classList.add('hide');
    //     modal.classList.remove('show');
    //     document.body.style.overflow = ''; 
    // });

    // modalClose.addEventListener('click', closeModal);


    modal.addEventListener('click', (event) => { // При клике на подложку окно закрывается 
        if (event.target === modal || event.target.getAttribute('data-close') == '') {
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.code === "Escape" && modal.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });


    function ShowModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) { // Сравниваем прокрутку, которая справа и контент который мы видим, складываем, если сумма будет больше чем с полным сайтом который у нас открыт
            openModal(modalSelector, modalTimerId); // Если условие выполняется, означает что пользователь долистал страницу
            window.removeEventListener('scroll', ShowModalByScroll);
        }
    }
    window.addEventListener('scroll', ShowModalByScroll);

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {

    // Slider 

    const slides = document.querySelectorAll(slide),
        slider = document.querySelector(container),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        total = document.querySelector(totalCounter),
        current = document.querySelector(currentCounter),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field),
        width = window.getComputedStyle(slidesWrapper).width;

    let slideIndex = 1;
    let offset = 0; // Отступ 


    // if (slides.length < 10) {
    //     total.textContent = `0${slides.length}`;
    //     current.textContent = `0${slideIndex}`;
    // } else { 
    //     total.textContent = slides.length;
    //     current.textContent = slideIndex;
    // }


    slidesField.style.width = 100 * slides.length + '%'; // Через инлайн стили задали одинаковую ширину
    slidesField.style.display = 'flex'; // Расположили по горизонтали все слайды 
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden'; // Спрятали все элементы

    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
        dots = [];

    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 15;
      display: flex;
      justify-content: center;
      margin-right: 15%;
      margin-left: 15%;
      list-style: none;
    `;
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) { // Создаем точки 
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
          box-sizing: content-box;
          flex: 0 1 auto;
          width: 30px;
          height: 6px;
          margin-right: 3px;
          margin-left: 3px;
          cursor: pointer;
          background-color: #fff;
          background-clip: padding-box;
          border-top: 10px solid transparent;
          border-bottom: 10px solid transparent;
          opacity: .5;
          transition: opacity .6s ease;
      `;
        if (i === 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');
    }

    function activeButton(dot) { // Подсвечивание активной кнопки
        dot.forEach(dot => dot.style.opacity = '.5');
        dot[slideIndex - 1].style.opacity = 1;
    }

    next.addEventListener('click', () => {
        if (offset == deleteNotDigits(width) * (slides.length - 1)) { // '500px' Нужно отрезать 'px' 
            offset = 0;
        } else {
            offset += +deleteNotDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

        activeButton(dots);
        // dots.forEach(dot => dot.style.opacity = '.5'); // Подсвечивание активной кнопки
        // dots[slideIndex - 1].style.opacity = 1;
    });

    prev.addEventListener('click', () => {
        if (offset == 0) { // 
            offset = deleteNotDigits(width) * (slides.length - 1); // Смещение на последний слайд
        } else {
            offset -= deleteNotDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

        activeButton(dots);
        // dots.forEach(dot => dot.style.opacity = '.5');
        // dots[slideIndex - 1].style.opacity = 1;
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (event) => {
            const slideTo = event.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = deleteNotDigits(width) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            if (slides.length < 10) {
                current.textContent = `0${slideIndex}`;
            } else {
                current.textContent = slideIndex;
            }

            activeButton(dots);
            // dots.forEach(dot => dot.style.opacity = '.5');
            // dots[slideIndex - 1].style.opacity = 1;

        });
    });

    // Страрый код slider, простой 

    // showSlides(slideIndex);

    // if (slides.length < 10) {
    //     total.textContent = `0${slides.length}`;
    // } else { 
    //     total.textContent = slides.length;
    // }

    // function showSlides(n) {
    //     if (n > slides.length) {
    //         slideIndex = 1;
    //     }

    //     if (n < 1) {
    //         slideIndex = slides.length;
    //     }

    //     slides.forEach((item) => item.style.display = 'none');
    //     slides[slideIndex - 1].style.display = 'block';


    //     if (slides.length < 10) {
    //         current.textContent = `0${slideIndex}`;
    //     } else { 
    //         current.textContent = slideIndex;
    //     }
    // }

    // function plusSlides(n) {
    //     showSlides(slideIndex += n);
    // }

    // prev.addEventListener('click', () => {
    //     plusSlides(-1);
    // });

    // next.addEventListener('click', () => {
    //     plusSlides(1);
    // });

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {

    const tabs = document.querySelectorAll(tabsSelector),
        tabsContent = document.querySelectorAll(tabsContentSelector),
        tabsParent = document.querySelector(tabsParentSelector);

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide'); // добавляем класс hide для таба на который кликнули
            item.classList.remove('show', 'fade'); // убираем класс show для таба на который кликнули
        });

        tabs.forEach(item => {
            item.classList.remove(activeClass); // Убрали подсвечивание 
        });

    }

    function ShowTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade'); // добавляем класс show для таба на который кликнули
        tabsContent[i].classList.remove('hide'); // убираем класс hide для таба на который кликнули
        tabs[i].classList.add(activeClass); // Добавили подсвечивание 
    }
    hideTabContent();
    ShowTabContent();


    tabsParent.addEventListener('click', (event) => { // Добавляем событие в табах, его изменение по клику
        const target = event.target; // Свойство event.target содержит элемент, на котором сработало событие.

        if (target && target.classList.contains(tabsSelector.slice(1))) { // Проверяем кликнукли ли мы на таб (slice, чтобы отрезать точку)
            tabs.forEach((item, i) => {
                if (target == item) { // Сравниваем каждый элемент в tabs с тем на который мы кликнули, если они совпадают, то вызываем функции
                    hideTabContent();
                    ShowTabContent(i);
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
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(id, deadLine) {
    

    function getTimerRemaining(endtime) { //
        let days, hours, minutes, seconds;

        const t = Date.parse(endtime) - Date.parse(new Date()); // Разница между двумя датами в миллисекундах
        // console.log(Date.parse(endtime));
        if (t <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            days = Math.floor(t / (1000 * 60 * 60 * 24)), // Math.floor() - округление до ближайшего целого
            hours = Math.floor((t / (1000 * 60 * 60) % 24)), // % Берем остаток от деления на 24 (хвостик), чтобы получить часы, которые должны быть меньше 24 
            minutes = Math.floor((t / 1000 / 60) % 60), // тоже самое с минутами, не больше 60 
            seconds = Math.floor((t / 1000) % 60);
        }

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }


    function getZero(num) { // Функция, если число не двузначное, то добавляем 0 перед ним
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }


    function setClock(selector, endtime) { // Добавляем таймер на страницу
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000); // Функция будет запускаться через каждую секунду

        updateClock(); // Вызываем тут, Чтобы убрать мигание таймера при обновлении страницы (не выводились данные с верстки)     

        function updateClock() {
            const t = getTimerRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock(id, deadLine);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/servises.js":
/*!*********************************!*\
  !*** ./js/services/servises.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResourses": () => (/* binding */ getResourses),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });

const postData = async (url, data) => { // async и await используются вместе 
    const res = await fetch(url, { // ставим await перед теми операциями, которые нам нужно дождаться 
        method: "POST", // В данном случае (без await) в res может поступить не промис, а пустое значение(ответ от сервера может быть долгим) и будет ошибка, поэтому нужен синхронный код
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });

    return await res.json();
};

const getResourses = async (url) => { // async и await используются вместе 
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status ${res.status}`);
    }

    return await res.json();
};




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
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
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");












window.addEventListener('DOMContentLoaded', () => {

    const modalTimerId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.openModal)('.modal',modalTimerId), 50000); // Через 50 секунд вызовет модальное окно


    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item','.tabcontent','.tabheader__items','tabheader__item_active');
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])('[data-modal]','.modal', modalTimerId);
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__["default"])('.timer', '2023-06-11');
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
    (0,_modules_calc__WEBPACK_IMPORTED_MODULE_4__["default"])();
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_5__["default"])('form', modalTimerId);
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_6__["default"])({ // Деструктуризация 
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
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map