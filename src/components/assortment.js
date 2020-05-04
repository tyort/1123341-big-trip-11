<<<<<<< HEAD
import AbstractComponent from './abstract-component.js';

export const SortType = {
=======
import AbstractComponent from './abstract_component.js';

export const SORT_TYPES = {
>>>>>>> 9660486227da763a628df2cc5fea05f37748fc9e
  PRICE_DOWN: `price`,
  TIME_DOWN: `time`,
  DEFAULT: `event`,
};

const createAssortmentTemplate = () => (
  `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    <span class="trip-sort__item  trip-sort__item--day">Day</span>

    <div class="trip-sort__item  trip-sort__item--event">
      <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" checked>
<<<<<<< HEAD
      <label class="trip-sort__btn" for="sort-event" data-sort-type="${SortType.DEFAULT}">Event</label>
=======
      <label class="trip-sort__btn" for="sort-event" data-sort-type="${SORT_TYPES.DEFAULT}">Event</label>
>>>>>>> 9660486227da763a628df2cc5fea05f37748fc9e
    </div>

    <div class="trip-sort__item  trip-sort__item--time">
      <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">
<<<<<<< HEAD
      <label class="trip-sort__btn" for="sort-time" data-sort-type="${SortType.TIME_DOWN}">
=======
      <label class="trip-sort__btn" for="sort-time" data-sort-type="${SORT_TYPES.TIME_DOWN}">
>>>>>>> 9660486227da763a628df2cc5fea05f37748fc9e
        Time
        <svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
          <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
        </svg>
      </label>
    </div>

    <div class="trip-sort__item  trip-sort__item--price">
      <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price">
<<<<<<< HEAD
      <label class="trip-sort__btn" for="sort-price" data-sort-type="${SortType.PRICE_DOWN}">
=======
      <label class="trip-sort__btn" for="sort-price" data-sort-type="${SORT_TYPES.PRICE_DOWN}">
>>>>>>> 9660486227da763a628df2cc5fea05f37748fc9e
        Price
        <svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
          <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
        </svg>
      </label>
    </div>

    <span class="trip-sort__item  trip-sort__item--offers">Offers</span>
  </form>`
);

export default class Assortment extends AbstractComponent {
  constructor() {
    super();
<<<<<<< HEAD
    this._currenSortType = SortType.DEFAULT;
=======
    this._currenSortType = SORT_TYPES.DEFAULT;
>>>>>>> 9660486227da763a628df2cc5fea05f37748fc9e
  }

  getTemplate() {
    return createAssortmentTemplate();
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.className !== `trip-sort__btn`) {
        return;
      }

      const sortType = evt.target.dataset.sortType;

      if (this._currenSortType === sortType) {
        return;
      }

      this._currenSortType = sortType;
      handler(this._currenSortType);
    });
  }
}
