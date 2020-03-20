import AssortmentComponent from '../components/assortment.js';
import TripDaysComponent from '../components/trip_days.js';
import CardListComponent from '../components/card_list.js';
import NoCardListComponent from '../components/no_card_list.js';
import CardListItemComponent from '../components/card_list_item.js';
import CardListItemFormComponent from '../components/card_list_item_form.js';
import {renderCompon, getCompareArray} from '../formulas.js';

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

export default class CardsMapController {
  constructor(container) {
    this._container = container;
    this._assortmentComponent = new AssortmentComponent().getElement();
    this._tripDaysComponent = new TripDaysComponent().getElement();
    this._noCardListComponent = new NoCardListComponent().getElement();
  }

  renderMap(sortedCards, sortedCardItems) {
    if (sortedCards.length > 0) {
      renderCompon(this._container, this._assortmentComponent);
      renderCompon(this._container, this._tripDaysComponent);

      const tripDaysElement = document.querySelector(`.trip-days`);
      const dayCounter = sortedCards.map((it) => new Date(...it))
        .map((it, index, array) => 1 + Math.ceil(Math.abs(it.getTime() - array[0].getTime()) / (1000 * 3600 * 24)));
      sortedCards.forEach((it, index) => renderCompon(tripDaysElement, new CardListComponent(it, dayCounter[index]).getElement()));

      const tripEventsListElement = document.querySelectorAll(`.trip-events__list`);
      sortedCards.forEach((item, index) =>
        sortedCardItems.filter((it) => getCompareArray(item, it.cardItemDate))
          .forEach((it) => renderCardItem(tripEventsListElement[index], it))
      );
    } else {
      renderCompon(this._container, this._noCardListComponent);
    }
  }
}
