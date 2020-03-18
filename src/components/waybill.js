import {createElement} from '../formulas.js';

const createWaybillTemplate = () => (
  `<div class="trip-info__main">
    <h1 class="trip-info__title">Amsterdam &mdash; ... &mdash; Amsterdam</h1>
    <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;21</p>
  </div>`
);

export default class TripDays {
  constructor() {
    this._element = null;
  }

  getTemplate() { // возвращает верстку сверху
    return createWaybillTemplate();
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
