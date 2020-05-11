import AbstractComponent from './abstract-component.js';
import moment from 'moment';

const createCardListTemplate = (card, dayCounter) => {
  const addDateTime = moment(card).format(`YYYY-MM-DD`);
  const addMonthAndDay = moment(card).format(`MMM D`).toUpperCase();

  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${dayCounter}</span>
        <time class="day__date" datetime="${addDateTime}">${addMonthAndDay}</time>
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
