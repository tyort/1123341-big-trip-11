import AbstractSmartComponent from './abstract-smart-component.js';

export const SortType = {
  DEFAULT: `event`,
  TIME_DOWN: `time`,
  PRICE_DOWN: `price`,
};

const createAssortmentMarkup = (sortType) => {
  return Object.values(SortType)
    .map((type) => {
      const addSvg = type === `event`
        ? ``
        : `<svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
            <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
          </svg>`;
      const isChecked = type === sortType ? `checked` : ``;
      return (
        `<div class="trip-sort__item  trip-sort__item--${type}">
          <input id="sort-${type}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${type}" ${isChecked}>
          <label class="trip-sort__btn" for="sort-${type}" data-sort-type="${type}">
            ${type}
            ${addSvg}
          </label>
        </div>`
      );
    })
    .join(``);
};

const createAssortmentTemplate = (options = {}) => {
  const {addCurrentSortType} = options;
  const addAssortmnet = createAssortmentMarkup(addCurrentSortType);
  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      <span class="trip-sort__item  trip-sort__item--day">Day</span>
        ${addAssortmnet}
      <span class="trip-sort__item  trip-sort__item--offers">Offers</span>
    </form>`
  );
};

export default class Assortment extends AbstractSmartComponent {
  constructor() {
    super();
    this._currentSortType = SortType.DEFAULT;
    this._sortTypeHandler = null;
  }

  getTemplate() {
    return createAssortmentTemplate({
      addCurrentSortType: this._currentSortType
    });
  }

  recoveryListeners() {
    this.setSortTypeChangeHandler(this._sortTypeHandler);
  }

  reRender() {
    super.reRender();
  }

  setChangedData(sortType, handler) {
    this._currentSortType = sortType;
    this._sortTypeHandler = handler;
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.className !== `trip-sort__btn`) {
        return;
      }

      const sortType = evt.target.dataset.sortType;

      if (this._currentSortType === sortType) {
        return;
      }

      this._currentSortType = sortType;
      handler(this._currentSortType);
      this._sortTypeHandler = handler;
      this.reRender();
    });
  }
}
