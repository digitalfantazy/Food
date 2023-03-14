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

export default modal;
export {closeModal};
export {openModal};