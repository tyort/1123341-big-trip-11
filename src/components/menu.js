import {createElement} from '../formulas.js';

const createMenuTemplate = () =>
  (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
      <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
      <a class="trip-tabs__btn" href="#">Stats</a>
    </nav>`
  );

export default class Menu {
  constructor() {
    this._element = null;
  }

  getTemplate() { // возвращает верстку сверху
    return createMenuTemplate();
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
