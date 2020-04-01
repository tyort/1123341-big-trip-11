import AssortmentComponent, {SORT_TYPES} from '../components/assortment.js';
import TripDaysComponent from '../components/trip_days.js';
import CardListComponent from '../components/card_list.js';
import CardListLightComponent from '../components/card_list_light.js';
import NoCardListComponent from '../components/no_card_list.js';
import {dayCounter, renderComponent} from '../formulas.js';
import ItemController from './item-controller.js';


const renderItemByDeafault = (container, sortedCards, sortedCardItems, onDataChange, onViewChange) => {
  sortedCards.forEach((it, index) => renderComponent(container, new CardListComponent(it, dayCounter(sortedCards)[index])));
  const tripEventsListElements = document.querySelectorAll(`.trip-events__list`);
  const arrayOfItemControllers = [];

  sortedCards.forEach((item, index) => {
    sortedCardItems.filter((elem) => item === window.moment(elem.cardItemDate).format(`YYYYMMDD`))
      .forEach((i) => {
        const itemController = new ItemController(tripEventsListElements[index], onDataChange, onViewChange);
        itemController.renderCardItem(i);
        arrayOfItemControllers.push(itemController);
      });
  });
  return arrayOfItemControllers;
};

const renderItemBySort = (container, sortedCardItems, onDataChange, onViewChange) => {
  renderComponent(container, new CardListLightComponent());

  const tripEventsListElement = document.querySelector(`.trip-events__list`);

  return sortedCardItems.forEach((i) => {
    const itemController = new ItemController(tripEventsListElement, onDataChange, onViewChange);
    itemController.renderCardItem(i);
    return itemController;
  });
};

export default class TableController {
  constructor(container, pointsModel) { // добавим pointsModel
    // this._sortedCards = [];
    // this._sortedCardItems = [];
    this._showedCardItemControllers = [];
    this._container = container;
    this._pointsModel = pointsModel; // добавим свойство
    this._assortmentComponent = new AssortmentComponent();
    this._tripDaysComponent = new TripDaysComponent(); // контейнер для рендеров
    this._noCardListComponent = new NoCardListComponent();
    this._onDataChange = this._onDataChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._assortmentComponent.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  // renderMap(sortedCards, sortedCardItems) {
  renderMap() {
    this._sortedCards = sortedCards;
    this._sortedCardItems = sortedCardItems;
    

    if (sortedCards.length === 0) {
      renderComponent(this._container, this._noCardListComponent);
    }

    renderComponent(this._container, this._assortmentComponent);
    renderComponent(this._container, this._tripDaysComponent);

    const newCardItems = renderItemByDeafault(this._tripDaysComponent.getElement(), this._sortedCards, this._sortedCardItems, this._onDataChange, this._onViewChange);
    this._showedCardItemControllers = this._showedCardItemControllers.concat(newCardItems);
  }

  _onDataChange(itemController, oldData, newData) { // объявляется функция
    const index = this._sortedCardItems.findIndex((it) => it === oldData);
    if (index === -1) {
      return;
    }
    this._sortedCardItems = [].concat(this._sortedCardItems.slice(0, index), newData, this._sortedCardItems.slice(index + 1));
    itemController.renderCardItem(this._sortedCardItems[index]);
  }

  _onViewChange() {
    this._showedCardItemControllers.forEach((it) => it.setDefaultView());
  }

  _onSortTypeChange(sortType) {
    this._tripDaysComponent.getElement().innerHTML = ``;
    let sortedItems = [];

    switch (sortType) {
      case SORT_TYPES.TIME_DOWN:
        sortedItems = this._sortedCardItems.sort((a, b) => new Date(...b.spendingTime).getTime() - new Date(...b.cardItemDate).getTime() - new Date(...a.spendingTime).getTime() + new Date(...a.cardItemDate).getTime());
        renderItemBySort(this._tripDaysComponent.getElement(), sortedItems, this._onDataChange, this._onViewChange);
        break;
      case SORT_TYPES.PRICE_DOWN:
        sortedItems = this._sortedCardItems.sort((a, b) => b.price - a.price);
        renderItemBySort(this._tripDaysComponent.getElement(), sortedItems, this._onDataChange, this._onViewChange);
        break;
      case SORT_TYPES.DEFAULT:
        renderItemByDeafault(this._tripDaysComponent.getElement(), this._sortedCards, this._sortedCardItems, this._onDataChange, this._onViewChange);
        break;
    }
  }
}
