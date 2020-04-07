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
  extraOptions: new Map(),
  waybillType: ``,
  waybillPurpose: ``,
  description: new Set(),
  photos: new Set(),
  cardItemDate: [],
  spendingTime: [],
  price: 0,
  isFavorite: false,
};

export default class ItemController {
  constructor(container, onDataChange, onViewChange) {
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
    this._cardListItemFormComponent = new CardListItemFormComponent(cardItem);

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

    switch (mode) {
      case MODE.DEFAULT:
        if (oldCardListItemComponent && oldCardListItemFormComponent) {
          replace(this._cardListItemFormComponent, oldCardListItemFormComponent);
          replace(this._cardListItemComponent, oldCardListItemComponent);
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
        // renderComponent(this._container, this._cardListItemFormComponent, `afterEnd`);
        this._container.after(this._cardListItemFormComponent.getElement().querySelector(`form`));
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
    document.removeEventListener(`click`, this._onButtonClick);
    this._cardListItemFormComponent.reset();
    replace(this._cardListItemComponent, this._cardListItemFormComponent);
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

  _onButtonClick() { // без ".bind(this)" this === button.event__rollup-btn
    this._replaceFormToItem();
  }
}
