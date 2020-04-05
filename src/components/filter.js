import AbstractComponent from './abstract_component.js';

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
      />
      <label class="trip-filters__filter-label" for="filter-${filter.name}">${filter.name}</label>
    </div>`
  );
};

export const createFilterTemplate = (filters) => {
  // filters массив объектов типа {name: "past", checked: false}
  const filtersMarkup = filters.map((it) => createFilterMarkup(it)).join(``);

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
    this._filters = filters;
  }

  getTemplate() {
    return createFilterTemplate(this._filters);
  }

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`change`, (evt) => {
      const filterName = getFilterNameById(evt.target.id);
      handler(filterName);
    });
  }
}


