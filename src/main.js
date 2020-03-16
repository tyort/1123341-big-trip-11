import {createWaybillTemplate} from './components/waybill.js';
import {createMenuTemplate} from './components/menu.js';
import {createFilterTemplate} from './components/filter.js';
import {createAssortmentTemplate} from './components/assortment.js';
import {createTripDaysTemplate} from './components/trip_days.js';
import {createCardListTemplate} from './components/card_list.js';
import {createCardListItemTemplate} from './components/card_list_item.js';
// import {createCardListItemFormTemplate} from './components/card_list_item_form.js';
import {generateCardItem, generateSomeUnit} from './mock/card.js';
import {getSortDate, render, getCompareArray} from './formulas.js';

const CARD_ITEM_COUNT = 12;

const cardItems = generateSomeUnit(CARD_ITEM_COUNT, generateCardItem);
const cardItemsDate = cardItems.map((it) => it.cardItemDate.slice(0, 3));
const cards = Array.from(new Set(cardItemsDate.map((it) => it.join(``))))
  .map((it) => [it.slice(0, 4), it.slice(4, 6), it.slice(6, 8)]);
const sortedCards = getSortDate(cards);
const sortedCardItems = cardItems.sort((a, b) => {
  return new Date(...a.cardItemDate).getTime() - new Date(...b.cardItemDate).getTime();
});

console.log(sortedCardItems);
console.log(sortedCardItems.map((it) => it.spendingTime));

const mainTripInfoElement = document.querySelector(`.trip-main__trip-info`);
render(mainTripInfoElement, createWaybillTemplate(), `afterBegin`);

const mainTripControlsElement = document.querySelector(`.trip-main__trip-controls`);
const visuallyHiddenElement = mainTripControlsElement.querySelectorAll(`.visually-hidden`);
render(visuallyHiddenElement[0], createMenuTemplate(), `afterEnd`);
render(visuallyHiddenElement[1], createFilterTemplate(), `afterEnd`);

const tripEventsElement = document.querySelector(`.trip-events`);
render(tripEventsElement, createAssortmentTemplate());
render(tripEventsElement, createTripDaysTemplate());

const tripDaysElement = document.querySelector(`.trip-days`);
const dayCounter = sortedCards.map((it) => new Date(...it))
  .map((it, index, array) => 1 + Math.ceil(Math.abs(it.getTime() - array[0].getTime()) / (1000 * 3600 * 24)));
sortedCards.forEach((it, index) => render(tripDaysElement, createCardListTemplate(it, dayCounter[index])));

const tripEventsListElement = document.querySelectorAll(`.trip-events__list`);

cards.forEach((item, index) =>
  sortedCardItems.filter((it) => getCompareArray(item, it.cardItemDate))
    .forEach((it) => render(tripEventsListElement[index], createCardListItemTemplate(it)))
);
