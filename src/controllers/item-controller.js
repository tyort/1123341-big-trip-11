import CardListItemComponent from '../components/card_list_item.js';
import CardListItemFormComponent from '../components/card_list_item_form.js';
import {renderComponent, replace, remove} from '../formulas.js';

export const MODE = {
  ADDING: `adding`,
  DEFAULT: `default`,
  FORM: `form`,
};

export const EmptyPoint = {
  id: ``,
  offers: new Map(),
  offersPrice: new Map(),
  type: `ship`,
  name: ``,
  description: ``,
  pictures: new Array(5)
    .fill(``)
    .map(() => `http://picsum.photos/300/150?r=${Math.random()}`)
    .map((it) => {
      return {src: it, description: `где-то далеко`};
    }),
  datefrom: [],
  dateTo: [],
  basePrice: 0,
  isFavorite: false,
};

export default class ItemController {
  constructor(container, onDataChange, onViewChange, allPoints) {
    this._allPoints = allPoints;
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._mode = MODE.DEFAULT;
    this._cardListItemComponent = null;
    this._cardListItemFormComponent = null;
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._onButtonClick = this._onButtonClick.bind(this);
  }

  renderCardItem(cardItem, mode) { // рендер для одной карточки
    const oldCardListItemComponent = this._cardListItemComponent;
    const oldCardListItemFormComponent = this._cardListItemFormComponent;
    this._mode = mode;
    this._cardListItemComponent = new CardListItemComponent(cardItem);
    this._cardListItemFormComponent = new CardListItemFormComponent(cardItem, this._allPoints);

    this._cardListItemComponent.setRollupButtonClickHandler(() => {
      this._replaceItemToForm();
      document.addEventListener(`keydown`, this._onEscKeyDown);
      this._cardListItemFormComponent.getElement().querySelector(`.event__rollup-btn`)
        .addEventListener(`click`, this._onButtonClick);
    });

    this._cardListItemFormComponent.setSubmitHandler((evt) => {
      evt.preventDefault();
      const data = this._cardListItemFormComponent.getChangedDataByView();
      this._onDataChange(this, cardItem, data);
    });
    this._cardListItemFormComponent.setDeleteButtonClickHandler(() => this._onDataChange(this, cardItem, null));

    switch (mode) {
      case MODE.DEFAULT:
        if (oldCardListItemComponent && oldCardListItemFormComponent) {
          replace(this._cardListItemFormComponent, oldCardListItemFormComponent);
          replace(this._cardListItemComponent, oldCardListItemComponent);
          this._replaceFormToItem();
        } else {
          renderComponent(this._container, this._cardListItemComponent);
        }
        break;
      case MODE.ADDING:
        if (oldCardListItemComponent && oldCardListItemFormComponent) {
          remove(oldCardListItemComponent);
          remove(oldCardListItemFormComponent);
        }
        document.addEventListener(`keydown`, this._onEscKeyDown);
        this._cardListItemFormComponent.getElement().querySelector(`.event__rollup-btn`)
          .addEventListener(`click`, this._onButtonClick);
        renderComponent(this._container, this._cardListItemFormComponent, `afterEnd`);
        break;
    }
  }

  setDefaultView() { // превратить в строку и поменять MODE
    if (this._mode !== MODE.DEFAULT) { // если MODE.FORM
      this._replaceFormToItem(); // превратить форму в карточку
    }
  }

  destroy() {
    remove(this._cardListItemFormComponent);
    remove(this._cardListItemComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._cardListItemFormComponent.getElement().querySelector(`.event__rollup-btn`)
      .removeEventListener(`click`, this._onButtonClick);
  }

  _replaceFormToItem() {
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._cardListItemFormComponent.getElement().querySelector(`.event__rollup-btn`)
      .removeEventListener(`click`, this._onButtonClick);
    this._cardListItemFormComponent.reset();

    if (document.contains(this._cardListItemFormComponent.getElement())) {
      replace(this._cardListItemComponent, this._cardListItemFormComponent);
    }

    this._mode = MODE.DEFAULT;
  }

  _replaceItemToForm() {
    this._onViewChange();
    replace(this._cardListItemFormComponent, this._cardListItemComponent);
    this._mode = MODE.FORM;
  }

  _onEscKeyDown(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      if (this._mode === MODE.ADDING) {
        this._onDataChange(this, EmptyPoint, null);
      }
      this._replaceFormToItem();
    }
  }

  _onButtonClick() {
    this._replaceFormToItem();
  }
}
