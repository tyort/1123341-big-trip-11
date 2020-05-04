<<<<<<< HEAD
import PointLineComponent from '../components/point-line.js';
import PointFormComponent from '../components/point-form.js';
=======
import CardListItemComponent from '../components/card_list_item.js';
import CardListItemFormComponent from '../components/card_list_item_form.js';
>>>>>>> 9660486227da763a628df2cc5fea05f37748fc9e
import PointModel from '../models/point.js';
import {renderComponent, replace, remove} from '../formulas.js';
import moment from 'moment';

const SHAKE_ANIMATION_TIMEOUT = 600;

<<<<<<< HEAD
export const Mode = {
=======
export const MODE = {
>>>>>>> 9660486227da763a628df2cc5fea05f37748fc9e
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
<<<<<<< HEAD
  dateFrom: new Date(),
  dateTo: new Date(),
=======
  dateFrom: null,
  dateTo: null,
>>>>>>> 9660486227da763a628df2cc5fea05f37748fc9e
  basePrice: Number(),
  isFavorite: false,
};

const parseFormData = (formData) => {
  const allOffersBoolean = new Map();
  const allOffersPrice = new Map();

  Array.from(document.querySelectorAll(`.event__offer-selector`))
    .map((it) => {
      allOffersBoolean.set(it.querySelector(`.event__offer-checkbox`).name.slice(12), false);
      allOffersPrice.set(it.querySelector(`.event__offer-checkbox`).name.slice(12), it.querySelector(`.event__offer-price`).textContent);
    });

  const checkedExtraOptionsMap = new Map(Array.from(allOffersBoolean).filter((item) => {
    return formData.get(`event-offer-${item[0]}`);
  }));

  for (const key of allOffersBoolean.keys()) {
    if (checkedExtraOptionsMap.has(key)) {
      allOffersBoolean.set(key, true);
    }
  }

  const pictures = Array.from(document.querySelectorAll(`.event__photo`))
    .map((it) => {
      return {src: it.src, description: it.alt};
    });

  const offersForServer = Array.from(allOffersPrice).map((it) => {
    return {title: it[0], price: Number(it[1])};
  });

  return new PointModel({
    'type': formData.get(`event-type`),
    'offers': offersForServer,
    'is_favorite': !!formData.get(`event-favorite`),
    'date_from': moment(formData.get(`event-start-time`)).format(),
    'date_to': moment(formData.get(`event-end-time`)).format(),
    'base_price': Number(formData.get(`event-price`)),
    'destination': {
      description: document.querySelector(`.event__destination-description`).textContent,
      name: formData.get(`event-destination`),
      pictures
    }
  });
};

export default class ItemController {
<<<<<<< HEAD
  constructor(container, onDataChange, onViewChange, externalBase) {
    this._externalBase = externalBase;
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._mode = Mode.DEFAULT;
    this._pointLineComponent = null;
    this._pointFormComponent = null;
=======
  constructor(container, onDataChange, onViewChange, allPoints) {
    this._allPoints = allPoints;
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._mode = MODE.DEFAULT;
    this._cardListItemComponent = null;
    this._cardListItemFormComponent = null;
>>>>>>> 9660486227da763a628df2cc5fea05f37748fc9e
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._onButtonClick = this._onButtonClick.bind(this);
  }

  renderCardItem(cardItem, mode) {
<<<<<<< HEAD
    const oldPointLineComponent = this._pointLineComponent;
    const oldPointFormComponent = this._pointFormComponent;
    this._mode = mode;
    this._pointLineComponent = new PointLineComponent(cardItem);
    this._pointFormComponent = new PointFormComponent(cardItem, this._externalBase);

    this._pointLineComponent.setRollupButtonClickHandler(() => {
      this._replaceItemToForm();
      document.addEventListener(`keydown`, this._onEscKeyDown);
      document.addEventListener(`click`, this._onButtonClick);
    });

    this._pointFormComponent.setSubmitHandler((evt) => {
      evt.preventDefault();

      this._pointFormComponent.setChangedDataByView({
        SAVE_BUTTON_TEXT: `Saving...`,
      });

      const formData = this._pointFormComponent.getChangedDataByView();
      const pointModel = parseFormData(formData);
      this._onDataChange(this, cardItem, pointModel);
    });
    this._pointFormComponent.setDeleteButtonClickHandler(() => {

      this._pointFormComponent.setChangedDataByView({
=======
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

      this._cardListItemFormComponent.setChangedDataByView({
        SAVE_BUTTON_TEXT: `Saving...`,
      });

      const formData = this._cardListItemFormComponent.getChangedDataByView();
      const data = parseFormData(formData);
      this._onDataChange(this, cardItem, data);
    });
    this._cardListItemFormComponent.setDeleteButtonClickHandler(() => {

      this._cardListItemFormComponent.setChangedDataByView({
>>>>>>> 9660486227da763a628df2cc5fea05f37748fc9e
        DELETE_BUTTON_TEXT: `Deleting...`,
      });
      this._onDataChange(this, cardItem, null);
    });

    switch (mode) {
<<<<<<< HEAD
      case Mode.ADDING:
        if (oldPointLineComponent && oldPointFormComponent) {
          remove(oldPointLineComponent);
          remove(oldPointFormComponent);
        }
        document.addEventListener(`keydown`, this._onEscKeyDown);
        document.addEventListener(`click`, this._onButtonClick);
        renderComponent(this._container, this._pointFormComponent, `afterEnd`);
        break;
      default:
        if (oldPointLineComponent && oldPointFormComponent) {
          replace(this._pointFormComponent, oldPointFormComponent);
          replace(this._pointLineComponent, oldPointLineComponent);
          this._replaceFormToItem();
        } else {
          renderComponent(this._container, this._pointLineComponent);
        }
=======
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
>>>>>>> 9660486227da763a628df2cc5fea05f37748fc9e
        break;
    }
  }

  setDefaultView() {
<<<<<<< HEAD
    if (this._mode !== Mode.DEFAULT) {
=======
    if (this._mode !== MODE.DEFAULT) {
>>>>>>> 9660486227da763a628df2cc5fea05f37748fc9e
      this._replaceFormToItem();
    }
  }

  destroy() {
<<<<<<< HEAD
    remove(this._pointFormComponent);
    remove(this._pointLineComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    document.removeEventListener(`click`, this._onButtonClick);
  }

  shake() {
    this._pointFormComponent.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;
    this._pointLineComponent.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;

    setTimeout(() => {
      this._pointFormComponent.getElement().style.animation = ``;
      this._pointLineComponent.getElement().style.animation = ``;

      this._pointFormComponent.setChangedDataByView({
=======
    remove(this._cardListItemFormComponent);
    remove(this._cardListItemComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._cardListItemFormComponent.getElement().querySelector(`.event__rollup-btn`)
      .removeEventListener(`click`, this._onButtonClick);
  }

  shake() {
    this._cardListItemFormComponent.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;
    this._cardListItemComponent.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;

    setTimeout(() => {
      this._cardListItemFormComponent.getElement().style.animation = ``;
      this._cardListItemComponent.getElement().style.animation = ``;

      this._cardListItemFormComponent.setChangedDataByView({
>>>>>>> 9660486227da763a628df2cc5fea05f37748fc9e
        DELETE_BUTTON_TEXT: `Delete`,
        SAVE_BUTTON_TEXT: `Save`
      });
    }, SHAKE_ANIMATION_TIMEOUT);
  }

  _replaceFormToItem() {
    document.removeEventListener(`keydown`, this._onEscKeyDown);
<<<<<<< HEAD
    document.removeEventListener(`click`, this._onButtonClick);
    this._pointFormComponent.reset();

    if (document.contains(this._pointFormComponent.getElement())) {
      replace(this._pointLineComponent, this._pointFormComponent);
    }

    this._mode = Mode.DEFAULT;
=======
    this._cardListItemFormComponent.getElement().querySelector(`.event__rollup-btn`)
      .removeEventListener(`click`, this._onButtonClick);
    this._cardListItemFormComponent.reset();

    if (document.contains(this._cardListItemFormComponent.getElement())) {
      replace(this._cardListItemComponent, this._cardListItemFormComponent);
    }

    this._mode = MODE.DEFAULT;
>>>>>>> 9660486227da763a628df2cc5fea05f37748fc9e
  }

  _replaceItemToForm() {
    this._onViewChange();
<<<<<<< HEAD
    replace(this._pointFormComponent, this._pointLineComponent);
    this._mode = Mode.FORM;
=======
    replace(this._cardListItemFormComponent, this._cardListItemComponent);
    this._mode = MODE.FORM;
>>>>>>> 9660486227da763a628df2cc5fea05f37748fc9e
  }

  _onEscKeyDown(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
<<<<<<< HEAD
      if (this._mode === Mode.ADDING) {
=======
      if (this._mode === MODE.ADDING) {
>>>>>>> 9660486227da763a628df2cc5fea05f37748fc9e
        this._onDataChange(this, EmptyPoint, null);
      }
      this._replaceFormToItem();
    }
  }

<<<<<<< HEAD
  _onButtonClick(evt) {
    if (evt.target.classList.contains(`evt__rollup-btn__setbymyself`)) {
      if (this._mode === Mode.ADDING) {
        this._onDataChange(this, EmptyPoint, null);
      }
      this._replaceFormToItem();
    }
=======
  _onButtonClick() {
    this._replaceFormToItem();
>>>>>>> 9660486227da763a628df2cc5fea05f37748fc9e
  }
}
