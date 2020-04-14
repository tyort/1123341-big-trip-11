import FilterComponent from '../components/filter.js';
import {FILTER_TYPE} from '../formulas-filter.js';
import {renderComponent, replace} from '../formulas.js';

export default class FilterController {
  constructor(container, points) {
    this._container = container;
    this._points = points;
    this._activeFilterType = FILTER_TYPE.EVERYTHING;
    this._filterComponent = null;
    this._onDataChange = this._onDataChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._points.setDataChangeHandler(this._onDataChange);
  }

  renderFilters() { // рисует строку фильтров
    const container = this._container;

    const filters = Object.values(FILTER_TYPE).map((it) => {
      return {
        name: it,
        checked: it === this._activeFilterType,
      };
    });
    const oldComponent = this._filterComponent;

    this._filterComponent = new FilterComponent(filters);
    this._filterComponent.setFilterChangeHandler(this._onFilterChange);

    if (oldComponent) {
      replace(this._filterComponent, oldComponent);
    } else {
      renderComponent(container, this._filterComponent, `afterEnd`);
    }
  }

  _onFilterChange(filterType) { // просто меняет наименование фильтра
    this._points.setFilter(filterType);
    this._activeFilterType = filterType;
  }

  _onDataChange() {
    this.renderFilters();
  }
}