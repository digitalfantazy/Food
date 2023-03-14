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

export default tabs;