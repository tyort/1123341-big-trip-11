import Point from '../models/point.js';

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

export default class Api {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint; // передаем из main https://htmlacademy-es-10.appspot.com/big-trip/
    this._authorization = authorization; // передаем из main Basic eo0w590ik29889a
  }

  getPoints() {
    return this._load({url: `points`})
      .then((response) => response.json()) // получаю Promise в режиме Pending
      .then(Point.parsePoints); // передаем в models/point точки преобразованные в json
  }

  createPoint(point) {
    return this._load({
      url: `points`,
      method: METHOD.POST,
      body: JSON.stringify(point.toRAW()),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then((response) => response.json())
      .then(Point.parsePoint);
  }

  updatePoint(id, data) {
    return this._load({
      url: `points/${id}`,
      method: METHOD.PUT,
      body: JSON.stringify(data.toRAW()),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then((response) => response.json())
      .then(Point.parsePoint);
  }

  deletePoint(id) {
    return this._load({url: `points/${id}`, method: METHOD.DELETE});
  }

  sync(data) {
    return this._load({
      url: `points/sync`,
      method: METHOD.POST,
      body: JSON.stringify(data),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then((response) => response.json());
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
}
