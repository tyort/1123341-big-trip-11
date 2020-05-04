import {FILTER_TYPE, getPointsByFilter} from '../formulas-filter.js';

export default class Points {
  constructor() {
    this._points = [];
    this._activeFilterType = FILTER_TYPE.EVERYTHING;
    this._filterChangeHandlers = [];
    this._dataChangeHandlers = [];
  }

  getPointsByFilter() {
    return getPointsByFilter(this._points, this._activeFilterType);
  }

  getPointsOnBegining() {
    return this._points;
  }

  setPoints(items) {
    this._points = Array.from(items);
    this._callHandlers(this._dataChangeHandlers);
  }

  setFilter(filterType) {
    this._activeFilterType = filterType;
    this._callHandlers(this._filterChangeHandlers);
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

  updatePoint(id, item) {
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
    this._callHandlers(this._dataChangeHandlers);
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
