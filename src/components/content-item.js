import {MONTHS, Date} from '../const.js';
import {getRandomIntegerNumber} from '../mock/run.js';

const createSpecialOffers = (extraOption) => {
  return extraOption
    .map((item) => (
      `<li class="event__offer">
        <span class="event__offer-title">${item.name}</span>
        <span class="event__offer-price">${item.price}</span>
      </li>`
    ))
    .join(``);
};

export const createTripEventsItem = () => (
  `<li class="trip-events__item">
  </li>`
);

export const createEvent = (trip) => {
  const {type, city, date, extraOption, price} = trip;
  const randomHours = getRandomIntegerNumber(0, 23);
  const endHours = randomHours > date.getHours() ? randomHours : date.getHours() + 1;
  const endMinutes = getRandomIntegerNumber(0, 59);
  const endTime = endHours + `:` + endMinutes;
  const passedHours = Math.floor(((endHours * 60 + endMinutes) - (date.getHours() * 60 + date.getMinutes())) / 60);
  const passedMinutes = ((endHours * 60 + endMinutes) - (date.getHours() * 60 + date.getMinutes())) % 60;
  const specialOffers = createSpecialOffers(extraOption);

  return (
    `<div class="event">
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${type} to ${city}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${date}">${date.getHours()}:${date.getMinutes()}</time>
          &mdash;
          <time class="event__end-time" datetime="${date}">${endTime}</time>
        </p>
        <p class="event__duration">${passedHours}H ${passedMinutes}M</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${price}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${specialOffers}
      </ul>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>`
  );
};

export const createContentItemTemplate = (trip) => {
  const {date, days} = trip;
  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${days}</span>
        <time class="day__date" datetime="${Date}">${MONTHS[date.getMonth()]} ${date.getDate()}</time>
      </div>
      <ul class="trip-events__list">
      </ul>
    </li>`
  );
};
