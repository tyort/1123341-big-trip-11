import AssortmentComponent, {SORT_TYPES} from '../components/assortment.js';
import TripDaysComponent from '../components/trip_days.js';
import CardListComponent from '../components/card_list.js';
import CardListLightComponent from '../components/card_list_light.js';
import NoCardListComponent from '../components/no_card_list.js';
import WaybillComponent from '../components/waybill.js';
import {dayCounter, renderComponent} from '../formulas.js';
import ItemController, {MODE, EmptyPoint} from './item-controller.js';
import moment from 'moment';

const mainTripInfoElement = document.querySelector(`.trip-main`);
const HIDDEN_CLASS = `trip-events--hidden`;

const renderAllPoints = (sortType, container, allPoints, onDataChange, onViewChange) => {
  if (sortType === `event`) {
    const sortedCards = allPoints.map((it) => moment(it.dateFrom).format(`YYYYMMDD`))
      .filter((item, index, array) => array.indexOf(item) === index)
      .sort((a, b) => a - b);

    sortedCards.forEach((it, index) => renderComponent(container, new CardListComponent(it, dayCounter(sortedCards)[index])));
    const tripEventsListElements = document.querySelectorAll(`.trip-events__list`);
    const arrayOfItemControllers = [];

    sortedCards.forEach((item, index) => {
      allPoints.filter((elem) => item === moment(elem.dateFrom).format(`YYYYMMDD`))
        .forEach((i) => {
          const itemController = new ItemController(tripEventsListElements[index], onDataChange, onViewChange, allPoints);
          itemController.renderCardItem(i, MODE.DEFAULT);
          arrayOfItemControllers.push(itemController);
        });
    });
    return arrayOfItemControllers;
  } else {
    renderComponent(container, new CardListLightComponent());

    const tripEventsListElement = document.querySelector(`.trip-events__list`);

    return allPoints.map((i) => {
      const itemController = new ItemController(tripEventsListElement, onDataChange, onViewChange, allPoints);
      itemController.renderCardItem(i, MODE.DEFAULT);
      return itemController;
    });
  }
};

export default class TableController {
  constructor(container, points, api) {
    this._showedCardItemControllers = [];
    this._container = container;
    this._points = points;
    this._api = api;
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
    renderComponent(mainTripInfoElement, new WaybillComponent(this._points.getPointsByFilter()), `afterBegin`);

    this._renderPoints(this._sortType, points);
  }

  createPoint() {
    if (this._creatingPoint) {
      return;
    }

    this._creatingPoint = new ItemController(this._assortmentComponent.getElement(), this._onDataChange, this._onViewChange, this._points._points);
    this._creatingPoint.renderCardItem(EmptyPoint, MODE.ADDING);
  }

  _removePoints() {
    mainTripInfoElement.querySelector(`.trip-main__trip-info`).remove();
    this._tripDaysComponent.getElement().innerHTML = ``;
    this._showedCardItemControllers.forEach((it) => it.destroy());
    this._showedCardItemControllers = [];
  }

  _renderPoints(sortType, points) {
    this._sortType = sortType;
    const pointsList = this._tripDaysComponent.getElement();
    const newCardItems = renderAllPoints(this._sortType, pointsList, points, this._onDataChange, this._onViewChange);
    this._showedCardItemControllers = this._showedCardItemControllers.concat(newCardItems);
  }

  _updatePoints() {
    this._removePoints();
    this._renderPoints(this._sortType, this._points.getPointsByFilter());
    renderComponent(mainTripInfoElement, new WaybillComponent(this._points.getPointsByFilter()), `afterBegin`);
  }

  _onDataChange(itemController, oldData, newData) {
    if (oldData === EmptyPoint && newData === null) {
      this._creatingPoint = null;
      itemController.destroy();
      this._updatePoints();

    } else if (oldData === EmptyPoint) {
      this._creatingPoint = null;
      itemController.destroy();

      this._api.createPoint(newData) // экземпляр Point в удобном для мня формате
          .then((item) => {
            this._points.addPoint(item);
            this._updatePoints();
          })
          .catch(() => {
            itemController.shake();
          });

    } else if (newData === null) {

      this._api.deletePoint(oldData.id) // свойство id экземпляра Point
        .then(() => {
          this._points.removePoint(oldData.id);
          this. _updatePoints();
        })
        .catch(() => {
          itemController.shake();
        });

    } else {
      this._api.updatePoint(oldData.id, newData) // находится нужный id и сохраняются измененные данные
        .then((item) => {
          const isSuccess = this._points.updatePoint(oldData.id, item);

          if (isSuccess) {
            itemController.renderCardItem(item, MODE.DEFAULT);
            this._updatePoints();
          }
        })
        .catch(() => {
          itemController.shake();
        });
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
        sortedItems = points.slice().sort((a, b) => new Date(b.dateTo).getTime() - new Date(b.dateFrom).getTime() - new Date(a.dateTo).getTime() + new Date(a.dateFrom).getTime());
        break;
      case SORT_TYPES.PRICE_DOWN:
        sortedItems = points.slice().sort((a, b) => b.basePrice - a.basePrice);
        break;
      case SORT_TYPES.DEFAULT:
        sortedItems = points.slice();
        break;
    }

    this._removePoints();
    this._renderPoints(sortType, sortedItems);
    renderComponent(mainTripInfoElement, new WaybillComponent(sortedItems), `afterBegin`);
  }

  _onFilterChange() {
    this._updatePoints();
  }
}
