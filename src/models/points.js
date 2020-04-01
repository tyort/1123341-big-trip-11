export default class Points {
  constructor() {
    this._points = [];
  }

  getPoints() { // получение точек маршрута
    return this._points;
  }

  setPoints(items) { // запись точек маршрута
    this._points = Array.from(items);
  }

  updatePoints(id, item) { // обновление точки маршрута
    const index = this._points.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._points = [].concat(this._points.slice(0, index), item, this._points.slice(index + 1));
    return true;
  }
}
