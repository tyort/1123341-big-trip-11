import WaybillComponent from './components/waybill.js';
import MenuComponent from './components/menu.js';
import FilterComponent from './components/filter.js';
import AssortmentComponent from './components/assortment.js';
import TripDaysComponent from './components/trip_days.js';
import CardListComponent from './components/card_list.js';
import CardListItemComponent from './components/card_list_item.js';
import CardListItemFormComponent from './components/card_list_item_form.js';
import {generateCardItem, generateSomeUnit} from './mock/card.js';
import {getSortDate, renderCompon, getCompareArray} from './formulas.js';

const CARD_ITEM_COUNT = 12;

const renderCardItem = (container, cardItem) => {
  const cardListItemComponent = new CardListItemComponent(cardItem);
  const cardListItemFormComponent = new CardListItemFormComponent(cardItem);
  const rollupButton = cardListItemComponent.getElement().querySelector(`.event__rollup-btn`);

  rollupButton.addEventListener(`click`, () => {
    container.replaceChild(cardListItemFormComponent.getElement(), cardListItemComponent.getElement());
  });

  const editForm = cardListItemFormComponent.getElement().querySelector(`form`);
  editForm.addEventListener(`submit`, () => {
    container.replaceChild(cardListItemComponent.getElement(), cardListItemFormComponent.getElement());
  });

  renderCompon(container, cardListItemComponent.getElement());
};

const cardItems = generateSomeUnit(CARD_ITEM_COUNT, generateCardItem);
const cardItemsDate = cardItems.map((it) => it.cardItemDate.slice(0, 3));
const cards = Array.from(new Set(cardItemsDate.map((it) => it.join(``))))
  .map((it) => [it.slice(0, 4), it.slice(4, 6), it.slice(6, 8)]);
const sortedCards = getSortDate(cards);
const sortedCardItems = cardItems.sort((a, b) => {
  return new Date(...a.cardItemDate).getTime() - new Date(...b.cardItemDate).getTime();
});

console.log(sortedCardItems);
console.log(sortedCardItems.map((it) => it.spendingTime));

const mainTripInfoElement = document.querySelector(`.trip-main__trip-info`);
renderCompon(mainTripInfoElement, new WaybillComponent().getElement(), `afterBegin`);

const mainTripControlsElement = document.querySelector(`.trip-main__trip-controls`);
const visuallyHiddenElement = mainTripControlsElement.querySelectorAll(`.visually-hidden`);
renderCompon(visuallyHiddenElement[0], new MenuComponent().getElement(), `afterEnd`);
renderCompon(visuallyHiddenElement[1], new FilterComponent().getElement(), `afterEnd`);

const tripEventsElement = document.querySelector(`.trip-events`);
renderCompon(tripEventsElement, new AssortmentComponent().getElement());
renderCompon(tripEventsElement, new TripDaysComponent().getElement());

const tripDaysElement = document.querySelector(`.trip-days`);
const dayCounter = sortedCards.map((it) => new Date(...it))
  .map((it, index, array) => 1 + Math.ceil(Math.abs(it.getTime() - array[0].getTime()) / (1000 * 3600 * 24)));
sortedCards.forEach((it, index) => renderCompon(tripDaysElement, new CardListComponent(it, dayCounter[index]).getElement()));

const tripEventsListElement = document.querySelectorAll(`.trip-events__list`);
cards.forEach((item, index) =>
  sortedCardItems.filter((it) => getCompareArray(item, it.cardItemDate))
    .forEach((it) => renderCardItem(tripEventsListElement[index], it))
);
