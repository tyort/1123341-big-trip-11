import WaybillComponent from './components/waybill.js';
import MenuComponent from './components/menu.js';
import FilterComponent from './components/filter.js';
import TableComponent from './controllers/table.js';
import {generateCardItem, generateSomeUnit} from './mock/card.js';
import {getSortDate, renderCompon} from './formulas.js';

const CARD_ITEM_COUNT = 12;

const cardItems = generateSomeUnit(CARD_ITEM_COUNT, generateCardItem);
const cardItemsDate = cardItems.map((it) => it.cardItemDate.slice(0, 3));
const cards = Array.from(new Set(cardItemsDate.map((it) => it.join(``))))
  .map((it) => [it.slice(0, 4), it.slice(4, 6), it.slice(6, 8)]);
const sortedCards = getSortDate(cards);
const sortedCardItems = cardItems.sort((a, b) => {
  return new Date(...a.cardItemDate).getTime() - new Date(...b.cardItemDate).getTime();
});

// console.log(sortedCards);
// console.log(sortedCardItems);
// console.log(sortedCardItems.map((it) => it.spendingTime));

const mainTripInfoElement = document.querySelector(`.trip-main__trip-info`);
renderCompon(mainTripInfoElement, new WaybillComponent().getElement(), `afterBegin`);

const mainTripControlsElement = document.querySelector(`.trip-main__trip-controls`);
const visuallyHiddenElement = mainTripControlsElement.querySelectorAll(`.visually-hidden`);
renderCompon(visuallyHiddenElement[0], new MenuComponent().getElement(), `afterEnd`);
renderCompon(visuallyHiddenElement[1], new FilterComponent().getElement(), `afterEnd`);

const tripEventsElement = document.querySelector(`.trip-events`);
const cardsMapController = new TableComponent(tripEventsElement);
cardsMapController.renderMap(sortedCards, sortedCardItems);

