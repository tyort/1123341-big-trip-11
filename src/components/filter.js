import AbstractComponent from './abstract-component.js';

const FILTER_ID_PREFIX = `filter-`;
const getFilterNameById = (id) => id.substring(FILTER_ID_PREFIX.length);

export const createFilterMarkup = (filter) => {
  return (
    `<div class="trip-filters__filter">
      <input id="filter-${filter.name}"
        class="trip-filters__filter-input  visually-hidden"
        type="radio"
        name="trip-filter"
        value="${filter.name}"
        ${filter.checked ? `checked` : ``}
        ${filter.disabled ? `disabled` : ``}
      />
      <label class="trip-filters__filter-label" for="filter-${filter.name}">${filter.name}</label>
    </div>`
  );
};

export const createFilterTemplate = (filters) => {
  const filtersMarkup = filters.map((filter) => createFilterMarkup(filter)).join(``);

  return (
    `<form class="trip-filters" action="#" method="get">
      ${filtersMarkup}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};

export default class FIlter extends AbstractComponent {
  constructor(filters) {
    super();
    this._items = filters;
  }

  getTemplate() {
    return createFilterTemplate(this._items);
  }

  setChangeHandler(handler) {
    this.getElement().addEventListener(`change`, (evt) => {
      const filterName = getFilterNameById(evt.target.id);
      handler(filterName);
    });
  }
}
