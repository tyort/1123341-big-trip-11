import AbstractSmartComponent from './abstract-smart-component.js';
import {generateWaybillType, createElement, Mode} from '../formulas.js';
import flatpickr from 'flatpickr';
import he from 'he';
import moment from 'moment';

const LETTERS_COUNT = 12;

const ButtonText = {
  DELETE_BUTTON_TEXT: `Delete`,
  SAVE_BUTTON_TEXT: `Save`
};

const createExtraOptionInsert = (array, newmap) => {
  return array
    .map((item) => {
      const isChecked = item[1] ? `checked` : ``;
      return (
        `<div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-${item[0]}-1" type="checkbox" name="event-offer-${item[0]}" ${isChecked}>
          <label class="event__offer-label" for="event-offer-${item[0]}-1">
            <span class="event__offer-title">${item[0]}</span>
            &plus;
            &euro;&nbsp;<span class="event__offer-price">${newmap.get(item[0])}</span>
          </label>
        </div>`
      );
    })
    .join(``);
};

const createPhotos = (array) => {
  return array
    .map((item) => {
      return (
        `<img class="event__photo" src="${item.src}" alt="${item.description}"></img>`
      );
    })
    .join(``);
};

const createWaybillTypeList = (newmap) => {
  return Array.from(newmap)
    .filter((typeName) => typeName[0] !== `check-in` && typeName[0] !== `sightseeing` && typeName[0] !== `restaurant`)
    .map((item) => {
      const isChecked = item[1] ? `checked` : ``;
      return (
        `<div class="event__type-item">
          <input id="event-type-${item[0]}-1" class="event__type-input  visually-hidden"
            type="radio" name="event-type" value="${item[0]}" ${isChecked}>
          <label class="event__type-label  event__type-label--${item[0]}"
            for="event-type-${item[0]}-1">${item[0]}</label>
        </div>`
      );
    })
    .join(``);
};

const createWaybillTypeListTwo = (newmap) => {
  return Array.from(newmap)
    .filter((typeName) => typeName[0] === `check-in` || typeName[0] === `sightseeing` || typeName[0] === `restaurant`)
    .map((item) => {
      const isChecked = item[1] ? `checked` : ``;
      return (
        `<div class="event__type-item">
          <input id="event-type-${item[0]}-1" class="event__type-input  visually-hidden"
            type="radio" name="event-type" value="${item[0]}" ${isChecked}>
          <label class="event__type-label  event__type-label--${item[0]}"
            for="event-type-${item[0]}-1">${item[0]}</label>
        </div>`
      );
    })
    .join(``);
};

const createWaybillPurposeList = (newmap) => {
  return Array.from(newmap)
    .map((item) => {
      return (
        `<option value="${item[0]}"></option>`
      );
    })
    .join(``);
};

const createPointFormTemplate = (offers, currentMode, options = {}) => {
  const {
    activateButtonText,
    isChangeFavorite,
    activateCheckedType,
    activateCheckedPurpose,
    activateExtraOptions,
    activateDescription,
    activateExtraOptionsPrice,
    activateBasePrice,
    activateDateFrom,
    activateDateTo,
    activatePictures
  } = options;

  const addWaybillType = Array.from(activateCheckedType).find((type) => type[1])[0];

  const activatedOffers = Array.from(activateExtraOptions);
  const allTypesOffers = Array.from(offers.filter((it) => it.type === addWaybillType)[0].offers);
  const currentOffersList = new Map([...allTypesOffers, ...activatedOffers]);

  const addExtraOptions = createExtraOptionInsert(Array.from(currentOffersList), activateExtraOptionsPrice);
  const addDescription = he.encode(activateDescription);
  const addPhotos = createPhotos(activatePictures);
  const addWaybillPurpose = Array.from(activateCheckedPurpose).find((purpose) => purpose[1])[0];
  const addFavorite = isChangeFavorite ? `checked` : ``;
  const addListTypeForChoose = createWaybillTypeList(activateCheckedType);
  const addListTypeForChooseTwo = createWaybillTypeListTwo(activateCheckedType);
  const addListPurposeForChoose = createWaybillPurposeList(activateCheckedPurpose);
  const addDateFrom = moment(activateDateFrom).format(`DD/MM/YY HH:mm`);
  const addDateTo = moment(activateDateTo).format(`DD/MM/YY HH:mm`);

  const deleteButtonText = currentMode === `adding` ? `Cancel` : activateButtonText.DELETE_BUTTON_TEXT;
  const saveButtonText = activateButtonText.SAVE_BUTTON_TEXT;

  const hideDescriptionTitle = addDescription === `` ? `visually-hidden` : ``;

  return (
    `<li class="trip-events__item">
      <form class="trip-events__item event  event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${addWaybillType}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Transfer</legend>
                ${addListTypeForChoose}
              </fieldset>
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Activity</legend>
                ${addListTypeForChooseTwo}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${generateWaybillType(addWaybillType)}
            </label>
            <input
              class="event__input  event__input--destination"
              id="event-destination-1"
              type="text"
              name="event-destination"
              value="${addWaybillPurpose}"
              list="destination-list-1"
              required
            >
            <datalist id="destination-list-1">
              ${addListPurposeForChoose}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">
              From
            </label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text"
              name="event-start-time" value="${addDateFrom}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">
              To
            </label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text"


              name="event-end-time" value="${addDateTo}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${activateBasePrice}" min="0" max="2000">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">${saveButtonText}</button>
          <button class="event__reset-btn" type="reset">${deleteButtonText}</button>

    ${currentMode === `adding`
      ? ``
      : `<input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${addFavorite}>
        <label class="event__favorite-btn" for="event-favorite-1">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </label>

        <button class="event__rollup-btn evt__rollup-btn__setbymyself" type="button">
          <span class="visually-hidden">Open event</span>
        </button>`
    }
          


        </header>

        <section class="event__details ${hideDescriptionTitle}">

          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>

            <div class="event__available-offers">
              ${addExtraOptions}
            </div>
          </section>

          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${addDescription}</p>

            <div class="event__photos-container">
              <div class="event__photos-tape">
                ${addPhotos}
              </div>
            </div>
          </section>
        </section>
      </form>
    </li>`
  );
};

export default class PointForm extends AbstractSmartComponent {
  constructor(mode, point, externalBase) {
    super();

    this._mode = mode;
    this._itemForm = point;
    this._externalBase = externalBase;
    this._destinations = externalBase.destinations;
    this._offers = externalBase.offers;
    this._allPoints = externalBase.points;
    this._isChangeFavorite = !!point.isFavorite;
    this._activateCheckedType = new Map(this._offers.map((offer) => [offer.type, false])).set(point.type, true);
    this._activateCheckedPurpose = new Map(this._destinations.map((destination) => [destination.name, false])).set(point.name, true);
    this._activateExtraOptions = new Map(point.offers);
    this._activateDescription = point.description;
    this._activateExtraOptionsPrice = this._offers.filter((it) => it.type === point.type)[0].offersPrice;
    this._activateBasePrice = point.basePrice;
    this._activateButtonText = ButtonText;
    this._activateDateFrom = point.dateFrom;
    this._activateDateTo = point.dateTo;
    this._activatePictures = point.pictures;
    this._startFlatpickr = null;
    this._endFlatpickr = null;
    this._submitHandler = null;
    this._applyFlatpickr();
    this._deleteButtonClickHandler = null;
    this._subscribeOnEvents();
  }

  getTemplate() {
    return createPointFormTemplate(this._offers, this._mode, {
      isChangeFavorite: this._isChangeFavorite,
      activateCheckedType: this._activateCheckedType,
      activateCheckedPurpose: this._activateCheckedPurpose,
      activateExtraOptions: this._activateExtraOptions,
      activateDescription: this._activateDescription,
      activateExtraOptionsPrice: this._activateExtraOptionsPrice,
      activateButtonText: this._activateButtonText,
      activateBasePrice: this._activateBasePrice,
      activateDateTo: this._activateDateTo,
      activatePictures: this._activatePictures,
    });
  }

  getElement() {
    if (!this._element) {
      this._element = this._mode === Mode.ADDING
        ? createElement(this.getTemplate()).querySelector(`form`)
        : createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    if (this._startFlatpickr || this._endFlatpickr) {
      this._startFlatpickr.destroy();
      this._endFlatpickr.destroy();
      this._startFlatpickr = null;
      this._endFlatpickr = null;
    }

    super.removeElement();
  }

  recoveryListeners() {
    this.setSubmitHandler(this._submitHandler);
    this.setDeleteButtonClickHandler(this._deleteButtonClickHandler);
    this._subscribeOnEvents();
  }

  reRender() {
    super.reRender();
    this._applyFlatpickr();
  }

  reset() {
    const point = this._itemForm;

    this._activateCheckedType = new Map(this._offers.map((offer) => [offer.type, false])).set(point.type, true);
    this._activateCheckedPurpose = new Map(this._destinations.map((destination) => [destination.name, false])).set(point.name, true);
    this._activateExtraOptions = new Map(point.offers);
    this._activateDescription = point.description;
    this._activateExtraOptionsPrice = this._offers.filter((it) => it.type === point.type)[0].offersPrice;
    this._activateBasePrice = point.basePrice;
    this._activateDateFrom = point.dateFrom;
    this._activateDateTo = point.dateTo;
    this._activatePictures = point.pictures;

    this.reRender();
  }

  getChangedDataByView() {
    const form = this._mode === Mode.ADDING
      ? this.getElement()
      : this.getElement().querySelector(`.event--edit`);

    return new FormData(form);
  }

  setChangedDataByView(buttonWaitingText) {
    this._activateButtonText = Object.assign({}, ButtonText, buttonWaitingText);
    this.reRender();
  }

  setSubmitHandler(handler) {
    const formComponent = this._mode === Mode.ADDING
      ? this.getElement()
      : this.getElement().querySelector(`form`);

    formComponent.addEventListener(`submit`, handler);

    if (this.getElement().querySelector(`.event__favorite-checkbox`)) {
      formComponent.querySelector(`.event__favorite-checkbox`)
        .addEventListener(`click`, handler);
    }

    this._submitHandler = handler;
  }

  setDeleteButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__reset-btn`)
      .addEventListener(`click`, handler);

    this._deleteButtonClickHandler = handler;
  }

  _applyFlatpickr() {
    if (this._startFlatpickr || this._endFlatpickr) {
      this._startFlatpickr.destroy();
      this._startFlatpickr = null;
      this._endFlatpickr.destroy();
      this._endFlatpickr = null;
    }

    const eventStartTime = this.getElement().querySelector(`#event-start-time-1`);
    const eventEndTime = this.getElement().querySelector(`#event-end-time-1`);

    this._startFlatpickr = flatpickr(eventStartTime, {
      altInput: true,
      allowInput: true,
      enableTime: true,
      altFormat: `d/m/y H:i`,
      defaultDate: this._activateDateFrom,
      maxDate: this._activateDateTo,
      onClose: (selectedDates, dateStr) => {
        this._endFlatpickr.set(`minDate`, dateStr);
      },
    });

    this._endFlatpickr = flatpickr(eventEndTime, {
      altInput: true,
      allowInput: true,
      enableTime: true,
      altFormat: `d/m/y H:i`,
      defaultDate: this._activateDateTo,
      minDate: this._activateDateFrom,
      onClose: (selectedDates, dateStr) => {
        this._startFlatpickr.set(`maxDate`, dateStr);
      },
    });
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    element.querySelector(`#event-start-time-1`)
      .addEventListener(`change`, (evt) => {
        this._activateDateFrom = evt.target.value;
        this.reRender();
      });

    element.querySelector(`#event-end-time-1`)
      .addEventListener(`change`, (evt) => {
        this._activateDateTo = evt.target.value;
        this.reRender();
      });

    element.querySelector(`.event__input--price`)
      .addEventListener(`input`, (evt) => {
        this._activateBasePrice = evt.target.value;
      });

    if (element.querySelector(`.event__favorite-checkbox`)) {
      element.querySelector(`.event__favorite-checkbox`)
      .addEventListener(`click`, () => {
        this._isChangeFavorite = !this._isChangeFavorite;
        this.reRender();
      });
    }

    const eventTypeGroup = Array.from(element.querySelectorAll(`.event__type-group`));
    eventTypeGroup.forEach((typeGroup) => {
      typeGroup.addEventListener(`change`, (evt) => {
        this._activateCheckedType = new Map(this._offers.map((item) => [item.type, false]));
        this._activateCheckedType.set(evt.target.value, evt.target.checked);
        const properPoint = this._offers.find((item) => item.type === evt.target.value);
        this._activateExtraOptions = properPoint.offers;
        this._activateExtraOptionsPrice = properPoint.offersPrice;
        this.reRender();
      });
    });

    const eventInputDestination = element.querySelector(`.event__input--destination`);
    eventInputDestination.addEventListener(`change`, (evt) => {
      this._activateCheckedPurpose = new Map(this._destinations.map((destination) => [destination.name, false]));
      this._activateCheckedPurpose.set(evt.target.value, true);

      const properPoint = this._destinations.find((item) => item.name === evt.target.value);
      this._activateDescription = properPoint ? properPoint.description : ``;
      this._activatePictures = properPoint ? properPoint.pictures : [];
      this.reRender();
    });

    const eventSectionOffers = element.querySelector(`.event__section--offers`);
    eventSectionOffers.addEventListener(`change`, (evt) => {
      this._activateExtraOptions.set(evt.target.name.slice(LETTERS_COUNT), evt.target.checked);
      this.reRender();
    });
  }
}


