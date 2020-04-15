import API from './api.js';
import WaybillComponent from './components/waybill.js';
import MenuComponent, {MAIN_VIEW_MODE} from './components/menu.js';
import StatisticsComponent from './components/statistics.js';
import FilterController from './controllers/filter-controller.js';
import TableController from './controllers/table-controller.js';
import Points from './models/points.js';
import {renderComponent} from './formulas.js';

document.querySelector(`.trip-main__event-add-btn`)
  .addEventListener(`click`, () => {
    tableController.createPoint();
  });

const AUTHORIZATION = `Basic eo0w590ik29889b`; // это строка должна быть значение заголовка авторизации
const END_POINT = `https://htmlacademy-es-10.appspot.com/big-trip/`;

const points = new Points();
const api = new API(END_POINT, AUTHORIZATION);

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
const tableController = new TableController(tripEventsElement, points, api);

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

api.getPoints() // запускает this._load из api.js, а тот в свою очередь запускает Promise в режиме pending
  .then((items) => { // массив из экземпляров с models/point.js в удобном для меня виде
    console.log(items);
    const sortedItems = items.sort((a, b) => new Date(...a.datefrom).getTime() - new Date(...b.datefrom).getTime());
    points.setPoints(sortedItems);
    tableController.renderMap();
  });
