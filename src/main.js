import Api from './api/index.js';
import Store from './api/store.js';
import Provider from './api/provider.js';
<<<<<<< HEAD
import MenuComponent from './components/menu.js';
import StatisticsComponent from './components/statistics.js';
import FilterController from './controllers/filter-controller.js';
import TableController from './controllers/table-controller.js';
import ExternalBase from './models/external-base.js';
import {renderComponent, disableComponent} from './formulas.js';
import {FilterType} from './formulas-filter.js';
import 'flatpickr/dist/flatpickr.css';

const StorePrefix = {
  POINTS: `big-trip-points-localstorage`,
  DESTINATIONS: `big-trip-destinations-localstorage`,
  OFFERS: `big-trip-offers-localstorage`
};

const STORE_VER = `v1`;

const StoreName = {
  POINTS: `${StorePrefix.POINTS}-${STORE_VER}`,
  DESTINATIONS: `${StorePrefix.DESTINATIONS}-${STORE_VER}`,
  OFFERS: `${StorePrefix.OFFERS}-${STORE_VER}`
};

const MainViewMode = {
  STATISTICS: `statistics-setbymyself`,
  TABLE: `table-setbymyself`,
};

document.querySelector(`.trip-main__event-add-btn`)
  .addEventListener(`click`, () => {
    disableComponent(`trip-main__event-add-btn`);
    tableController.createPoint();
    filterController._onFilterChange(FilterType.EVERYTHING);
  });

const AUTHORIZATION = `Basic eo0w590ik29889zq`;
=======
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

const AUTHORIZATION = `Basic eo0w590ik29889d`;
>>>>>>> 9660486227da763a628df2cc5fea05f37748fc9e
const END_POINT = `https://htmlacademy-es-10.appspot.com/big-trip/`;

window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`/sw.js`)
    .then(() => {
    })
    .catch(() => {
    });
});

<<<<<<< HEAD
const externalBase = new ExternalBase();
const api = new Api(END_POINT, AUTHORIZATION);
const store = {
  points: new Store(StoreName.POINTS, window.localStorage),
  destinations: new Store(StoreName.DESTINATIONS, window.localStorage),
  offers: new Store(StoreName.OFFERS, window.localStorage),
};
=======
const points = new Points();
const api = new Api(END_POINT, AUTHORIZATION);
const store = new Store(STORE_NAME, window.localStorage);
>>>>>>> 9660486227da763a628df2cc5fea05f37748fc9e
const apiWithProvider = new Provider(api, store);

const mainTripControlsElement = document.querySelector(`.trip-main__trip-controls`);
const visuallyHiddenElement = mainTripControlsElement.querySelectorAll(`.visually-hidden`);
const menuComponent = new MenuComponent();
renderComponent(visuallyHiddenElement[0], menuComponent, `afterEnd`);
<<<<<<< HEAD
menuComponent.setActiveViewMode(MainViewMode.TABLE);
const filterController = new FilterController(visuallyHiddenElement[1], externalBase);

const pageBodyContainer = document.getElementsByClassName(`page-body__container`)[1];
const statisticsComponent = new StatisticsComponent(externalBase);
=======
menuComponent.setActiveViewMode(MAIN_VIEW_MODE.TABLE);
const filterController = new FilterController(visuallyHiddenElement[1], points);
filterController.renderFilters();

const pageBodyContainer = document.getElementsByClassName(`page-body__container`)[1];
const statisticsComponent = new StatisticsComponent(points);
>>>>>>> 9660486227da763a628df2cc5fea05f37748fc9e
renderComponent(pageBodyContainer, statisticsComponent);
statisticsComponent.hide();

const tripEventsElement = document.querySelector(`.trip-events`);
<<<<<<< HEAD
const tableController = new TableController(tripEventsElement, externalBase, apiWithProvider);

menuComponent.setOnChange((mainViewId) => {
  switch (mainViewId) {
    case MainViewMode.STATISTICS:
      menuComponent.setActiveViewMode(mainViewId);
      tableController.hide();
      statisticsComponent.show();
      break;
    default:
=======
const tableController = new TableController(tripEventsElement, points, apiWithProvider);

menuComponent.setOnChange((mainViewId) => {
  switch (mainViewId) {
    case MAIN_VIEW_MODE.TABLE:
>>>>>>> 9660486227da763a628df2cc5fea05f37748fc9e
      menuComponent.setActiveViewMode(mainViewId);
      statisticsComponent.hide();
      tableController.show();
      break;
<<<<<<< HEAD
  }
});

Promise.all([apiWithProvider.getPoints(), apiWithProvider.getDestinations(), apiWithProvider.getOffers()])
  .then((items) => {
    externalBase.setExternalBase(items);
    tableController.renderMap();
    filterController.renderFilters();
  });

=======
    case MAIN_VIEW_MODE.STATISTICS:
      menuComponent.setActiveViewMode(mainViewId);
      tableController.hide();
      statisticsComponent.show();
      break;
  }
});

apiWithProvider.getPoints()
  .then((items) => {
    const sortedItems = items.sort((a, b) => new Date(a.dateFrom).getTime() - new Date(b.dateFrom).getTime());
    points.setPoints(sortedItems);
    tableController.renderMap();
  });


>>>>>>> 9660486227da763a628df2cc5fea05f37748fc9e
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
