import Api from './api/index.js';
import Store from './api/store.js';
import Provider from './api/provider.js';
import MenuComponent, {MAIN_VIEW_MODE} from './components/menu.js';
import StatisticsComponent from './components/statistics.js';
import FilterController from './controllers/filter-controller.js';
import TableController from './controllers/table-controller.js';
import Points from './models/points.js';
import {renderComponent} from './formulas.js';
import 'flatpickr/dist/flatpickr.css';

const STORE_PREFIX = `big-trip-localstorage`;
const STORE_VER = `v1`;
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;

document.querySelector(`.trip-main__event-add-btn`)
  .addEventListener(`click`, () => {
    tableController.createPoint();
  });

const AUTHORIZATION = `Basic eo0w590ik29889z`;
const END_POINT = `https://htmlacademy-es-10.appspot.com/big-trip/`;

// window.addEventListener(`load`, () => {
//   navigator.serviceWorker.register(`/sw.js`)
//     .then(() => {
//     })
//     .catch(() => {
//     });
// });

const points = new Points();
const api = new Api(END_POINT, AUTHORIZATION);
const store = new Store(STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, store);

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
const tableController = new TableController(tripEventsElement, points, apiWithProvider);

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

apiWithProvider.getPoints()
  .then((items) => {
    console.log(items);
    const sortedItems = items.sort((a, b) => new Date(a.dateFrom).getTime() - new Date(b.dateFrom).getTime());
    points.setPoints(sortedItems);
    tableController.renderMap();
  });


window.addEventListener(`online`, () => {
  document.title = document.title.replace(` [offline]`, ``);
  if (!apiWithProvider.getSynchronize()) {
    apiWithProvider.sync()
      .then(() => {
      })
      .catch(() => {
      });
  }
});

window.addEventListener(`offline`, () => {
  document.title += ` [offline]`;
});
