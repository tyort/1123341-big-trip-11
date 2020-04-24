export default class Destinations {
  constructor() {
    this._destinations = [];
  }

  getDestinations() {
    return this._destinations;
  }

  setDestinations(items) {
    this._destinations = Array.from(items);
  }
}
