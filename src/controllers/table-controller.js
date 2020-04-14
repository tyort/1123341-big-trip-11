import AssortmentComponent, {SORT_TYPES} from '../components/assortment.js';
import TripDaysComponent from '../components/trip_days.js';
import CardListComponent from '../components/card_list.js';
import CardListLightComponent from '../components/card_list_light.js';
import NoCardListComponent from '../components/no_card_list.js';
import {dayCounter, renderComponent} from '../formulas.js';
import ItemController, {MODE, EmptyPoint} from './item-controller.js';

const HIDDEN_CLASS = `trip-events--hidden`;

const renderOnePoint = (sortType, container, sortedCardItems, onDataChange, onViewChange) => {
  if (sortType === `event`) {
    const sortedCards = sortedCardItems.map((it) => window.moment(it.datefrom).format(`YYYYMMDD`))
      .filter((item, index, array) => array.indexOf(item) === index)
      .sort((a, b) => a - b);

    sortedCards.forEach((it, index) => renderComponent(container, new CardListComponent(it, dayCounter(sortedCards)[index])));
    const tripEventsListElements = document.querySelectorAll(`.trip-events__list`);
    const arrayOfItemControllers = [];

    sortedCards.forEach((item, index) => {
      sortedCardItems.filter((elem) => item === window.moment(elem.datefrom).format(`YYYYMMDD`))
        .forEach((i) => {
          const itemController = new ItemController(tripEventsListElements[index], onDataChange, onViewChange);
          itemController.renderCardItem(i, MODE.DEFAULT);
          arrayOfItemControllers.push(itemController);
        });
    });
    return arrayOfItemControllers;
  } else {
    renderComponent(container, new CardListLightComponent());

    const tripEventsListElement = document.querySelector(`.trip-events__list`);

    return sortedCardItems.map((i) => {
      const itemController = new ItemController(tripEventsListElement, onDataChange, onViewChange);
      itemController.renderCardItem(i, MODE.DEFAULT);
      return itemController;
    });
  }
};

export default class TableController {
  constructor(container, points) {
    this._showedCardItemControllers = [];
    this._container = container;
    this._points = points;
    this._assortmentComponent = new AssortmentComponent();
    this._tripDaysComponent = new TripDaysComponent(); // контейнер для рендеров
    this._noCardListComponent = new NoCardListComponent();
    this._creatingPoint = null;
    this._onDataChange = this._onDataChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._assortmentComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    this._points.setFilterChangeHandler(this._onFilterChange);
    this._sortType = `event`;
  }

  show() {
    const tripEvents = document.querySelector(`.trip-events`);
    if (tripEvents.classList.contains(HIDDEN_CLASS)) {
      tripEvents.classList.remove(HIDDEN_CLASS);
    }
  }

  hide() {
    const tripEvents = document.querySelector(`.trip-events`);
    if (!tripEvents.classList.contains(HIDDEN_CLASS)) {
      tripEvents.classList.add(HIDDEN_CLASS);
    }
  }

  renderMap() {
    const points = this._points.getPointsByFilter();

    if (points.length === 0) {
      renderComponent(this._container, this._noCardListComponent);
      return;
    }

    renderComponent(this._container, this._assortmentComponent);
    renderComponent(this._container, this._tripDaysComponent);

    this._renderPoints(this._sortType, points); // вызывается один раз, вначале
  }

  createPoint() {
    if (this._creatingPoint) {
      return;
    }

    this._creatingPoint = new ItemController(this._assortmentComponent.getElement(), this._onDataChange, this._onViewChange);
    this._creatingPoint.renderCardItem(EmptyPoint, MODE.ADDING);
  }

  _removePoints() {
    this._tripDaysComponent.getElement().innerHTML = ``;
    this._showedCardItemControllers.forEach((it) => it.destroy());
    this._showedCardItemControllers = [];
  }

  _renderPoints(sortType, points) {
    this._sortType = sortType;
    const pointsList = this._tripDaysComponent.getElement();
    const newCardItems = renderOnePoint(this._sortType, pointsList, points, this._onDataChange, this._onViewChange);
    this._showedCardItemControllers = this._showedCardItemControllers.concat(newCardItems);
  }

  _updatePoints() {
    this._removePoints();
    this._renderPoints(this._sortType, this._points.getPointsByFilter());
  }

  _onDataChange(itemController, oldData, newData) {
    if (oldData === EmptyPoint && newData === null) {
      this._creatingPoint = null;
      itemController.destroy();
      this._updatePoints();

    } else if (oldData === EmptyPoint) {
      this._creatingPoint = null;
      itemController.destroy();
      this._points.addPoint(newData);
      this._updatePoints();

    } else if (newData === null) {
      this._points.removePoint(oldData.id);
      this. _updatePoints();

    } else {
      const isSuccess = this._points.updatePoint(oldData.id, newData);

      if (isSuccess) {
        itemController.renderCardItem(newData, MODE.DEFAULT);
      }
    }
  }

  _onViewChange() { // срабатывает перед началом превращения карточки в форму. Чтобы изначально все задачи были простыми карточками
    this._showedCardItemControllers.forEach((it) => it.setDefaultView());
  }

  _onSortTypeChange(sortType) {
    this._tripDaysComponent.getElement().innerHTML = ``;
    let sortedItems = [];
    const points = this._points.getPointsByFilter();

    switch (sortType) {
      case SORT_TYPES.TIME_DOWN:
        sortedItems = points.sort((a, b) => new Date(...b.dateTo).getTime() - new Date(...b.datefrom).getTime() - new Date(...a.dateTo).getTime() + new Date(...a.datefrom).getTime());
        break;
      case SORT_TYPES.PRICE_DOWN:
        sortedItems = points.sort((a, b) => b.basePrice - a.basePrice);
        break;
      case SORT_TYPES.DEFAULT:
        sortedItems = points;
        break;
    }

    this._removePoints();
    this._renderPoints(sortType, sortedItems);
  }

  _onFilterChange() {
    this._updatePoints();
  }
}
