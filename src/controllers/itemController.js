import CardListItemComponent from '../components/card_list_item.js';
import CardListItemFormComponent from '../components/card_list_item_form.js';
import {renderCompon, replace} from '../formulas.js';

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

  render(cardItem) { // рендер для одной карточки
    const oldCardListItemComponent = this._cardListItemComponent;
    const oldCardListItemFormComponent = this._cardListItemFormComponent;
    this._cardListItemComponent = new CardListItemComponent(cardItem);
    this._cardListItemFormComponent = new CardListItemFormComponent(cardItem);

    this._cardListItemComponent.setRollupButtonClickHandler(() => {
      this._replaceItemToForm();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._cardListItemFormComponent.setSubmitHandler(() => this._replaceFormToItem());

    if (oldCardListItemComponent && oldCardListItemFormComponent) {
      replace(this._cardListItemFormComponent, oldCardListItemFormComponent);
      replace(this._cardListItemComponent, oldCardListItemComponent);
    } else {
      renderCompon(this._container, this._cardListItemComponent);
    }
  }

  setDefaultView() { // если карточка открыта в виде формы
    if (this._mode !== MODE.DEFAULT) {
      this._replaceFormToItem(); // превратить форму в карточку
    }
  }

//   _replaceEditToTask() {
//     this._taskEditComponent.reset();

//     replace(this._taskComponent, this._taskEditComponent);
//     this._mode = Mode.DEFAULT;
//   }

//   _replaceTaskToEdit() {
//     this._onViewChange();

//     replace(this._taskEditComponent, this._taskComponent);
//     this._mode = Mode.EDIT;
//   }

//   _onEscKeyDown(evt) {
//     const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

//     if (isEscKey) {
//       this._replaceEditToTask();
//       document.removeEventListener(`keydown`, this._onEscKeyDown);
//     }
//   }
}
