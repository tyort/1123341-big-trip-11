import {generateStatement, getSpendingTime} from '../formulas.js';

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

export const createCardListItemTemplate = (cardItem) => {
  const {extraOptions, icon, waybillType, waybillPurpose, cardItemDate, spendingTime} = cardItem;
  const addExtraOptions = createExtraOptionInsert(Array.from(extraOptions));
  const addWaybillPurpose = waybillType === `Check-in hotel` ? `` : waybillPurpose;
  const kdkksd = getSpendingTime((new Date(...spendingTime).getTime() - new Date(...cardItemDate).getTime()) / 60000);

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
              datetime="${cardItemDate[0]}-${cardItemDate[1]}-${cardItemDate[2]}T${cardItemDate[3]}:${cardItemDate[4]}">
              ${cardItemDate[3]}:${cardItemDate[4]}
            </time>
            &mdash;
            <time class="event__end-time"
              datetime="${spendingTime[0]}-${spendingTime[1]}-${spendingTime[2]}T${spendingTime[3]}:${spendingTime[4]}">
              ${spendingTime[3]}:${spendingTime[4]}
            </time>
          </p>
          <p class="event__duration">${kdkksd}</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">160</span>
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
