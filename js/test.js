'use strict';



window.addEventListener('DOMContentLoaded', () => {

    // Tabs

    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabItems = document.querySelector('.tabheader__items');
    // console.log(tabItems);
    
    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function ShowTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');

    }
    hideTabContent();
    ShowTabContent();

    tabItems.addEventListener('click', (event) => {
        const target = event.target;
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    ShowTabContent(i);
                }
            });
        }
    });


    // Блок с калориями

    const btnItems = document.querySelectorAll('[data-choose]'),
          btnItems2 = document.querySelectorAll('[data-choose1]'),
          gender = document.getElementById('gender'),
          activityItems = document.querySelector('.calculating__choose.calculating__choose_big');
  
    // console.log(btnItems2);

    function buttonDeActive(btn) {
        btn.forEach(item => {
            item.classList.remove('calculating__choose-item_active');
        });
    }

    function buttonActive(btn, i = 0) {
        btn[i].classList.add('calculating__choose-item_active');


    }

    gender.addEventListener('click', (event) => {
        const target = event.target;
        if (target && target.classList.contains('gender')) {
            btnItems.forEach((item, i) => {
                if (target == item) {
                    buttonDeActive(btnItems);
                    buttonActive(btnItems, i);
                }
            });
        }
    });

    function buttonDeActivePhysAct(btn) {
        btn.forEach(item => {
            item.classList.remove('calculating__choose-item_active');
        });

    }
    function buttonActivePhysAct(btn, i = 0) {
        btn[i].classList.add('calculating__choose-item_active');

    }

    activityItems.addEventListener('click', (event) => {
        const target = event.target;
        if (target && target.classList.contains('physAct')) {
            btnItems2.forEach((item, i) => {
                if (target == item) {
                    buttonDeActivePhysAct(btnItems2);
                    buttonActivePhysAct(btnItems2, i);
                    
                }
            });
        }
    });

    // Подсчет калорий

    const addData = document.querySelector('form'),
          addHeight = document.getElementById('height'),
          addWeight = document.getElementById('weight'),
          addAge = document.getElementById('age');

    // console.log(addData);
    let newDataHeight = '';
    let newDataWeight = '';
    let newDataAge = '';

    addData.addEventListener('submit', (event) => {
        event.preventDefault();
        newDataHeight = addHeight.value;
        // console.log(newDataHeight);
    });

    addData.addEventListener('submit', (event) => {
        event.preventDefault();
        newDataWeight = addWeight.value;
        // console.log(newDataWeight);
    });
        
    addData.addEventListener('submit', (event) => {
        event.preventDefault();
        newDataAge = addAge.value;
        // console.log(newDataAge);
        calcResult();      
    });
    
    const Kalories = document.querySelector('div.calculating__result');
    Kalories.innerHTML = ``;
    function calcResult() {
        let result = (10 * newDataHeight) + (6.25 * newDataWeight) + (5 * newDataAge) + 5;
        Kalories.innerHTML = `  
            <div class="calculating__result">
                <span> ${result} </span> ккал
            </div> `;

        // console.log(result);
        // console.log(Kalories);
        
    }

    // Timer 

    const deadLine = '2022-09-20';

    function getTime(endtime) {
        let days, hours, minutes, seconds; 
        const t = Date.parse(endtime) - Date.parse(new Date());// Разница между двумя датами в миллисекундах

        if (t <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            seconds = Math.floor((t / 1000) % 60); 
            days = Math.floor(t / (1000 * 60 * 60 * 24)), // Math.floor() - округление до ближайшего целого
            hours = Math.floor((t / (1000 * 60 * 60) % 24 )), // % Берем остаток от деления на 24 (хвостик), чтобы получить часы, которые должны быть меньше 24 
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

    function Zero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;    
        } else {
            return num;
        }
    }    


    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);

        updateClock();
        
        function updateClock() {
            const t = getTime(endtime);
            // console.log(t);

            days.innerHTML = Zero(t.days);
            hours.innerHTML = Zero(t.hours);
            minutes.innerHTML = Zero(t.minutes);
            seconds.innerHTML = Zero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadLine);

    // ModalWindow

    const modaltrigger = document.querySelectorAll('[data-modal]'),
        //   modalClose = document.querySelector('[data-close]'),
          modal = document.querySelector('.modal');
    
    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimer);
    }     

    modaltrigger.forEach(btn => {
        btn.addEventListener('click', openModal); 
    });

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    // modalClose.addEventListener('click', closeModal);

    modal.addEventListener('click', (event) => {
        if(event.target == modal || event.target.getAttribute('data-close') == false) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.code === "Escape" && modal.classList.contains('show')) {
            closeModal();
        }
    });

    const modalTimer = setInterval(openModal, 50000);

    function showModalScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalScroll);
        }
    }

    window.addEventListener('scroll', showModalScroll);

    // Используем классы 
    
    class MenuCard {
        constructor(src, alt, subtitle, description, price, parentSelector) {
            this.src = src;
            this.alt = alt;
            this.subtitle = subtitle;
            this.description = description;
            this.price = price;
            this.currency = 62;
            this.parent = document.querySelector(parentSelector);
            this.changeToRUB();
        }

        changeToRUB() {
            this.price = this.price * this.currency; // Меняем валюту 
        }

        render() {
            const element = document.createElement('div');
            element.innerHTML = `
                <div class="menu__item">
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.subtitle}</h3>
                    <div class="menu__item-descr">${this.description}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
                    </div>
                </div>
            `;
            this.parent.append(element); // Выводим на страницу элемент
        }
    }
    
    const getResourse = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error (`Could not fetch ${url}, status ${res.status}`);
        }

        return await res.json();
    };

    getResourse('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });

    // new MenuCard( // С помощью классов, добавили каждую карточку меню, передаем те данные которые в конструкторе были записаны как ${this....}
    //     "img/tabs/vegy.jpg",
    //     "vegy",
    //     'Меню "Фитнес"',
    //     'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    //     9,
    //     '.menu .container'
    // ).render();
    
    // new MenuCard(
    //     "img/tabs/elite.jpg",
    //     "elite",
    //     'Меню “Премиум”',
    //     'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    //     14,
    //     '.menu .container'
    // ).render();

    // new MenuCard(
    //     "img/tabs/post.jpg",
    //     "post",
    //     'Меню "Постное"',
    //     'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    //     21,
    //     '.menu .container'
    // ).render();

    // Форма отравки данных на сервер

    const forms = document.querySelectorAll('form');
    
    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Успешно, Мы скоро с вами свяжемся',
        failure: 'Ошибка или что-то пошло не так'
    };


    forms.forEach(item => {
        bindpostData(item);
    });

    const postData = async (url, data) => {
        const res = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: data
            });
        return await res.json();
    };

    function bindpostData(form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            let statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            // const request = new XMLHttpRequest();
            // request.open('POST', 'server.php');
            // request.setRequestHeader('Content-type', 'application/json');
            // // console.log(request.responseText);
            
            const formData = new FormData(form); // FormData - формирует данные ключ-значение

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            // const object = {};
            // formData.forEach(function(key, value) {
            //     object[key] = value;
            // });
            // console.log(object);

            // const json = JSON.stringify(object);
            // console.log(object);
            // fetch('server.php', {
            //     method: "POST",
            //     headers: {
            //         'Content-type': 'application/json'
            //     },
            //     body: JSON.stringify(object)
            // })

            postData('http://localhost:3000/requests', json)
            // .then(data => data.text())
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                // form.reset(); // Очищаем поля после того как ввели 
                // setTimeout(() => { // убираем надпись после о результате (Убрали потому что добавили окно благодарности )
                    statusMessage.remove();
                // },5000);
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset(); // Очищаем поля после того как ввели 
            });


            // request.send(json);

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

    // Окно благодарности 

    function showThanksModal(message) {

        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div data-close class="modal__close">×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        document.querySelector('.modal').append(thanksModal);
        
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        },5000);
    }

    // Slider 

    const slides = document.querySelectorAll('.offer__slide'),
          slider = document.querySelector('.offer__slider'),
          prev = document.querySelector('.offer__slider-prev'),
          next = document.querySelector('.offer__slider-next'),
          total = document.querySelector('#total'),
          current = document.querySelector('#current'),
          slidesWrapper = document.querySelector('.offer__slider-wrapper'),
          slidesField = document.querySelector('.offer__slider-inner'),
          width = window.getComputedStyle(slidesWrapper).width;

    let slideIndex = 1;
    let offset = 0;

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach((slide) => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
          dots = [];

    indicators.classList.add('caraousel-indicators');
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
        if (offset == deleteNotDigits(width) * (slides.length - 1)) {
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
    });

    prev.addEventListener('click', () => {
        if (offset == 0 ) {
            offset = deleteNotDigits(width) * (slides.length - 1);
        } else {
            offset -= +deleteNotDigits(width);
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
    });

    dots.forEach(dot => { // Переключение по точкам
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

        });
    });
    


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

    //     if (slides.length < 10) {
    //         current.textContent = `0${slideIndex}`;
    //     } else {
    //         current.textContent = slideIndex;
    //     }

    //     slides.forEach((item) => item.style.display = 'none'); // Инлайн стили, показ слайдов
    //     slides[slideIndex - 1].style.display = 'block';
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


    // Калькулятор

    const result = document.querySelector('.calculating__result');

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

    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '____';
            return;
        }
        if ( sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }
    calcTotal();

    function getStaticInformation(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.addEventListener('click', (event) => {
                if (event.target.getAttribute('data-ratio')) {
                    ratio = +event.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +event.target.getAttribute('data-ratio'));
                } else {
                    sex = event.target.getAttribute('id');  
                    localStorage.setItem('sex', event.target.getAttribute('id'));
                }

                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });

                event.target.classList.add(activeClass);

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

            switch(input.getAttribute('id')) {
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

    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');




















});