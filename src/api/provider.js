import {nanoid} from "nanoid";
import Point from '../models/point.js';
<<<<<<< HEAD
import Destination from '../models/destination.js';
import Offers from '../models/offers.js';
=======
>>>>>>> 9660486227da763a628df2cc5fea05f37748fc9e

const getSyncedPoints =
  (items) => items.filter(({success}) => success).map(({payload}) => payload.point);

export default class Provider {
  constructor(api, store) {
    this._api = api;
<<<<<<< HEAD
    this._storePoints = store.points;
    this._storeDestinations = store.destinations;
    this._storeOffers = store.offers;
=======
    this._store = store;
>>>>>>> 9660486227da763a628df2cc5fea05f37748fc9e
    this._isSynchronized = true;
  }

  getPoints() {
    if (this._isOnLine()) {
      return this._api.getPoints().then(
          (points) => {
<<<<<<< HEAD
            points.forEach((it) => this._storePoints.setItem(it.id, it.toRAW())); // при наличии интернета все равно складываем в store данные
=======
            points.forEach((it) => this._store.setItem(it.id, it.toRAW())); // при наличии интернета все равно складываем в store данные
>>>>>>> 9660486227da763a628df2cc5fea05f37748fc9e
            return points;
          }
      );
    }

<<<<<<< HEAD
    const storePoints = Object.values(this._storePoints.getAll());
    this._isSynchronized = false;
    return Promise.resolve(Point.parsePoints(storePoints));
  }

  getDestinations() {
    if (this._isOnLine()) {
      return this._api.getDestinations().then(
          (destinations) => {
            destinations.forEach((it) => this._storeDestinations.setItem(it.name, it.toRAW()));
            return destinations;
          }
      );
    }

    const storeDestinations = Object.values(this._storeDestinations.getAll());
    this._isSynchronized = false;
    return Promise.resolve(Destination.parseDestinations(storeDestinations));
  }

  getOffers() {
    if (this._isOnLine()) {
      return this._api.getOffers().then(
          (types) => {
            types.forEach((it) => this._storeOffers.setItem(it.type, it.toRAW()));
            return types;
          }
      );
    }

    const storeOffers = Object.values(this._storeOffers.getAll());
    this._isSynchronized = false;
    return Promise.resolve(Offers.parseTypes(storeOffers));
=======
    const storePoints = Object.values(this._store.getAll());
    this._isSynchronized = false;
    return Promise.resolve(Point.parsePoints(storePoints)); // в качестве значения отправить точки, но в виде json
>>>>>>> 9660486227da763a628df2cc5fea05f37748fc9e
  }

  createPoint(point) {
    if (this._isOnLine()) {
      return this._api.createPoint(point).then(
          (newPoint) => {
<<<<<<< HEAD
            this._storePoints.setItem(newPoint.id, newPoint.toRAW());
=======
            this._store.setItem(newPoint.id, newPoint.toRAW());
>>>>>>> 9660486227da763a628df2cc5fea05f37748fc9e
            return newPoint;
          }
      );
    }

<<<<<<< HEAD
=======
    // Нюанс в том, что при создании мы не указываем id задачи, нам его в ответе присылает сервер.
    // Но на случай временного хранения мы должны позаботиться и о временном id
>>>>>>> 9660486227da763a628df2cc5fea05f37748fc9e
    const fakeNewPointId = nanoid();
    const fakeNewPoint = Point.parsePoint(Object.assign({}, point.toRAW(), {id: fakeNewPointId}));

    this._isSynchronized = false;
<<<<<<< HEAD
    this._storePoints.setItem(fakeNewPoint.id, Object.assign({}, fakeNewPoint.toRAW(), {offline: true}));
=======
    this._store.setItem(fakeNewPoint.id, Object.assign({}, fakeNewPoint.toRAW(), {offline: true}));
>>>>>>> 9660486227da763a628df2cc5fea05f37748fc9e

    return Promise.resolve(fakeNewPoint);
  }

  updatePoint(id, point) {
    if (this._isOnLine()) {
      return this._api.updatePoint(id, point).then(
          (newPoint) => {
<<<<<<< HEAD
            this._storePoints.setItem(newPoint.id, newPoint.toRAW());
=======
            this._store.setItem(newPoint.id, newPoint.toRAW());
>>>>>>> 9660486227da763a628df2cc5fea05f37748fc9e
            return newPoint;
          }
      );
    }

    const fakeUpdatedPoint = Point.parsePoint(Object.assign({}, point.toRAW(), {id}));

    this._isSynchronized = false;
<<<<<<< HEAD
    this._storePoints.setItem(id, Object.assign({}, fakeUpdatedPoint.toRAW(), {offline: true}));
=======
    this._store.setItem(id, Object.assign({}, fakeUpdatedPoint.toRAW(), {offline: true}));
>>>>>>> 9660486227da763a628df2cc5fea05f37748fc9e

    return Promise.resolve(fakeUpdatedPoint);
  }

  deletePoint(id) {
    if (this._isOnLine()) {
      return this._api.deletePoint(id).then(
          () => {
<<<<<<< HEAD
            this._storePoints.removeItem(id);
=======
            this._store.removeItem(id);
>>>>>>> 9660486227da763a628df2cc5fea05f37748fc9e
          }
      );
    }

    this._isSynchronized = false;
<<<<<<< HEAD
    this._storePoints.removeItem(id);
=======
    this._store.removeItem(id);
>>>>>>> 9660486227da763a628df2cc5fea05f37748fc9e

    return Promise.resolve();
  }

  sync() {
    if (this._isOnLine()) {
<<<<<<< HEAD
      const storePoints = Object.values(this._storePoints.getAll());
=======
      const storePoints = Object.values(this._store.getAll());
>>>>>>> 9660486227da763a628df2cc5fea05f37748fc9e

      return this._api.sync(storePoints)
        .then((response) => {
          storePoints.filter((point) => point.offline).forEach((point) => {
<<<<<<< HEAD
            this._storePoints.removeItem(point.id);
=======
            this._store.removeItem(point.id);
>>>>>>> 9660486227da763a628df2cc5fea05f37748fc9e
          });

          const createdPoints = getSyncedPoints(response.created);
          const updatedPoins = getSyncedPoints(response.updated);

          [...createdPoints, ...updatedPoins].forEach((point) => {
<<<<<<< HEAD
            this._storePoints.setItem(point.id, point);
=======
            this._store.setItem(point.id, point);
>>>>>>> 9660486227da763a628df2cc5fea05f37748fc9e
          });

          this._isSynchronized = true;

          return Promise.resolve();
        });
    }

    return Promise.reject(new Error(`Sync data failed`));
  }

  getSynchronize() {
    return this._isSynchronized;
  }

  _isOnLine() {
    return window.navigator.onLine;
  }
}
