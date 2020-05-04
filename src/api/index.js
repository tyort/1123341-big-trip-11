import Point from '../models/point.js';
<<<<<<< HEAD
import Destination from '../models/destination.js';
import Offers from '../models/offers.js';

const Method = {
=======

const METHOD = {
>>>>>>> 9660486227da763a628df2cc5fea05f37748fc9e
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

const checkStatus = (response) => {
<<<<<<< HEAD
  if (response.status < 200 && response.status >= 300) {
    throw new Error(`${response.status}: ${response.statusText}`);
  }

  return response;
=======
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
>>>>>>> 9660486227da763a628df2cc5fea05f37748fc9e
};

export default class Api {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getPoints() {
    return this._load({url: `points`})
      .then((response) => response.json())
      .then(Point.parsePoints);
  }

<<<<<<< HEAD
  getDestinations() {
    return this._load({url: `destinations`})
      .then((response) => response.json())
      .then(Destination.parseDestinations);
  }

  getOffers() {
    return this._load({url: `offers`})
      .then((response) => response.json())
      .then(Offers.parseTypes);
  }

  createPoint(point) {
    return this._load({
      url: `points`,
      method: Method.POST,
=======
  createPoint(point) {
    return this._load({
      url: `points`,
      method: METHOD.POST,
>>>>>>> 9660486227da763a628df2cc5fea05f37748fc9e
      body: JSON.stringify(point.toRAW()),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then((response) => response.json())
      .then(Point.parsePoint);
  }

<<<<<<< HEAD
  updatePoint(id, pointModel) {
    return this._load({
      url: `points/${id}`,
      method: Method.PUT,
      body: JSON.stringify(pointModel.toRAW()),
=======
  updatePoint(id, data) {
    return this._load({
      url: `points/${id}`,
      method: METHOD.PUT,
      body: JSON.stringify(data.toRAW()),
>>>>>>> 9660486227da763a628df2cc5fea05f37748fc9e
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then((response) => response.json())
      .then(Point.parsePoint);
  }

  deletePoint(id) {
<<<<<<< HEAD
    return this._load({url: `points/${id}`, method: Method.DELETE});
  }

  sync(points) {
    return this._load({
      url: `points/sync`,
      method: Method.POST,
      body: JSON.stringify(points),
=======
    return this._load({url: `points/${id}`, method: METHOD.DELETE});
  }

  sync(data) {
    return this._load({
      url: `points/sync`,
      method: METHOD.POST,
      body: JSON.stringify(data),
>>>>>>> 9660486227da763a628df2cc5fea05f37748fc9e
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then((response) => response.json());
  }

<<<<<<< HEAD
  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
=======
  _load({url, method = METHOD.GET, body = null, headers = new Headers()}) {
>>>>>>> 9660486227da763a628df2cc5fea05f37748fc9e
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        throw err;
      });
  }
}

