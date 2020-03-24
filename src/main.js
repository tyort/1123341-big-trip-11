import WaybillComponent from './components/waybill.js';
import MenuComponent from './components/menu.js';
import FilterComponent from './components/filter.js';
import TableComponent from './controllers/tableController.js';
import {generateCardItem, generateSomeUnit} from './mock/card.js';
import {renderComponent} from './formulas.js';
import moment from 'moment';

const CARD_ITEM_COUNT = 12;

const cardItems = generateSomeUnit(CARD_ITEM_COUNT, generateCardItem);
const cardItemsDate = cardItems.map((it) => moment(it.cardItemDate).format(`YYYYMMDD`));
const cards = Array.from(new Set(cardItemsDate));
const sortedCards = cards.sort((a, b) => a - b);
const sortedCardItems = cardItems.sort((a, b) => {
  return new Date(...a.cardItemDate).getTime() - new Date(...b.cardItemDate).getTime();
});

console.log(sortedCardItems);

const mainTripInfoElement = document.querySelector(`.trip-main__trip-info`);
renderComponent(mainTripInfoElement, new WaybillComponent(), `afterBegin`);

const mainTripControlsElement = document.querySelector(`.trip-main__trip-controls`);
const visuallyHiddenElement = mainTripControlsElement.querySelectorAll(`.visually-hidden`);
renderComponent(visuallyHiddenElement[0], new MenuComponent(), `afterEnd`);
renderComponent(visuallyHiddenElement[1], new FilterComponent(), `afterEnd`);

const tripEventsElement = document.querySelector(`.trip-events`);
const cardsMapController = new TableComponent(tripEventsElement);
cardsMapController.renderMap(sortedCards, sortedCardItems);

