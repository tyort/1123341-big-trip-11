import AssortmentComponent, {SORT_TYPES} from '../components/assortment.js';
import TripDaysComponent from '../components/trip_days.js';
import CardListComponent from '../components/card_list.js';
import CardListLightComponent from '../components/card_list_light.js';
import NoCardListComponent from '../components/no_card_list.js';
import {dayCounter, renderComponent} from '../formulas.js';
import ItemController, {MODE, EmptyPoint} from './item-controller.js';


const renderItemByDeafault = (container, sortedCards, sortedCardItems, onDataChange, onViewChange) => {
  sortedCards.forEach((it, index) => renderComponent(container, new CardListComponent(it, dayCounter(sortedCards)[index])));
  const tripEventsListElements = document.querySelectorAll(`.trip-events__list`);
  const arrayOfItemControllers = [];

  sortedCards.forEach((item, index) => {
    sortedCardItems.filter((elem) => item === window.moment(elem.cardItemDate).format(`YYYYMMDD`))
      .forEach((i) => {
        const itemController = new ItemController(tripEventsListElements[index], onDataChange, onViewChange);
        itemController.renderCardItem(i, MODE.DEFAULT);
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
    itemController.renderCardItem(i, MODE.DEFAULT);
    return itemController;
  });
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
  }

  renderMap() {
    const pointsCards = this._points.getPointsCards();
    const points = this._points.getPointsByFilter();

    if (pointsCards.length === 0) {
      renderComponent(this._container, this._noCardListComponent);
    }

    renderComponent(this._container, this._assortmentComponent);
    renderComponent(this._container, this._tripDaysComponent);

    this._renderPoints(pointsCards, points); // вызывается один раз, вначале
  }

  createPoint() {
    if (this._creatingPoint) {
      return;
    }

    this._creatingPoint = new ItemController(this._assortmentComponent.getElement(), this._onDataChange, this._onViewChange);
    // при добавлении новой карточки
    this._creatingPoint.renderCardItem(EmptyPoint, MODE.ADDING);
  }

  _removePoints() {
    this._showedCardItemControllers.forEach((it) => it.destroy());
    this._showedCardItemControllers = [];
  }

  _renderPoints(pointsCards, points) {
    const pointsList = this._tripDaysComponent.getElement();
    const newCardItems = renderItemByDeafault(pointsList, pointsCards, points, this._onDataChange, this._onViewChange);
    // при запуске, при отказе сохранения новой карточки, удаление карточки
    // переключение фильтров, при сортировке
    this._showedCardItemControllers = this._showedCardItemControllers.concat(newCardItems);
  }
  _renderPointsCardsOff(points) {
    const pointsList = this._tripDaysComponent.getElement();
    const newCardItems = renderItemBySort(pointsList, points, this._onDataChange, this._onViewChange);
    this._showedCardItemControllers = this._showedCardItemControllers.concat(newCardItems);
  }

  _updatePoints() {
    // при переходе по фильтрам; при нажатии ESC, чтобы не добавлять новую карточку;
    // при удалении карточки;
    this._removePoints();
    this._renderPoints(this._points.getPointsByFilter()); // получение определенного списка, согласно фильтра
  }

  _onDataChange(itemController, oldData, newData) {
    if (oldData === EmptyPoint && newData === null) {
      this._creatingPoint = null;
      itemController.destroy(); // уничтожаются все вьюхи и слушатели таска
      this._updatePoints(); // обновляет представление тасков
      console.log(`первый`); // я создал пусту карточку, а потом удалил

    } else if (oldData === EmptyPoint) {
      this._creatingPoint = null;
      this._points.addPoint(newData);
      itemController.renderCardItem(newData, MODE.DEFAULT);
      this._showedTaskControllers = [].concat(itemController, this._showedTaskControllers); // в начало вставляется новый таск, а другие сдвигаются
      console.log(`второй`); // вставляет пустой таск в таблицу и удаляет последний в таблице

    } else if (newData === null) { // удаление таска. если выполнится просто "if", то "else if" не будет даже рассматриваться
      this._points.removePoint(oldData.id);
      this. _updatePoints();
      console.log(`третий`); // удалил карточку

    } else { // выполнится при oldData !== EmptyPoint || newData !== null
      const isSuccess = this._points.updatePoint(oldData.id, newData);
      console.log(`четвертый`); // я что-то изменил в форме, а потом сохранил с превращением формы в карточку

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
    const pointsCards = this._points.getPointsCards();
    const points = this._points.getPointsByFilter();

    switch (sortType) {
      case SORT_TYPES.TIME_DOWN:
        sortedItems = points.sort((a, b) => new Date(...b.spendingTime).getTime() - new Date(...b.cardItemDate).getTime() - new Date(...a.spendingTime).getTime() + new Date(...a.cardItemDate).getTime());
        this._removePoints();
        this._renderPointsCardsOff(sortedItems);
        break;
      case SORT_TYPES.PRICE_DOWN:
        sortedItems = points.sort((a, b) => b.price - a.price);
        this._removePoints();
        this._renderPointsCardsOff(sortedItems);
        break;
      case SORT_TYPES.DEFAULT:
        this._removePoints();
        this._renderPoints(pointsCards, points);
        break;
    }
  }

  _onFilterChange() {
    this._updatePoints();
  }
}
