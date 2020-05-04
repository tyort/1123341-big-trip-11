<<<<<<< HEAD
import AssortmentComponent, {SortType} from '../components/assortment.js';
import TripDaysComponent from '../components/trip-days.js';
import CardListComponent from '../components/card-list.js';
import CardListLightComponent from '../components/card-list-light.js';
import NoCardListComponent from '../components/no-card-list.js';
import WaybillComponent from '../components/waybill.js';
import {getDaysCount, renderComponent, showComponent, hideComponent, enableComponent} from '../formulas.js';
import ItemController, {Mode, EmptyPoint} from './item-controller.js';
import moment from 'moment';

const mainTripInfoElement = document.querySelector(`.trip-main`);
const TRIP_EVENTS_HIDDEN = `trip-events--hidden`;

const renderAllPoints = (sortType, container, externalBase, onDataChange, onViewChange) => {
  if (sortType === SortType.DEFAULT) {
    const sortedCards = externalBase.points.map((it) => moment(it.dateFrom).format(`YYYYMMDD`))
      .filter((item, index, array) => array.indexOf(item) === index)
      .sort((a, b) => a - b);

    sortedCards.forEach((it, index) => renderComponent(container, new CardListComponent(it, getDaysCount(sortedCards)[index])));
    const tripEventsListElements = document.querySelectorAll(`.trip-events__list`);
    const itemControllers = [];

    sortedCards.forEach((item, index) => {
      externalBase.points.filter((elem) => item === moment(elem.dateFrom).format(`YYYYMMDD`))
        .forEach((i) => {
          const itemController = new ItemController(tripEventsListElements[index], onDataChange, onViewChange, externalBase);
          itemController.renderCardItem(i, Mode.DEFAULT);
          itemControllers.push(itemController);
        });
    });
    return itemControllers;
=======
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
>>>>>>> 9660486227da763a628df2cc5fea05f37748fc9e
  } else {
    renderComponent(container, new CardListLightComponent());

    const tripEventsListElement = document.querySelector(`.trip-events__list`);

<<<<<<< HEAD
    return externalBase.points.map((i) => {
      const itemController = new ItemController(tripEventsListElement, onDataChange, onViewChange, externalBase);
      itemController.renderCardItem(i, Mode.DEFAULT);
=======
    return allPoints.map((i) => {
      const itemController = new ItemController(tripEventsListElement, onDataChange, onViewChange, allPoints);
      itemController.renderCardItem(i, MODE.DEFAULT);
>>>>>>> 9660486227da763a628df2cc5fea05f37748fc9e
      return itemController;
    });
  }
};

export default class TableController {
<<<<<<< HEAD
  constructor(container, externalBase, api) {
    this._showedCardItemControllers = [];
    this._container = container;
    this._externalBase = externalBase;
    this._api = api;
    this._assortmentComponent = new AssortmentComponent();
    this._tripDaysComponent = new TripDaysComponent();
=======
  constructor(container, points, api) {
    this._showedCardItemControllers = [];
    this._container = container;
    this._points = points;
    this._api = api;
    this._assortmentComponent = new AssortmentComponent();
    this._tripDaysComponent = new TripDaysComponent(); // контейнер для рендеров
>>>>>>> 9660486227da763a628df2cc5fea05f37748fc9e
    this._noCardListComponent = new NoCardListComponent();
    this._creatingPoint = null;
    this._onDataChange = this._onDataChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._assortmentComponent.setSortTypeChangeHandler(this._onSortTypeChange);
<<<<<<< HEAD
    this._externalBase.setFilterChangeHandler(this._onFilterChange);
    this._sortType = SortType.DEFAULT;
  }

  chooseEnvelope() {
    const points = this._externalBase.getPointsByFilter();
    if (points.length !== 0 || this._creatingPoint !== null) {
      hideComponent(`trip-events__msg`);
      showComponent(`trip-events__trip-sort`);
      showComponent(`trip-days`);
      showComponent(`trip-main__trip-info`);
      this._creatingPoint = null;
    } else {
      showComponent(`trip-events__msg`);
      hideComponent(`trip-events__trip-sort`);
      hideComponent(`trip-days`);
      hideComponent(`trip-main__trip-info`);
    }
=======
    this._points.setFilterChangeHandler(this._onFilterChange);
    this._sortType = `event`;
>>>>>>> 9660486227da763a628df2cc5fea05f37748fc9e
  }

  show() {
    const tripEvents = document.querySelector(`.trip-events`);
<<<<<<< HEAD
    if (tripEvents.classList.contains(TRIP_EVENTS_HIDDEN)) {
      tripEvents.classList.remove(TRIP_EVENTS_HIDDEN);
=======
    if (tripEvents.classList.contains(HIDDEN_CLASS)) {
      tripEvents.classList.remove(HIDDEN_CLASS);
>>>>>>> 9660486227da763a628df2cc5fea05f37748fc9e
    }
  }

  hide() {
    const tripEvents = document.querySelector(`.trip-events`);
<<<<<<< HEAD
    if (!tripEvents.classList.contains(TRIP_EVENTS_HIDDEN)) {
      tripEvents.classList.add(TRIP_EVENTS_HIDDEN);
=======
    if (!tripEvents.classList.contains(HIDDEN_CLASS)) {
      tripEvents.classList.add(HIDDEN_CLASS);
>>>>>>> 9660486227da763a628df2cc5fea05f37748fc9e
    }
  }

  renderMap() {
<<<<<<< HEAD
    const points = this._externalBase.getPointsByFilter();

    renderComponent(this._container, this._noCardListComponent);

    renderComponent(this._container, this._assortmentComponent);
    renderComponent(this._container, this._tripDaysComponent);
    renderComponent(mainTripInfoElement, new WaybillComponent(points), `afterBegin`);
    this._renderPoints(this._sortType, points);

    this.chooseEnvelope();
  }

  createPoint() {
    const externalBase = {
      points: this._externalBase.getPointsByFilter(),
      destinations: this._externalBase.getDestinations(),
      offers: this._externalBase.getOffers()
    };

=======
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
>>>>>>> 9660486227da763a628df2cc5fea05f37748fc9e
    if (this._creatingPoint) {
      return;
    }

<<<<<<< HEAD
    hideComponent(`trip-events__msg`);
    this._onViewChange();
    this._sortType = SortType.DEFAULT;
    this._creatingPoint = new ItemController(this._assortmentComponent.getElement(), this._onDataChange, this._onViewChange, externalBase);
    this._creatingPoint.renderCardItem(EmptyPoint, Mode.ADDING);
  }

  _removePoints() {
=======
    this._creatingPoint = new ItemController(this._assortmentComponent.getElement(), this._onDataChange, this._onViewChange, this._points._points);
    this._creatingPoint.renderCardItem(EmptyPoint, MODE.ADDING);
  }

  _removePoints() {
    mainTripInfoElement.querySelector(`.trip-main__trip-info`).remove();
>>>>>>> 9660486227da763a628df2cc5fea05f37748fc9e
    this._tripDaysComponent.getElement().innerHTML = ``;
    this._showedCardItemControllers.forEach((it) => it.destroy());
    this._showedCardItemControllers = [];
  }

  _renderPoints(sortType, points) {
<<<<<<< HEAD
    const externalBase = {
      points,
      destinations: this._externalBase.getDestinations(),
      offers: this._externalBase.getOffers()
    };

    this._sortType = sortType;
    const pointsList = this._tripDaysComponent.getElement();
    const newCardItems = renderAllPoints(this._sortType, pointsList, externalBase, this._onDataChange, this._onViewChange);
=======
    this._sortType = sortType;
    const pointsList = this._tripDaysComponent.getElement();
    const newCardItems = renderAllPoints(this._sortType, pointsList, points, this._onDataChange, this._onViewChange);
>>>>>>> 9660486227da763a628df2cc5fea05f37748fc9e
    this._showedCardItemControllers = this._showedCardItemControllers.concat(newCardItems);
  }

  _updatePoints() {
<<<<<<< HEAD
    this._onSortTypeChange(this._sortType);
    this.chooseEnvelope();
=======
    this._removePoints();
    this._renderPoints(this._sortType, this._points.getPointsByFilter());
    renderComponent(mainTripInfoElement, new WaybillComponent(this._points.getPointsByFilter()), `afterBegin`);
>>>>>>> 9660486227da763a628df2cc5fea05f37748fc9e
  }

  _onDataChange(itemController, oldData, newData) {
    if (oldData === EmptyPoint && newData === null) {
      this._creatingPoint = null;
      itemController.destroy();
      this._updatePoints();
<<<<<<< HEAD
      enableComponent(`trip-main__event-add-btn`);
=======
>>>>>>> 9660486227da763a628df2cc5fea05f37748fc9e

    } else if (oldData === EmptyPoint) {
      this._creatingPoint = null;
      itemController.destroy();

      this._api.createPoint(newData)
          .then((item) => {
<<<<<<< HEAD
            this._externalBase.addPoint(item);
=======
            this._points.addPoint(item);
>>>>>>> 9660486227da763a628df2cc5fea05f37748fc9e
            this._updatePoints();
          })
          .catch(() => {
            itemController.shake();
          });
<<<<<<< HEAD
      enableComponent(`trip-main__event-add-btn`);
=======
>>>>>>> 9660486227da763a628df2cc5fea05f37748fc9e

    } else if (newData === null) {

      this._api.deletePoint(oldData.id)
        .then(() => {
<<<<<<< HEAD
          this._externalBase.removePoint(oldData.id);
=======
          this._points.removePoint(oldData.id);
>>>>>>> 9660486227da763a628df2cc5fea05f37748fc9e
          this. _updatePoints();
        })
        .catch(() => {
          itemController.shake();
        });

    } else {
      this._api.updatePoint(oldData.id, newData)
        .then((item) => {
<<<<<<< HEAD
          const isSuccess = this._externalBase.updatePoint(oldData.id, item);

          if (isSuccess) {
            itemController.renderCardItem(item, Mode.DEFAULT);
=======
          const isSuccess = this._points.updatePoint(oldData.id, item);

          if (isSuccess) {
            itemController.renderCardItem(item, MODE.DEFAULT);
>>>>>>> 9660486227da763a628df2cc5fea05f37748fc9e
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
<<<<<<< HEAD
    this._sortType = sortType;
    this._tripDaysComponent.getElement().innerHTML = ``;
    const points = this._externalBase.getPointsByFilter();
    let sortedItems = [];

    switch (sortType) {
      case SortType.TIME_DOWN:
        sortedItems = points.slice().sort((a, b) => {
          const periodOfPointTwo = new Date(b.dateTo).getTime() - new Date(b.dateFrom).getTime();
          const periodOfPointOne = new Date(a.dateTo).getTime() - new Date(a.dateFrom).getTime();
          return periodOfPointTwo - periodOfPointOne;
        });
        break;
      case SortType.PRICE_DOWN:
        sortedItems = points.slice().sort((a, b) => b.basePrice - a.basePrice);
        break;
      default:
=======
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
>>>>>>> 9660486227da763a628df2cc5fea05f37748fc9e
        sortedItems = points.slice();
        break;
    }

<<<<<<< HEAD
    mainTripInfoElement.querySelector(`.trip-main__trip-info`).remove();
=======
>>>>>>> 9660486227da763a628df2cc5fea05f37748fc9e
    this._removePoints();
    this._renderPoints(sortType, sortedItems);
    renderComponent(mainTripInfoElement, new WaybillComponent(sortedItems), `afterBegin`);
  }

  _onFilterChange() {
    this._updatePoints();
  }
}
