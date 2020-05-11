import Point from '../models/point.js';
import Destination from '../models/destination.js';
import Offers from '../models/offers.js';

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

const checkStatus = (response) => {
  if (response.status < 200 && response.status >= 300) {
    throw new Error(`${response.status}: ${response.statusText}`);
  }

  return response;
};

export default class Api {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getPoints() {
    return this._load({url: `points`})
      .then((response) => response.json())
      .then(Point.parseReports);
  }

  getDestinations() {
    return this._load({url: `destinations`})
      .then((response) => response.json())
      .then(Destination.parseReports);
  }

  getOffers() {
    return this._load({url: `offers`})
      .then((response) => response.json())
      .then(Offers.parseReports);
  }

  createPoint(point) {
    return this._load({
      url: `points`,
      method: Method.POST,
      body: JSON.stringify(point.toRAW()),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then((response) => response.json())
      .then(Point.parseReport);
  }

  updatePoint(id, pointModel) {
    return this._load({
      url: `points/${id}`,
      method: Method.PUT,
      body: JSON.stringify(pointModel.toRAW()),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then((response) => response.json())
      .then(Point.parseReport);
  }

  deletePoint(id) {
    return this._load({url: `points/${id}`, method: Method.DELETE});
  }

  sync(points) {
    return this._load({
      url: `points/sync`,
      method: Method.POST,
      body: JSON.stringify(points),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then((response) => response.json());
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        throw err;
      });
  }
}
