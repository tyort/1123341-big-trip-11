import CardListItemComponent from '../components/card_list_item.js';
import CardListItemFormComponent from '../components/card_list_item_form.js';
import {renderComponent, replace} from '../formulas.js';

const MODE = {
  DEFAULT: `default`,
  FORM: `form`,
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
  }

  renderCardItem(cardItem) { // рендер для одной карточки
    const oldCardListItemComponent = this._cardListItemComponent;
    const oldCardListItemFormComponent = this._cardListItemFormComponent;
    this._cardListItemComponent = new CardListItemComponent(cardItem);
    this._cardListItemFormComponent = new CardListItemFormComponent(cardItem);

    this._cardListItemComponent.setRollupButtonClickHandler(() => {
      this._replaceItemToForm();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._cardListItemFormComponent.setSubmitHandler(this._replaceFormToItem.bind(this));
    this._cardListItemFormComponent.setRollbackButtonClickHandler(this._replaceFormToItem.bind(this));

    if (oldCardListItemComponent && oldCardListItemFormComponent) {
      replace(this._cardListItemFormComponent, oldCardListItemFormComponent);
      replace(this._cardListItemComponent, oldCardListItemComponent);
    } else {
      renderComponent(this._container, this._cardListItemComponent);
    }
  }

  setDefaultView() { // превратить в строку и поменять MODE
    if (this._mode !== MODE.DEFAULT) { // если MODE.FORM
      this._replaceFormToItem(); // превратить форму в карточку
    }
  }

  _replaceFormToItem() {
    console.log(this._cardListItemFormComponent);
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
      this._replaceFormToItem();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}
