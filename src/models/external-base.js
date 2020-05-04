import {FilterType, getPointsByFilter} from '../formulas-filter.js';

export default class ExternalBase {
  constructor() {
    this._points = [];
    this._destinations = [];
    this._offers = [];
    this._activeFilterType = FilterType.EVERYTHING;
    this._filterChangeHandlers = [];
    this._dataChangeHandlers = [];
  }

  setExternalBase(items) {
    this._points = Array.from(items[0]);
    this._offers = Array.from(items[2]);
    this._destinations = Array.from(items[1]);
  }

  getOffers() {
    return this._offers;
  }

  getDestinations() {
    return this._destinations;
  }

  getPointsByFilter() {
    return getPointsByFilter(this._points, this._activeFilterType);
  }

  getPointsOnBegining() {
    return this._points;
  }

  setFilter(filterType) {
    this._activeFilterType = filterType;
    this._callHandlers(this._filterChangeHandlers);
    this._callHandlers(this._dataChangeHandlers);
  }

  removePoint(id) {
    const index = this._points.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._points = [
      ...this._points.slice(0, index),
      ...this._points.slice(index + 1)
    ];

    this._callHandlers(this._dataChangeHandlers);
    return true;
  }

  updatePoint(id, item) {
    const index = this._points.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._points = [
      ...this._points.slice(0, index),
      item,
      ...this._points.slice(index + 1)
    ];

    this._callHandlers(this._dataChangeHandlers);
    return true;
  }

  addPoint(point) {
    this._points = [point, ...this._points];
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
