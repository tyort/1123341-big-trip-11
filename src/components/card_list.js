import {MONTHS} from '../const.js';

export const createCardListTemplate = (card, dayCounter) => {
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
