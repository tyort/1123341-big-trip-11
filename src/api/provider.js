import {nanoid} from "nanoid";
import Point from '../models/point.js';
import Destination from '../models/destination.js';
import Offers from '../models/offers.js';

const getSyncedPoints =
  (items) => items.filter(({success}) => success).map(({payload}) => payload.point);

export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._storePoints = store.points;
    this._storeDestinations = store.destinations;
    this._storeOffers = store.offers;
    this._isSynchronized = true;
  }

  getSynchronize() {
    return this._isSynchronized;
  }

  getPoints() {
    if (this._isOnLine()) {
      return this._api.getPoints().then(
          (points) => {
            points.forEach((point) => this._storePoints.setItem(point.id, point.toRAW()));
            return points;
          }
      );
    }

    const storePoints = Object.values(this._storePoints.getAll());
    this._isSynchronized = false;
    return Promise.resolve(Point.parseReports(storePoints));
  }

  getDestinations() {
    if (this._isOnLine()) {
      return this._api.getDestinations().then(
          (destinations) => {
            destinations.forEach((point) => this._storeDestinations.setItem(point.name, point.toRAW()));
            return destinations;
          }
      );
    }

    const storeDestinations = Object.values(this._storeDestinations.getAll());
    this._isSynchronized = false;
    return Promise.resolve(Destination.parseReports(storeDestinations));
  }

  getOffers() {
    if (this._isOnLine()) {
      return this._api.getOffers().then(
          (types) => {
            types.forEach((kind) => this._storeOffers.setItem(kind.type, kind.toRAW()));
            return types;
          }
      );
    }

    const storeOffers = Object.values(this._storeOffers.getAll());
    this._isSynchronized = false;
    return Promise.resolve(Offers.parseReports(storeOffers));
  }

  createPoint(point) {
    if (this._isOnLine()) {
      return this._api.createPoint(point).then(
          (newPoint) => {
            this._storePoints.setItem(newPoint.id, newPoint.toRAW());
            return newPoint;
          }
      );
    }

    const fakeNewPointId = nanoid();
    const fakeNewPoint = Point.parseReport(Object.assign({}, point.toRAW(), {id: fakeNewPointId}));

    this._isSynchronized = false;
    this._storePoints.setItem(fakeNewPoint.id, Object.assign({}, fakeNewPoint.toRAW(), {offline: true}));

    return Promise.resolve(fakeNewPoint);
  }

  updatePoint(id, point) {
    if (this._isOnLine()) {
      return this._api.updatePoint(id, point).then(
          (newPoint) => {
            this._storePoints.setItem(newPoint.id, newPoint.toRAW());
            return newPoint;
          }
      );
    }

    const fakeUpdatedPoint = Point.parseReport(Object.assign({}, point.toRAW(), {id}));

    this._isSynchronized = false;
    this._storePoints.setItem(id, Object.assign({}, fakeUpdatedPoint.toRAW(), {offline: true}));

    return Promise.resolve(fakeUpdatedPoint);
  }

  deletePoint(id) {
    if (this._isOnLine()) {
      return this._api.deletePoint(id).then(
          () => {
            this._storePoints.removeItem(id);
          }
      );
    }

    this._isSynchronized = false;
    this._storePoints.removeItem(id);

    return Promise.resolve();
  }

  sync() {
    if (this._isOnLine()) {
      const storePoints = Object.values(this._storePoints.getAll());

      return this._api.sync(storePoints)
        .then((response) => {
          storePoints.filter((point) => point.offline).forEach((point) => {
            this._storePoints.removeItem(point.id);
          });

          const createdPoints = getSyncedPoints(response.created);
          const updatedPoins = getSyncedPoints(response.updated);

          [...createdPoints, ...updatedPoins].forEach((point) => {
            this._storePoints.setItem(point.id, point);
          });

          this._isSynchronized = true;

          return Promise.resolve();
        });
    }

    return Promise.reject(new Error(`Sync data failed`));
  }

  _isOnLine() {
    return window.navigator.onLine;
  }
}
