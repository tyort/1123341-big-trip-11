import AbstractSmartComponent from './abstract_smart_component.js';
import {
  generateExclusiveArray,
  generateExtraOption,
  WAYBILL_TYPES,
  WAYBILL_PURPOSE,
  EXTRA_OPTIONS,
  WAYBILL_DESCRIPTION,
  generateWaybillType
} from '../formulas.js';

const createExtraOptionInsert = (array) => {
  return array
    .map((item) => {
      const isChecked = item[1] ? `checked` : ``;
      return (
        `<div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-${item[0]}-1" type="checkbox" name="event-offer-${item[0]}" ${isChecked}>
          <label class="event__offer-label" for="event-offer-${item[0]}-1">
            <span class="event__offer-title">${item[0]}</span>
            &plus;
            &euro;&nbsp;<span class="event__offer-price">${EXTRA_OPTIONS.get(item[0])}</span>
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
    .slice(0, 8)
    .map((item) => {
      const isChecked = item[1] ? `checked` : ``;
      return (
        `<div class="event__type-item">
          <input id="event-type-${item[0].toLowerCase()}-1" class="event__type-input  visually-hidden"
            type="radio" name="event-type" value="${item[0]}" ${isChecked}>
          <label class="event__type-label  event__type-label--${item[0].toLowerCase()}"
            for="event-type-${item[0].toLowerCase()}-1">${item[0]}</label>
        </div>`
      );
    })
    .join(``);
};

const createWaybillTypeListTwo = (newmap) => {
  return Array.from(newmap)
    .slice(8, 11)
    .map((item) => {
      const isChecked = item[1] ? `checked` : ``;
      return (
        `<div class="event__type-item">
          <input id="event-type-${item[0].toLowerCase()}-1" class="event__type-input  visually-hidden"
            type="radio" name="event-type" value="${item[0]}" ${isChecked}>
          <label class="event__type-label  event__type-label--${item[0].toLowerCase()}"
            for="event-type-${item[0].toLowerCase()}-1">${item[0]}</label>
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

const createCardListItemFormTemplate = (cardItem, options = {}) => {
  const {cardItemDate, spendingTime, extraOptions, description, photos, price} = cardItem;
  const {isChangeFavorite, activateCheckedType, activateCheckedPurpose, activateExtraOptions} = options;
  const addExtraOptions = createExtraOptionInsert(Array.from(extraOptions), activateExtraOptions);
  const addDescription = window.he.encode(description);
  const addPhotos = createPhotos(photos);
  const waybillType = Array.from(activateCheckedType).find((it) => it[1])[0];
  const addWaybillType = generateWaybillType(waybillType);
  const waybillPurpose = Array.from(activateCheckedPurpose).find((it) => it[1])[0];
  const addWaybillPurpose = waybillPurpose;
  const addFavorite = isChangeFavorite ? `checked` : ``;
  const addListTypeForChoose = createWaybillTypeList(activateCheckedType);
  const addListTypeForChooseTwo = createWaybillTypeListTwo(activateCheckedType);
  const addListPurposeForChoose = createWaybillPurposeList(activateCheckedPurpose);
  const addCardItemDate = window.moment(cardItemDate).format(`DD/MM/YY HH:mm`);
  const addSpendingTime = window.moment(spendingTime).format(`DD/MM/YY HH:mm`);

  return (
    `<li class="trip-events__item">
      <form class="trip-events__item event  event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${waybillType.toLowerCase()}.png" alt="Event type icon">
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
              ${addWaybillType}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${addWaybillPurpose}" list="destination-list-1">
            <datalist id="destination-list-1">
              ${addListPurposeForChoose}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">
              From
            </label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text"
              name="event-start-time" value="${addCardItemDate}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">
              To
            </label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text"


              name="event-end-time" value="${addSpendingTime}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>

          <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${addFavorite}>
          <label class="event__favorite-btn" for="event-favorite-1">
            <span class="visually-hidden">Add to favorite</span>
            <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
              <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
            </svg>
          </label>

          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>

        <section class="event__details">

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

const parseFormData = (formData) => {
  const startDateToArray = window.moment(formData.get(`event-start-time`)).toArray().slice(0, 5);
  const endDateToArray = window.moment(formData.get(`event-end-time`)).toArray().slice(0, 5);
  const actualExtraOptionsMap = new Map();
  Array.from(document.querySelectorAll(`.event__offer-checkbox`))
    .map((it) => actualExtraOptionsMap.set(it.name.slice(12), false));

  const checkedExtraOptionsMap = new Map(Array.from(actualExtraOptionsMap).filter((item) => {
    return formData.get(`event-offer-${item[0]}`);
  }));

  for (const key of actualExtraOptionsMap.keys()) {
    if (checkedExtraOptionsMap.has(key)) {
      actualExtraOptionsMap.set(key, true);
    }
  }

  const photos = Array.from(document.querySelectorAll(`.event__photo`))
    .map((it) => {
      return {src: it.src, description: it.alt};
    });

  return {
    waybillType: formData.get(`event-type`),
    waybillPurpose: formData.get(`event-destination`),
    extraOptions: actualExtraOptionsMap,
    isFavorite: !!formData.get(`event-favorite`),
    cardItemDate: startDateToArray,
    spendingTime: endDateToArray,
    description: document.querySelector(`.event__destination-description`).textContent,
    photos,
    price: formData.get(`event-price`),
  };
};

export default class CardListItemForm extends AbstractSmartComponent {
  constructor(cardItem) {
    super();

    this._cardItem = cardItem;
    this._isChangeFavorite = !!cardItem.isFavorite;
    this._activateCheckedType = new Map(WAYBILL_TYPES).set(cardItem.waybillType, true); // получу актуальный Map с нужным true
    this._activateCheckedPurpose = new Map(WAYBILL_PURPOSE).set(cardItem.waybillPurpose, true); // получу актуальный Map с нужным true
    this._startFlatpickr = null;
    this._endFlatpickr = null;
    this._submitHandler = null; // зачем добавили?
    this._applyFlatpickr();
    this._deleteButtonClickHandler = null;
    this._subscribeOnEvents();
  }

  getTemplate() {
    return createCardListItemFormTemplate(this._cardItem, {
      isChangeFavorite: this._isChangeFavorite,
      activateCheckedType: this._activateCheckedType,
      activateCheckedPurpose: this._activateCheckedPurpose,
      activateExtraOptions: this._cardItem.extraOptions,
    });
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

  recoveryListeners() { // восстанавливает слушателей
    this.setSubmitHandler(this._submitHandler);
    this.setDeleteButtonClickHandler(this._deleteButtonClickHandler);
    this._subscribeOnEvents();
  }

  reRender() {
    super.reRender();
    this._applyFlatpickr();
  }

  reset() {
    const cardItem = this._cardItem;

    this._isChangeFavorite = !!cardItem.isFavorite;
    this._activateCheckedType = new Map(WAYBILL_TYPES).set(cardItem.waybillType, true);
    this._activateCheckedPurpose = new Map(WAYBILL_PURPOSE).set(cardItem.waybillPurpose, true);
    this._cardItem.extraOptions = cardItem.extraOptions;

    this.reRender();
  }

  getChangedDataByView() {
    const form = this.getElement().querySelector(`.event--edit`);
    const formData = new FormData(form);

    return parseFormData(formData);
  }

  setSubmitHandler(handler) {
    this.getElement().querySelector(`form`)
      .addEventListener(`submit`, handler);
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

    const cardItemDate = new Date(window.moment(this._cardItem.cardItemDate).format(`YYYY-MM-DD HH:mm`));
    const spendingTime = new Date(window.moment(this._cardItem.spendingTime).format(`YYYY-MM-DD HH:mm`));

    const eventStartTime = this.getElement().querySelector(`#event-start-time-1`);
    const eventEndTime = this.getElement().querySelector(`#event-end-time-1`);

    this._startFlatpickr = window.flatpickr(eventStartTime, {
      altInput: true,
      allowInput: true,
      enableTime: true,
      altFormat: `d/m/y H:i`,
      defaultDate: cardItemDate,
      maxDate: spendingTime,
      onClose: (selectedDates, dateStr) => {
        this._endFlatpickr.set(`minDate`, dateStr);
      },
    });

    this._endFlatpickr = window.flatpickr(eventEndTime, {
      altInput: true,
      allowInput: true,
      enableTime: true,
      altFormat: `d/m/y H:i`,
      defaultDate: spendingTime,
      minDate: cardItemDate,
      onClose: (selectedDates, dateStr) => {
        this._startFlatpickr.set(`maxDate`, dateStr);
      },
    });
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    element.querySelector(`.event__favorite-checkbox`)
      .addEventListener(`click`, () => {
        this._isChangeFavorite = !this._isChangeFavorite;
        this.reRender();
      });

    const eventTypeGroup = Array.from(element.querySelectorAll(`.event__type-group`));
    eventTypeGroup.forEach((it) => {
      it.addEventListener(`change`, (evt) => {
        this._activateCheckedType = new Map(WAYBILL_TYPES);
        this._activateCheckedType.set(evt.target.value, evt.target.checked);
        this._cardItem.extraOptions = new Map(generateExclusiveArray(generateExtraOption, 0, 5));
        this.reRender();
      });
    });

    const eventInputDestination = element.querySelector(`.event__input--destination`);
    eventInputDestination.addEventListener(`change`, (evt) => {
      this._activateCheckedPurpose = new Map(WAYBILL_PURPOSE);
      this._activateCheckedPurpose.set(evt.target.value, true);
      this._cardItem.description = Array.from(new Set(generateExclusiveArray(WAYBILL_DESCRIPTION, 1, 3)))
        .join(`. `) + `.`;
      this.reRender();
    });

    const eventSectionOffers = element.querySelector(`.event__section--offers`);
    eventSectionOffers.addEventListener(`change`, (evt) => {
      this._cardItem.extraOptions.set(evt.target.name.slice(12), evt.target.checked);
      this.reRender();
    });
  }
}


