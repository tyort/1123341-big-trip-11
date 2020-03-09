import {createWaybillTemplate} from './components/waybill.js';
import {createMenuTemplate} from './components/menu.js';
import {createFilterTemplate} from './components/filter.js';
import {createAssortmentTemplate} from './components/assortment.js';
import {createTripDaysTemplate} from './components/trip_days.js';
import {createCardListTemplate} from './components/card_list.js';
import {createCardListItemTemplate} from './components/card_list_item.js';
import {createCardListItemFormTemplate} from './components/card_list_item_form.js';
import {generateRoute, generateRouteItem, generateEventItem} from './mock/run.js';

const CARD_COUNT = 3;
const CARD_ITEM_COUNT = 4;

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
      () => render(tripDaysElement, createCardListTemplate())
  );

const tripEventsListElement = document.querySelector(`.trip-events__list`);

new Array(CARD_ITEM_COUNT)
  .fill(``)
  .forEach(
      () => render(tripEventsListElement, createCardListItemTemplate())
  );
