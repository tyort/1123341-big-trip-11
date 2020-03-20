import AbstractComponent from './abstract_component.js';
import {MONTHS} from '../const.js';

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

export default class CardList extends AbstractComponent {
  constructor(card, dayCounter) {
    super();
    this._card = card;
    this._dayCounter = dayCounter;
  }

  getTemplate() {
    return createCardListTemplate(this._card, this._dayCounter);
  }
}

