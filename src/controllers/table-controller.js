import AssortmentComponent, {SortType} from '../components/assortment.js';
import TripDaysComponent from '../components/trip-days.js';
import CardListComponent from '../components/card-list.js';
import CardListLightComponent from '../components/card-list-light.js';
import NoCardListComponent from '../components/no-card-list.js';
import WaybillComponent from '../components/waybill.js';
import {getDaysCount, renderComponent, showComponent, hideComponent} from '../formulas.js';
import ItemController, {Mode, EmptyPoint} from './item-controller.js';
import moment from 'moment';

const mainTripInfoElement = document.querySelector(`.trip-main`);
const TRIP_EVENTS_HIDDEN = `trip-events--hidden`;

const renderAllPoints = (sortType, container, allPoints, onDataChange, onViewChange) => {
  if (sortType === `event`) {
    const sortedCards = allPoints.map((it) => moment(it.dateFrom).format(`YYYYMMDD`))
      .filter((item, index, array) => array.indexOf(item) === index)
      .sort((a, b) => a - b);

    sortedCards.forEach((it, index) => renderComponent(container, new CardListComponent(it, getDaysCount(sortedCards)[index])));
    const tripEventsListElements = document.querySelectorAll(`.trip-events__list`);
    const itemControllers = [];

    sortedCards.forEach((item, index) => {
      allPoints.filter((elem) => item === moment(elem.dateFrom).format(`YYYYMMDD`))
        .forEach((i) => {
          const itemController = new ItemController(tripEventsListElements[index], onDataChange, onViewChange, allPoints);
          itemController.renderCardItem(i, Mode.DEFAULT);
          itemControllers.push(itemController);
        });
    });
    return itemControllers;
  } else {
    renderComponent(container, new CardListLightComponent());

    const tripEventsListElement = document.querySelector(`.trip-events__list`);

    return allPoints.map((i) => {
      const itemController = new ItemController(tripEventsListElement, onDataChange, onViewChange, allPoints);
      itemController.renderCardItem(i, Mode.DEFAULT);
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
    this._tripDaysComponent = new TripDaysComponent();
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

  chooseEnvelope() {
    const points = this._points.getPointsByFilter();
    if (points.length === 0) {
      showComponent(`trip-events__msg`);
      hideComponent(`trip-events__trip-sort`);
      hideComponent(`trip-days`);
      hideComponent(`trip-main__trip-info`);
    } else {
      hideComponent(`trip-events__msg`);
      showComponent(`trip-events__trip-sort`);
      showComponent(`trip-days`);
      showComponent(`trip-main__trip-info`);
    }
  }

  show() {
    const tripEvents = document.querySelector(`.trip-events`);
    if (tripEvents.classList.contains(TRIP_EVENTS_HIDDEN)) {
      tripEvents.classList.remove(TRIP_EVENTS_HIDDEN);
    }
  }

  hide() {
    const tripEvents = document.querySelector(`.trip-events`);
    if (!tripEvents.classList.contains(TRIP_EVENTS_HIDDEN)) {
      tripEvents.classList.add(TRIP_EVENTS_HIDDEN);
    }
  }

  renderMap() {
    const points = this._points.getPointsByFilter();

    renderComponent(this._container, this._noCardListComponent);

    renderComponent(this._container, this._assortmentComponent);
    renderComponent(this._container, this._tripDaysComponent);
    renderComponent(mainTripInfoElement, new WaybillComponent(points), `afterBegin`);
    this._renderPoints(this._sortType, points);

    this.chooseEnvelope();
  }

  createPoint() {
    if (this._creatingPoint) {
      return;
    }
    hideComponent(`trip-events__msg`);
    this._creatingPoint = new ItemController(this._assortmentComponent.getElement(), this._onDataChange, this._onViewChange, this._points._points);
    this._creatingPoint.renderCardItem(EmptyPoint, Mode.ADDING);
  }

  _removePoints() {
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
    mainTripInfoElement.querySelector(`.trip-main__trip-info`).remove();
    this._removePoints();
    this._renderPoints(this._sortType, this._points.getPointsByFilter());
    renderComponent(mainTripInfoElement, new WaybillComponent(this._points.getPointsByFilter()), `afterBegin`);
    this.chooseEnvelope();
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
            itemController.renderCardItem(item, Mode.DEFAULT);
            this._updatePoints();
          }
        })
        .catch(() => {
          itemController.shake();
        });
    }
  }

  _onViewChange() {
    this._showedCardItemControllers.forEach((it) => it.setDefaultView());
  }

  _onSortTypeChange(sortType) {
    this._tripDaysComponent.getElement().innerHTML = ``;
    let sortedItems = [];
    const points = this._points.getPointsByFilter();

    switch (sortType) {
      case SortType.TIME_DOWN:
        sortedItems = points.slice().sort((a, b) => new Date(b.dateTo).getTime() - new Date(b.dateFrom).getTime() - new Date(a.dateTo).getTime() + new Date(a.dateFrom).getTime());
        break;
      case SortType.PRICE_DOWN:
        sortedItems = points.slice().sort((a, b) => b.basePrice - a.basePrice);
        break;
      case SortType.DEFAULT:
        sortedItems = points.slice();
        break;
    }

    mainTripInfoElement.querySelector(`.trip-main__trip-info`).remove();
    this._removePoints();
    this._renderPoints(sortType, sortedItems);
    renderComponent(mainTripInfoElement, new WaybillComponent(sortedItems), `afterBegin`);
  }

  _onFilterChange() {
    this._updatePoints();
  }
}
