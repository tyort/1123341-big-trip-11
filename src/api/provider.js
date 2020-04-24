import {nanoid} from "nanoid";
import Point from '../models/point.js';
import Destination from '../models/destination.js';

const getSyncedPoints =
  (items) => items.filter(({success}) => success).map(({payload}) => payload.point);

export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._storePoints = store.points;
    this._storeDestinations = store.destinations;
    this._isSynchronized = true;
  }

  getPoints() {
    if (this._isOnLine()) {
      return this._api.getPoints().then(
          (points) => {
            points.forEach((it) => this._storePoints.setItem(it.id, it.toRAW())); // при наличии интернета все равно складываем в store данные
            return points;
          }
      );
    }

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

  createPoint(point) {
    if (this._isOnLine()) {
      return this._api.createPoint(point).then(
          (newPoint) => {
            this._storePoints.setItem(newPoint.id, newPoint.toRAW());
            return newPoint;
          }
      );
    }

    // Нюанс в том, что при создании мы не указываем id задачи, нам его в ответе присылает сервер.
    // Но на случай временного хранения мы должны позаботиться и о временном id
    const fakeNewPointId = nanoid();
    const fakeNewPoint = Point.parsePoint(Object.assign({}, point.toRAW(), {id: fakeNewPointId}));

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

    const fakeUpdatedPoint = Point.parsePoint(Object.assign({}, point.toRAW(), {id}));

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
          // Удаляем из хранилища задачи, что были созданы
          // или изменены в оффлайне. Они нам больше не нужны
          storePoints.filter((point) => point.offline).forEach((point) => {
            this._storePoints.removeItem(point.id);
          });

          // Забираем из ответа синхронизированные задачи
          const createdPoints = getSyncedPoints(response.created);
          const updatedPoins = getSyncedPoints(response.updated);

          // Добавляем синхронизированные задачи в хранилище.
          // Хранилище должно быть актуальным в любой момент,
          // вдруг сеть пропадёт
          [...createdPoints, ...updatedPoins].forEach((point) => {
            this._storePoints.setItem(point.id, point);
          });

          // Помечаем, что всё синхронизировано
          this._isSynchronized = true;

          return Promise.resolve();
        });
    }

    return Promise.reject(new Error(`Sync data failed`));
  }

  getSynchronize() {
    return this._isSynchronized;
  }

  _isOnLine() { // проверяем наличие интернета false/true
    return window.navigator.onLine;
  }
}
