import AssortmentComponent, {SORT_TYPES} from '../components/assortment.js';
import TripDaysComponent from '../components/trip_days.js';
import CardListComponent from '../components/card_list.js';
import CardListLightComponent from '../components/card_list_light.js';
import NoCardListComponent from '../components/no_card_list.js';
import CardListItemComponent from '../components/card_list_item.js';
import CardListItemFormComponent from '../components/card_list_item_form.js';
import {renderCompon, getCompareArray, dayCounter} from '../formulas.js';

const renderCardItem = (container, cardItem) => {
  const cardListItemComponent = new CardListItemComponent(cardItem);
  const cardListItemFormComponent = new CardListItemFormComponent(cardItem);

  const replaceFormToItem = () => {
    container.replaceChild(cardListItemComponent.getElement(), cardListItemFormComponent.getElement());
    document.removeEventListener(`keydown`, onEscKeyDown);
  };

  cardListItemFormComponent.setRollbackButtonClickHandler(replaceFormToItem);

  const replaceItemToForm = () => container.replaceChild(cardListItemFormComponent.getElement(), cardListItemComponent.getElement());
  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      replaceFormToItem();
    }
  };

  cardListItemComponent.setRollupButtonClickHandler(() => {
    replaceItemToForm();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  const editForm = cardListItemFormComponent.getElement().querySelector(`form`);
  editForm.addEventListener(`submit`, replaceFormToItem);

  renderCompon(container, cardListItemComponent.getElement());
};

const renderItemByDeafault = (container, sortedCards, sortedCardItems) => {
  sortedCards.forEach((it, index) => { // нарисуем карты и пропишем количество дней
    renderCompon(container, new CardListComponent(it, dayCounter(sortedCards)[index]).getElement());
  });
  const tripEventsListElements = document.querySelectorAll(`.trip-events__list`);
  sortedCards.forEach((item, index) => // в кажду карту запихнем подходящие item
    sortedCardItems.filter((elem) => getCompareArray(item, elem.cardItemDate))
      .forEach((i) => renderCardItem(tripEventsListElements[index], i))
  );
};

const renderItemBySort = (container, sortedCardItems) => {
  renderCompon(container, new CardListLightComponent().getElement());
  const tripEventsListElement = document.querySelector(`.trip-events__list`);
  sortedCardItems.forEach((i) => renderCardItem(tripEventsListElement, i));
};

export default class TableController {
  constructor(container) {
    this._container = container;
    this._assortmentComponent = new AssortmentComponent();
    this._tripDaysComponent = new TripDaysComponent().getElement(); // контейнер для рендеров
    this._noCardListComponent = new NoCardListComponent().getElement();
  }

  renderMap(sortedCards, sortedCardItems) {
    if (sortedCards.length === 0) {
      renderCompon(this._container, this._noCardListComponent);
    }

    renderCompon(this._container, this._assortmentComponent.getElement());
    renderCompon(this._container, this._tripDaysComponent);
    renderItemByDeafault(this._tripDaysComponent, sortedCards, sortedCardItems);

    this._assortmentComponent.setSortTypeChangeHandler((sortType) => {
      this._tripDaysComponent.innerHTML = ``;
      let sortedItems = [];

      switch (sortType) {
        case SORT_TYPES.TIME_DOWN:
          sortedItems = sortedCardItems.sort((a, b) => new Date(...b.spendingTime).getTime() - new Date(...b.cardItemDate).getTime() - new Date(...a.spendingTime).getTime() + new Date(...a.cardItemDate).getTime());
          renderItemBySort(this._tripDaysComponent, sortedItems);
          break;
        case SORT_TYPES.PRICE_DOWN:
          sortedItems = sortedCardItems.sort((a, b) => b.price - a.price);
          renderItemBySort(this._tripDaysComponent, sortedItems);
          break;
        case SORT_TYPES.DEFAULT:
          renderItemByDeafault(this._tripDaysComponent, sortedCards, sortedCardItems);
          break;
      }
    });
  }
  //   renderCardItem(this._tripDaysComponent, sortedItems);

  //   if (sortType === SortType.DEFAULT) {
  //     renderLoadMoreButton();
  //   } else {
  //     remove(this._loadMoreButtonComponent);
  //   }
  // });
}
