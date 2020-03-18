import {MONTHS} from '../const.js';
import {createElement} from '../formulas.js';

const createCardListTemplate = (card, dayCounter) => {
  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${dayCounter}</span>
        <time class="day__date" datetime="${card[0]}-${card[1] + 1}-${card[2]}">${MONTHS[Number(card[1])]} ${card[2]}</time>
      </div>

      <ul class="trip-events__list">
        <!-- вставлять сюда -->
      </ul>
    </li>`
  );
};

export default class Cardlist {
  constructor(card, dayCounter) {
    this._card = card;
    this._dayCounter = dayCounter;
    this._element = null;
  }

  getTemplate() { // возвращает верстку сверху
    return createCardListTemplate(this._card, this._dayCounter);
  }

  getElement() { //
    if (!this._element) { // TRUE если this._element = null
      this._element = createElement(this.getTemplate()); // создает div, запихивает нашу верстку внутрь, возвращает внутренности
    }
    return this._element; // null
  }

  removeElement() {
    this._element = null;
  }
}

