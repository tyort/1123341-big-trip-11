import Point from './models/point.js';

const METHOD = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

const API = class {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint; // передаем из main https://htmlacademy-es-10.appspot.com/big-trip/
    this._authorization = authorization; // передаем из main Basic eo0w590ik29889a
  }

  getPoints() {
    return this._load({url: `points`})
      .then((response) => response.json())
      .then(Point.parsePoints); // передаем в models/point точки преобразованные в json
  }

  _load({url, method = METHOD.GET, body = null, headers = new Headers()}) {
  // url - адрес сервера
  // headers - по умолчанию передаем пустые заголовки, если не передаем самостоятельно
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        throw err;
      });
  }
};

export default API;
