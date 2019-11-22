import {createRouteInfoTemplate} from './components/route-info.js';
import {createMenuTemplate} from './components/menu.js';
import {createFilterTemplate} from './components/filter.js';
import {createFormTemplate} from './components/form.js';
import {createContentTemplate} from './components/content.js';
import {createContentItemTemplate} from './components/content-item.js';

const TASK_COUNT = 3;

const render = (element, template, place = `beforeEnd`) => element.insertAdjacentHTML(place, template);

const tripMainElement = document.querySelector(`.trip-main`);

const tripInfoElement = tripMainElement.querySelector(`.trip-main__trip-info`);
render(tripInfoElement, createRouteInfoTemplate(), `afterBegin`);

const tripControlsElement = tripMainElement.querySelector(`.trip-main__trip-controls`);
const hiddenTripControlsElement = tripControlsElement.querySelector(`.visually-hidden`);
render(hiddenTripControlsElement, createMenuTemplate(), `afterEnd`);
render(tripControlsElement, createFilterTemplate());

const tripEventsElement = document.querySelector(`.trip-events`);
render(tripEventsElement, createFormTemplate());
render(tripEventsElement, createContentTemplate());

const tripDaysElement = document.querySelector(`.trip-days`);

new Array(TASK_COUNT)
  .fill(``)
  .forEach(
      () => render(tripDaysElement, createContentItemTemplate())
  );
