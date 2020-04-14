import AbstractSmartComponent from './abstract_smart_component.js';
import {
  generateWaybillType
} from '../formulas.js';

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
    .filter((it) => it[0] !== `check-in` && it[0] !== `sightseeing` && it[0] !== `restaurant`)
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
    .filter((it) => it[0] === `check-in` || it[0] === `sightseeing` || it[0] === `restaurant`)
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

const createCardListItemFormTemplate = (cardItem, options = {}) => {
  const {datefrom, dateTo, pictures, basePrice, offersPrice} = cardItem;
  const {isChangeFavorite, activateCheckedType, activateCheckedPurpose, activateExtraOptions, activateDescription} = options;
  const addExtraOptions = createExtraOptionInsert(Array.from(activateExtraOptions), offersPrice);
  const addDescription = window.he.encode(activateDescription);
  const addPhotos = createPhotos(pictures);
  const addWaybillType = Array.from(activateCheckedType).find((it) => it[1])[0];
  const addWaybillPurpose = Array.from(activateCheckedPurpose).find((it) => it[1])[0];
  const addFavorite = isChangeFavorite ? `checked` : ``;
  const addListTypeForChoose = createWaybillTypeList(activateCheckedType);
  const addListTypeForChooseTwo = createWaybillTypeListTwo(activateCheckedType);
  const addListPurposeForChoose = createWaybillPurposeList(activateCheckedPurpose);
  const addCardItemDate = window.moment(datefrom).format(`DD/MM/YY HH:mm`);
  const addDateTo = window.moment(dateTo).format(`DD/MM/YY HH:mm`);

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


              name="event-end-time" value="${addDateTo}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
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

          <section class="event__section  event__section--offers ${activateExtraOptions.size > 0 ? `` : `visually-hidden`}">
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

  return {
    type: formData.get(`event-type`),
    name: formData.get(`event-destination`),
    offers: allOffersBoolean,
    offersPrice: allOffersPrice,
    isFavorite: !!formData.get(`event-favorite`),
    datefrom: startDateToArray,
    dateTo: endDateToArray,
    description: document.querySelector(`.event__destination-description`).textContent,
    pictures,
    basePrice: Number(formData.get(`event-price`)),
  };
};

export default class CardListItemForm extends AbstractSmartComponent {
  constructor(cardItem, allpoints) {
    super();

    this._cardItem = cardItem;
    this._allPoints = allpoints;
    this._isChangeFavorite = !!cardItem.isFavorite;
    this._activateCheckedType = new Map(this._allPoints.map((it) => [it.type, false])).set(cardItem.type, true); // получу актуальный Map с нужным true
    this._activateCheckedPurpose = new Map(this._allPoints.map((it) => [it.name, false])).set(cardItem.name, true); // получу актуальный Map с нужным true
    this._activateExtraOptions = new Map(cardItem.offers);
    this._activateDescription = cardItem.description;
    this._startFlatpickr = null;
    this._endFlatpickr = null;
    this._submitHandler = null;
    this._applyFlatpickr();
    this._deleteButtonClickHandler = null;
    this._subscribeOnEvents();
  }

  getTemplate() {
    return createCardListItemFormTemplate(this._cardItem, {
      isChangeFavorite: this._isChangeFavorite,
      activateCheckedType: this._activateCheckedType,
      activateCheckedPurpose: this._activateCheckedPurpose,
      activateExtraOptions: this._activateExtraOptions,
      activateDescription: this._activateDescription
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
    this._activateCheckedType = new Map(this._allPoints.map((it) => [it.type, false])).set(cardItem.type, true); // получу актуальный Map с нужным true
    this._activateCheckedPurpose = new Map(this._allPoints.map((it) => [it.name, false])).set(cardItem.name, true); // получу актуальный Map с нужным true
    this._activateExtraOptions = new Map(cardItem.offers);
    this._activateDescription = cardItem.description;

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

    const datefrom = new Date(window.moment(this._cardItem.datefrom).format(`YYYY-MM-DD HH:mm`));
    const dateTo = new Date(window.moment(this._cardItem.dateTo).format(`YYYY-MM-DD HH:mm`));

    const eventStartTime = this.getElement().querySelector(`#event-start-time-1`);
    const eventEndTime = this.getElement().querySelector(`#event-end-time-1`);

    this._startFlatpickr = window.flatpickr(eventStartTime, {
      altInput: true,
      allowInput: true,
      enableTime: true,
      altFormat: `d/m/y H:i`,
      defaultDate: datefrom,
      maxDate: dateTo,
      onClose: (selectedDates, dateStr) => {
        this._endFlatpickr.set(`minDate`, dateStr);
      },
    });

    this._endFlatpickr = window.flatpickr(eventEndTime, {
      altInput: true,
      allowInput: true,
      enableTime: true,
      altFormat: `d/m/y H:i`,
      defaultDate: dateTo,
      minDate: datefrom,
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
        this._activateCheckedType = new Map(this._allPoints.map((item) => [item.type, false]));
        this._activateCheckedType.set(evt.target.value, evt.target.checked);
        const properPoint = this._allPoints.find((item) => item.type === evt.target.value);
        this._activateExtraOptions = properPoint.offers;
        this.reRender();
      });
    });

    const eventInputDestination = element.querySelector(`.event__input--destination`);
    eventInputDestination.addEventListener(`change`, (evt) => {
      this._activateCheckedPurpose = new Map(this._allPoints.map((it) => [it.name, false]));
      this._activateCheckedPurpose.set(evt.target.value, true);
      const properPoint = this._allPoints.find((item) => item.name === evt.target.value);
      this._activateDescription = properPoint.description;
      this.reRender();
    });

    const eventSectionOffers = element.querySelector(`.event__section--offers`);
    eventSectionOffers.addEventListener(`change`, (evt) => {
      this._activateExtraOptions.set(evt.target.name.slice(12), evt.target.checked);
      this.reRender();
    });
  }
}


