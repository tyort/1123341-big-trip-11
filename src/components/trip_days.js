import {createElement} from '../formulas.js';

const createTripDaysTemplate = () =>
  (
    `<ul class="trip-days">
    </ul>`
  );

export default class TripDays {
  constructor() {
    this._element = null;
  }

  getTemplate() { // возвращает верстку сверху
    return createTripDaysTemplate();
  }

  getElement() { //
    if (!this._element) { // TRUE если this._element = null
      this._element = createElement(this.getTemplate()); // создает div, запихивает нашу верстку внутрь, возвращает внутренности
    }
    return this._element; // возвращает true или false
  }

  removeElement() {
    this._element = null;
  }
}
