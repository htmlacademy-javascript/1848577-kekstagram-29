const URL = 'https://29.javascript.pages.academy/kekstagram';
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/'
};
const Method = {
  GET: 'GET',
  POST: 'POST'
};
const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз',
};

const load = (route, errorText = null, method = Method.GET, body = null) =>
  fetch(`${URL}${route}`, {method, body})
    .then((response) => {
      if(!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch(() => {
      throw new Error(errorText ?? errorText.message);
    });

const getData = () => load(Route.GET_DATA);

const sendData = (body) => load(Route.SEND_DATA, ErrorText.SEND_DATA, Method.POST, body);

export {getData, sendData};
