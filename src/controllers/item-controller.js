import PointLineComponent from '../components/point-line.js';
import PointFormComponent from '../components/point-form.js';
import PointModel from '../models/point.js';
import {renderComponent, replace, remove, Mode} from '../formulas.js';
import moment from 'moment';

const SHAKE_ANIMATION_TIMEOUT = 600;

export const EmptyPoint = {
  id: ``,
  offers: new Map(),
  offersPrice: new Map(),
  type: `sightseeing`,
  name: ``,
  description: ``,
  pictures: [],
  dateFrom: new Date(),
  dateTo: new Date(),
  basePrice: Number(),
  isFavorite: false,
};

const parseFormData = (formData) => {
  const allOffersPrice = new Map();

  Array.from(document.querySelectorAll(`.event__offer-selector`))
    .map((item) => {
      allOffersPrice.set(item.querySelector(`.event__offer-checkbox`).name.slice(12), item.querySelector(`.event__offer-price`).textContent);
    });

  const checkedExtraOptionsMap = new Map(Array.from(allOffersPrice).filter((item) => {
    return formData.get(`event-offer-${item[0]}`);
  }));

  const pictures = Array.from(document.querySelectorAll(`.event__photo`))
    .map((picture) => {
      return {src: picture.src, description: picture.alt};
    });

  const offersForServer = Array.from(checkedExtraOptionsMap).map((checkedOffer) => {
    return {title: checkedOffer[0], price: Number(checkedOffer[1])};
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
  constructor(container, onDataChange, onViewChange, externalBase) {
    this._externalBase = externalBase;
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._mode = Mode.DEFAULT;
    this._pointLineComponent = null;
    this._pointFormComponent = null;
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._onButtonClick = this._onButtonClick.bind(this);
    this._choosedSubmitValue = null;
  }

  render(cardItem, mode) {
    const oldPointLineComponent = this._pointLineComponent;
    const oldPointFormComponent = this._pointFormComponent;
    this._mode = mode;
    this._pointLineComponent = new PointLineComponent(cardItem);
    this._pointFormComponent = new PointFormComponent(mode, cardItem, this._externalBase);

    this._pointLineComponent.setRollupButtonClickHandler(() => {
      this._replaceLineToForm();
      document.addEventListener(`keydown`, this._onEscKeyDown);
      document.addEventListener(`click`, this._onButtonClick);
    });

    this._pointFormComponent.setSubmitHandler((evt) => {
      evt.preventDefault();
      this._choosedSubmitValue = evt.target.value;
      const formData = this._pointFormComponent.getChangedDataByView();
      let pointModel = null;

      if (this._choosedSubmitValue === `on`) {
        pointModel = cardItem;
        pointModel.isFavorite = !pointModel.isFavorite;

      } else {
        this._pointFormComponent.setChangedDataByView({
          SAVE_BUTTON_TEXT: `Saving...`,
        });
        pointModel = parseFormData(formData);
      }

      this._onDataChange(this, cardItem, pointModel);
    });

    this._pointFormComponent.setDeleteButtonClickHandler(() => {

      this._pointFormComponent.setChangedDataByView({
        DELETE_BUTTON_TEXT: `Deleting...`,
      });
      this._onDataChange(this, cardItem, null);
    });

    switch (mode) {
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
        } else {
          renderComponent(this._container, this._pointLineComponent);
        }
        break;
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToLine();
    }
  }

  destroy() {
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
        DELETE_BUTTON_TEXT: `Delete`,
        SAVE_BUTTON_TEXT: `Save`
      });
    }, SHAKE_ANIMATION_TIMEOUT);
  }

  _replaceFormToLine() {
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    document.removeEventListener(`click`, this._onButtonClick);
    this._pointFormComponent.reset();

    if (document.contains(this._pointFormComponent.getElement())) {
      replace(this._pointLineComponent, this._pointFormComponent);
    }

    this._mode = Mode.DEFAULT;
  }

  _replaceLineToForm() {
    this._onViewChange();
    replace(this._pointFormComponent, this._pointLineComponent);
    this._mode = Mode.FORM;
  }

  _onEscKeyDown(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      if (this._mode === Mode.ADDING) {
        this._onDataChange(this, EmptyPoint, null);
      }
      this._replaceFormToLine();
    }
  }

  _onButtonClick(evt) {
    if (evt.target.classList.contains(`evt__rollup-btn__setbymyself`)) {
      if (this._mode === Mode.ADDING) {
        this._onDataChange(this, EmptyPoint, null);
      }
      this._replaceFormToLine();
    }
  }
}
