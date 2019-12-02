import {createRouteInfoTemplate} from './components/route-info.js';
import {createMenuTemplate} from './components/menu.js';
import {createFilterTemplate} from './components/filter.js';
import {createFormTemplate} from './components/form.js';
import {createContentTemplate} from './components/content.js';
import {createContentItemTemplate, createTripEventsItem, createEvent} from './components/content-item.js';
import {generateRoute, generateRouteItem, generateEventItem} from './mock/run.js';

const TRIPS_COUNT = 3;
let trips = generateRoute(TRIPS_COUNT, generateRouteItem);

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
  element.days = index === 0 ? 1 : Math.ceil((array[index].date.getTime() - array[0].date.getTime()) / (1000 * 3600 * 24))
));
trips.forEach((element) => render(tripDaysElement, createContentItemTemplate(element)));


const EVENTS_COUNT = 4;
Array.from(document.querySelectorAll(`.trip-events__list`)) // создаем массив из тегов в которых будет по 4 <li>
  .forEach((element) => ( // для каждого тега мы выполняем:
    new Array(EVENTS_COUNT) // внутри 4 пустых ячейки
    .fill(``)
    .forEach(() => render(element, createTripEventsItem())) // прорисовку 4-x <li>
  ));


const ITEMS_COUNT = 12;
let events = generateRoute(ITEMS_COUNT, generateEventItem);
Array.from(document.querySelectorAll(`.trip-events__item`)) // создаем массив из тегов для 12 <li>
  .forEach((element, index) => render(element, createEvent(events[index])));


const eventSelectedOffers = document.querySelectorAll(`.event__selected-offers`);
const buttonEventRollUp = document.querySelectorAll(`.event__rollup-btn`);

eventSelectedOffers.forEach((element, index) => {
  buttonEventRollUp[index].addEventListener(`click`, function () {
    for (let i = 0; i < element.children.length; i++) {
      if (element.children[i].classList.contains(`izchezni`)) {
        element.children[i].classList.remove(`izchezni`);
      }
    }
    buttonEventRollUp[index].remove();
  });
});

