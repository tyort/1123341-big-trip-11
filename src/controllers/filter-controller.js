import FilterComponent from '../components/filter.js';
<<<<<<< HEAD
import {FilterType} from '../formulas-filter.js';
import {renderComponent, replace} from '../formulas.js';
import {getPointsByFilter} from '../formulas-filter.js';
=======
import {FILTER_TYPE} from '../formulas-filter.js';
import {renderComponent, replace} from '../formulas.js';
>>>>>>> 9660486227da763a628df2cc5fea05f37748fc9e

export default class FilterController {
  constructor(container, points) {
    this._container = container;
    this._points = points;
<<<<<<< HEAD
    this._activeFilterType = FilterType.EVERYTHING;
=======
    this._activeFilterType = FILTER_TYPE.EVERYTHING;
>>>>>>> 9660486227da763a628df2cc5fea05f37748fc9e
    this._filterComponent = null;
    this._onDataChange = this._onDataChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._points.setDataChangeHandler(this._onDataChange);
  }

<<<<<<< HEAD
  renderFilters() {
    const container = this._container;

    const filters = Object.values(FilterType).map((it) => {
      const pointsCount = getPointsByFilter(this._points.getPointsOnBegining(), it);
      return {
        name: it,
        checked: it === this._activeFilterType,
        disabled: pointsCount.length === 0
=======
  renderFilters() { // рисует строку фильтров
    const container = this._container;

    const filters = Object.values(FILTER_TYPE).map((it) => {
      return {
        name: it,
        checked: it === this._activeFilterType,
>>>>>>> 9660486227da763a628df2cc5fea05f37748fc9e
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

  _onFilterChange(filterType) {
<<<<<<< HEAD
    this._activeFilterType = filterType;
    this._points.setFilter(filterType);
=======
    this._points.setFilter(filterType);
    this._activeFilterType = filterType;
>>>>>>> 9660486227da763a628df2cc5fea05f37748fc9e
  }

  _onDataChange() {
    this.renderFilters();
  }
}
