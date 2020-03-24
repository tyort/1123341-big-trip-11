import AssortmentComponent, {SORT_TYPES} from '../components/assortment.js';
import TripDaysComponent from '../components/trip_days.js';
import CardListComponent from '../components/card_list.js';
import CardListLightComponent from '../components/card_list_light.js';
import NoCardListComponent from '../components/no_card_list.js';
import CardListItemComponent from '../components/card_list_item.js';
import CardListItemFormComponent from '../components/card_list_item_form.js';
import {dayCounter, replace, renderComponent} from '../formulas.js';
import moment from 'moment';
import ItemController from './itemController.js';

const renderCardItem = (container, cardItem) => {
  const cardListItemComponent = new CardListItemComponent(cardItem); // скопировал
  const cardListItemFormComponent = new CardListItemFormComponent(cardItem); // скопировал

  const replaceFormToItem = () => { // скопировал
    replace(cardListItemComponent, cardListItemFormComponent);
    document.removeEventListener(`keydown`, onEscKeyDown);
  };

  cardListItemFormComponent.setRollbackButtonClickHandler(replaceFormToItem); // скопировал

  const replaceItemToForm = () => replace(cardListItemFormComponent, cardListItemComponent); // скопировал
  const onEscKeyDown = (evt) => { // скопировал
    if (evt.key === `Escape` || evt.key === `Esc`) {
      replaceFormToItem();
    }
  };

  cardListItemComponent.setRollupButtonClickHandler(() => { // скопировал
    replaceItemToForm();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  cardListItemFormComponent.setSubmitHandler(replaceFormToItem); // скопировал

  renderComponent(container, cardListItemComponent);
};

const renderItemByDeafault = (container, sortedCards, sortedCardItems) => {
  sortedCards.forEach((it, index) => { // нарисуем карты и пропишем количество дней
    renderComponent(container, new CardListComponent(it, dayCounter(sortedCards)[index]));
  });
  const tripEventsListElements = document.querySelectorAll(`.trip-events__list`);
  sortedCards.forEach((item, index) => // в кажду карту запихнем подходящие item
    sortedCardItems.filter((elem) => item === moment(elem.cardItemDate).format(`YYYYMMDD`))
      .forEach((i) => renderCardItem(tripEventsListElements[index], i))
  );
};

const renderItemBySort = (container, sortedCardItems) => {
  renderComponent(container, new CardListLightComponent());
  const tripEventsListElement = document.querySelector(`.trip-events__list`);
  sortedCardItems.forEach((i) => renderCardItem(tripEventsListElement, i));
};

export default class TableController {
  constructor(container) {
    this._sortedCards = [];
    this._sortedCardItems = [];
    this._container = container;
    this._assortmentComponent = new AssortmentComponent();
    this._tripDaysComponent = new TripDaysComponent(); // контейнер для рендеров
    this._noCardListComponent = new NoCardListComponent();
  }

  renderMap(sortedCards, sortedCardItems) {
    this._sortedCards = sortedCards;
    this._sortedCardItems = sortedCardItems;

    if (sortedCards.length === 0) {
      renderComponent(this._container, this._noCardListComponent);
    }

    renderComponent(this._container, this._assortmentComponent);
    renderComponent(this._container, this._tripDaysComponent);
    renderItemByDeafault(this._tripDaysComponent.getElement(), this._sortedCards, this._sortedCardItems);

    this._assortmentComponent.setSortTypeChangeHandler((sortType) => {
      this._tripDaysComponent.getElement().innerHTML = ``;
      let sortedItems = [];

      switch (sortType) {
        case SORT_TYPES.TIME_DOWN:
          sortedItems = this._sortedCardItems.sort((a, b) => new Date(...b.spendingTime).getTime() - new Date(...b.cardItemDate).getTime() - new Date(...a.spendingTime).getTime() + new Date(...a.cardItemDate).getTime());
          renderItemBySort(this._tripDaysComponent.getElement(), sortedItems);
          break;
        case SORT_TYPES.PRICE_DOWN:
          sortedItems = this._sortedCardItems.sort((a, b) => b.price - a.price);
          renderItemBySort(this._tripDaysComponent.getElement(), sortedItems);
          break;
        case SORT_TYPES.DEFAULT:
          renderItemByDeafault(this._tripDaysComponent.getElement(), this._sortedCards, this._sortedCardItems);
          break;
      }
    });
  }

  // _onDataChange(itemController, oldData, newData) { // возвращает обновленный массив и перерисовывает измененную карточку
  //   const index = this._sortedCardItems.findIndex((it) => it === oldData);
  //   if (index === -1) {
  //     return;
  //   }
  //   this._sortedCardItems = [].concat(this._sortedCardItems.slice(0, index), newData, this._sortedCardItems.slice(index + 1));
  //   itemController.render(this._sortedCardItems[index]);
  // }
}
