import WaybillComponent from './components/waybill.js';
import MenuComponent from './components/menu.js';
import FilterController from './controllers/filter-controller.js';
import TableController from './controllers/table-controller.js';
import Points from './models/points.js';
import {generateCardItem, generateSomeUnit} from './mock/card.js';
import {renderComponent} from './formulas.js';

document.querySelector(`.trip-main__event-add-btn`)
  .addEventListener(`click`, () => {
    tableController.createPoint();
  });

const CARD_ITEM_COUNT = 12;
const cardItems = generateSomeUnit(CARD_ITEM_COUNT, generateCardItem);
const sortedCardItems = cardItems.sort((a, b) => new Date(...a.cardItemDate).getTime() - new Date(...b.cardItemDate).getTime());
const cards = Array.from(new Set(sortedCardItems.map((it) => window.moment(it.cardItemDate).format(`YYYYMMDD`))));
const sortedCards = cards.sort((a, b) => a - b);

console.log(sortedCardItems);
console.log(sortedCards);

const points = new Points();
points.setPointsCards(sortedCards);
points.setPoints(sortedCardItems);


const mainTripInfoElement = document.querySelector(`.trip-main__trip-info`);
renderComponent(mainTripInfoElement, new WaybillComponent(), `afterBegin`);

const mainTripControlsElement = document.querySelector(`.trip-main__trip-controls`);
const visuallyHiddenElement = mainTripControlsElement.querySelectorAll(`.visually-hidden`);
renderComponent(visuallyHiddenElement[0], new MenuComponent(), `afterEnd`);
const filterController = new FilterController(visuallyHiddenElement[1], points);
filterController.renderFilters();

const tripEventsElement = document.querySelector(`.trip-events`);
const tableController = new TableController(tripEventsElement, points);
tableController.renderMap();
