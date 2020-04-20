import {FILTER_TYPE, getPointsByFilter} from '../formulas-filter.js';

export default class Points {
  constructor() {
    this._points = [];
    this._activeFilterType = FILTER_TYPE.EVERYTHING;
    this._filterChangeHandlers = [];
    this._dataChangeHandlers = []; // this._points.setDataChangeHandler(this._onDataChange);
  }

  getPointsByFilter() { // получение точек маршрута
    return getPointsByFilter(this._points, this._activeFilterType);
  }

  // getPointsOnBegining() { // зачем этот метод
  //   return this._points;
  // }

  setPoints(items) { // запись точек маршрута
    this._points = Array.from(items);
    this._callHandlers(this._dataChangeHandlers);
  }

  setFilter(filterType) { // фильтрация не происходит при вызове, только меняется тип фильтра
    this._activeFilterType = filterType;
    this._callHandlers(this._filterChangeHandlers); // запустить this._onDataChange
  }

  removePoint(id) {
    const index = this._points.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._points = [].concat(this._points.slice(0, index), this._points.slice(index + 1));
    this._callHandlers(this._dataChangeHandlers);
    return true;
  }

  updatePoint(id, item) { // обновление точки маршрута в массиве
    const index = this._points.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._points = [].concat(this._points.slice(0, index), item, this._points.slice(index + 1));
    this._callHandlers(this._dataChangeHandlers);
    return true;
  }

  addPoint(point) {
    this._points = [].concat(point, this._points);
    this._callHandlers(this._dataChangeHandlers); // вызывает _onDataChange из filter controller
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  setDataChangeHandler(handler) { // запускается вначале
    this._dataChangeHandlers.push(handler); // handler равен _onDataChange из filter controller
  }

  _callHandlers(handlers) { // вызвать каждый хендлер в массиве
    handlers.forEach((handler) => handler());
  }
}
