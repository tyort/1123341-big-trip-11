import WaybillComponent from './components/waybill.js';
import MenuComponent, {MAIN_VIEW_MODE} from './components/menu.js';
import StatisticsComponent from './components/statistics.js';
import FilterController from './controllers/filter-controller.js';
import TableController from './controllers/table-controller.js';
import Points from './models/points.js';
import {generateCardItem, generateSomeUnit} from './mock/card.js';
import {renderComponent} from './formulas.js';

// document.querySelector(`.trip-main__event-add-btn`)
//   .addEventListener(`click`, () => {
//     tableController.createPoint();
//   });

const CARD_ITEM_COUNT = 12;
const cardItems = generateSomeUnit(CARD_ITEM_COUNT, generateCardItem);

const sortedCardItems = cardItems.sort((a, b) => new Date(...a.cardItemDate).getTime() - new Date(...b.cardItemDate).getTime());

const points = new Points();
points.setPoints(sortedCardItems);
console.log(sortedCardItems);


const mainTripInfoElement = document.querySelector(`.trip-main__trip-info`);
renderComponent(mainTripInfoElement, new WaybillComponent(), `afterBegin`);

const mainTripControlsElement = document.querySelector(`.trip-main__trip-controls`);
const visuallyHiddenElement = mainTripControlsElement.querySelectorAll(`.visually-hidden`);
const menuComponent = new MenuComponent();
renderComponent(visuallyHiddenElement[0], menuComponent, `afterEnd`);
menuComponent.setActiveViewMode(MAIN_VIEW_MODE.TABLE);
const filterController = new FilterController(visuallyHiddenElement[1], points);
filterController.renderFilters();

const pageBodyContainer = document.getElementsByClassName(`page-body__container`)[1];
const statisticsComponent = new StatisticsComponent(points);
renderComponent(pageBodyContainer, statisticsComponent);
statisticsComponent.hide();

const tripEventsElement = document.querySelector(`.trip-events`);
const tableController = new TableController(tripEventsElement, points);
tableController.renderMap();

menuComponent.setOnChange((mainViewId) => {
  switch (mainViewId) {
    case MAIN_VIEW_MODE.TABLE:
      menuComponent.setActiveViewMode(mainViewId);
      statisticsComponent.hide();
      tableController.show();
      break;
    case MAIN_VIEW_MODE.STATISTICS:
      menuComponent.setActiveViewMode(mainViewId);
      tableController.hide();
      statisticsComponent.show();
      break;
  }
});
