import { createRouteInfoTemplate } from './components/route-info.js';
import { createMenuTemplate } from './components/menu.js';
import { createFilterTemplate } from './components/filter.js';
import { createFormTemplate } from './components/form.js';
import { createContentTemplate } from './components/content.js';
import { createContentItemTemplate } from './components/content-item.js';
import { generateRoute } from './mock/run.js';

const TASK_COUNT = 3;
let trips = generateRoute(TASK_COUNT);

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



trips.sort((a, b) => a.date.getTime() - b.date.getTime())
  .forEach((element, index, array) => (
    element.days = index === 0 ? 1 : Math.ceil((array[index].date.getTime() - array[index - 1].date.getTime()) / (1000 * 3600 * 24))
  ))

trips.forEach((trip) => render(tripDaysElement, createContentItemTemplate(trip)))

console.log(trips);

// const cewwef = trips[0].date.getMonth() + 1;
// const wefewfe = trips[1].date.getMonth() + 1;
// console.log(cewwef - wefewfe)

