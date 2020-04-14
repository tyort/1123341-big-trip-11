import AbstractComponent from './abstract_component.js';
import {itemTimePeriod, generateWaybillType} from '../formulas.js';

const createExtraOptionInsert = (array, newmap) => {
  return array
    .map((item) => {
      return (
        `<li class="event__offer">
          <span class="event__offer-title">${item[0]}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${newmap.get(item[0])}</span>
        </li>`
      );
    })
    .slice(0, 3)
    .join(``);
};

const createCardListItemTemplate = (cardItem) => {
  const {offers, type, name, datefrom, dateTo, basePrice, offersPrice} = cardItem;
  const addExtraOptions = createExtraOptionInsert(Array.from(offers), offersPrice);
  const addItemTimePeriod = itemTimePeriod(datefrom, dateTo);
  const addCardItemDate = window.moment(datefrom).format(`YYYY-MM-DDTHH:mm`);
  const addCardItemTime = window.moment(datefrom).format(`HH:mm`);
  const addDateTo = window.moment(dateTo).format(`YYYY-MM-DDTHH:mm`);
  const addDateToOnly = window.moment(dateTo).format(`HH:mm`);

  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${generateWaybillType(type)} ${name}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time"
              datetime="${addCardItemDate}">
              ${addCardItemTime}
            </time>
            &mdash;
            <time class="event__end-time"
              datetime="${addDateTo}">
              ${addDateToOnly}
            </time>
          </p>
          <p class="event__duration">${addItemTimePeriod}</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${addExtraOptions}
        </ul>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

export default class CardListItem extends AbstractComponent {
  constructor(cardItem) {
    super();
    this._cardItem = cardItem;
  }

  getTemplate() {
    return createCardListItemTemplate(this._cardItem);
  }

  setRollupButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, handler);
  }
}
