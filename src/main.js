import {createWaybillTemplate} from './components/waybill.js';
import {createMenuTemplate} from './components/menu.js';
import {createFilterTemplate} from './components/filter.js';
import {createAssortmentTemplate} from './components/assortment.js';
import {createTripDaysTemplate} from './components/trip_days.js';
import {createCardTemplate} from './components/card.js';

const CARD_COUNT = 3;

const render = (element, template, place = `beforeEnd`) => element.insertAdjacentHTML(place, template);

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

new Array(CARD_COUNT)
  .fill(``)
  .forEach(
      () => render(tripDaysElement, createCardTemplate())
  );
