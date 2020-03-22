import AbstractComponent from './abstract_component.js';
import {generateStatement, itemTimePeriod} from '../formulas.js';
import moment from 'moment';

const createExtraOptionInsert = (array) => {
  return array
    .map((item) => {
      return (
        `<li class="event__offer">
          <span class="event__offer-title">${generateStatement(item[0])}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${item[1]}</span>
        </li>`
      );
    })
    .slice(0, 3)
    .join(``);
};

const createCardListItemTemplate = (cardItem) => {
  const {extraOptions, icon, waybillType, waybillPurpose, cardItemDate, spendingTime, price} = cardItem;
  const addExtraOptions = createExtraOptionInsert(Array.from(extraOptions));
  const addWaybillPurpose = waybillType === `Check-in hotel` ? `` : waybillPurpose;
  const addItemTimePeriod = itemTimePeriod(cardItemDate, spendingTime);
  const addCardItemDate = moment(cardItemDate).format(`YYYY-MM-DDTHH:mm`);
  const addCardItemTime = moment(cardItemDate).format(`HH:mm`);
  const addSpendingTime = moment(spendingTime).format(`YYYY-MM-DDTHH:mm`);
  const addSpendingTimeOnly = moment(spendingTime).format(`HH:mm`);

  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${icon}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${waybillType} ${addWaybillPurpose}</h3>

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
          &euro;&nbsp;<span class="event__price-value">${price}</span>
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
