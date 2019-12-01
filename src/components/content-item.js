import {MonthNames} from '../const.js';
import {getRandomIntegerNumber} from '../mock/run.js';

const createSpecialOffers = (tripExtraOption) => {
  return tripExtraOption
    .map((item) => (
      `<li class="event__offer">
        <span class="event__offer-title">${item.name}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${item.price}</span>
      </li>`
    ))
    .join(`\n`);
};

const createTripEventsItem = (tripDate, tripType, tripCity, tripPrice, tripExtraOption) => {
  const randomHours = getRandomIntegerNumber(0, 23);
  const endHours = randomHours > tripDate.getHours() ? randomHours : tripDate.getHours() + 1;
  const endMinutes = getRandomIntegerNumber(0, 59);
  const endTime = endHours + `:` + endMinutes;
  const passedHours = Math.floor(((endHours * 60 + endMinutes) - (tripDate.getHours() * 60 + tripDate.getMinutes())) / 60);
  const passedMinutes = ((endHours * 60 + endMinutes) - (tripDate.getHours() * 60 + tripDate.getMinutes())) % 60;

  const specialOffers = createSpecialOffers(tripExtraOption);

  return new Array(4)
    .fill(``)
    .map(() => (
      `<li class="trip-events__item">
        <div class="event">
          <div class="event__type">
            <img class="event__type-icon" width="42" height="42" src="img/icons/${tripType.toLowerCase()}.png" alt="Event type icon">
          </div>
          <h3 class="event__title">${tripType} to ${tripCity}</h3>
          <div class="event__schedule">
            <p class="event__time">
              <time class="event__start-time" datetime="${tripDate}">${tripDate.getHours()}:${tripDate.getMinutes()}</time>
              &mdash;
              <time class="event__end-time" datetime="${tripDate}">${endTime}</time>
            </p>
            <p class="event__duration">${passedHours}H ${passedMinutes}M</p>
          </div>
          <p class="event__price">
            &euro;&nbsp;<span class="event__price-value">${tripPrice}</span>
          </p>
          <h4 class="visually-hidden">Offers:</h4>
          <ul class="event__selected-offers">
            ${specialOffers}
          </ul>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </div>
      </li>`
    ))
    .join(`\n`);
};

export const createContentItemTemplate = (trip) => {
  const {date, days, type, city, price, extraOption} = trip;
  // const datetime = date.getFullYear() + `-` + (date.getMonth() + 1) + `-` + date.getDate();
  const tripEventsItem = createTripEventsItem(date, type, city, price, extraOption);
  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${days}</span>
        <time class="day__date" datetime="${date}">${MonthNames[date.getMonth()]} ${date.getDate()}</time>
      </div>
      <ul class="trip-events__list">
        ${tripEventsItem}
      </ul>
    </li>`
  );
};
