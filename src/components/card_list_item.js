import AbstractComponent from './abstract_component.js';
import {itemTimePeriod, generateWaybillType} from '../formulas.js';

const createExtraOptionInsert = (array) => {
  return array
    .map((item) => {
      return (
        `<li class="event__offer">
          <span class="event__offer-title">${item[0]}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price"></span>
        </li>`
      );
    })
    .slice(0, 3)
    .join(``);
};

const createCardListItemTemplate = (cardItem) => {
  const {extraOptions, type, name, datefrom, spendingTime, basePrice} = cardItem;
  const addExtraOptions = createExtraOptionInsert(Array.from(extraOptions));
  const addWaybillType = generateWaybillType(type);
  const addWaybillPurpose = name;
  const addItemTimePeriod = itemTimePeriod(datefrom, spendingTime);
  const addCardItemDate = window.moment(datefrom).format(`YYYY-MM-DDTHH:mm`);
  const addCardItemTime = window.moment(datefrom).format(`HH:mm`);
  const addSpendingTime = window.moment(spendingTime).format(`YYYY-MM-DDTHH:mm`);
  const addSpendingTimeOnly = window.moment(spendingTime).format(`HH:mm`);

  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${addWaybillType} ${addWaybillPurpose}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time"
              datetime="${addCardItemDate}">
              ${addCardItemTime}
            </time>
            &mdash;
            <time class="event__end-time"
              datetime="${addSpendingTime}">
              ${addSpendingTimeOnly}
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
