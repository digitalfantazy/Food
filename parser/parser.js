'use strict';

window.addEventListener('DOMContentLoaded', () => {

    const body = document.querySelector('body');
    let textNodes = [];

    function recursy (element) { // Прошлись по всему DOM-дереву и выведи все что есть на сайте 
        element.childNodes.forEach(node => {

            if (node.nodeName.match(/^H\d/)) { // Поиск по элементам, которые начинаюьтся с H 
                const obj = {
                    header: node.nodeName,
                    content: node.textContent
                };
                textNodes.push(obj);
            } else {
                recursy(node);
            }
        });
    }

    recursy(body);

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(textNodes)
    })
    .then(response => response.json())
    .then(json => console.log(json));
});