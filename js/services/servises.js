
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

export {postData};
export {getResourses};