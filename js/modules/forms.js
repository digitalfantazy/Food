import { closeModal, openModal } from "./modal"; // Импортировали их сюда
import { postData } from "../services/servises";


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
               postData('http://localhost:3000/requests', json)
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
           openModal('.modal', modalTimerId);
   
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
               closeModal('.modal');
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

export default forms;