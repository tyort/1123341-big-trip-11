import {createElement} from '../formulas.js';


const createNoCardListTemplate = () => {
  return (
    `<p class="trip-events__msg">Click New Event to create your first point</p>`
  );
};

export default class NoCardList {
  constructor() {
    this._element = null;
  }

  getTemplate() { // возвращает верстку сверху
    return createNoCardListTemplate();
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
