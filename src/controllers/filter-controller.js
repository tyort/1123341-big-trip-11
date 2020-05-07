import FilterComponent from '../components/filter.js';
import {FilterType} from '../formulas-filter.js';
import {renderComponent, replace} from '../formulas.js';
import {getPointsByFilter} from '../formulas-filter.js';

export default class FilterController {
  constructor(container, points) {
    this._container = container;
    this._points = points;
    this._activeFilterType = FilterType.EVERYTHING;
    this._filterComponent = null;
    this._onDataChange = this._onDataChange.bind(this);
    this._onTypeChange = this._onTypeChange.bind(this);
    this._points.setDataChangeHandler(this._onDataChange);
  }

  render() {
    const container = this._container;

    const filters = Object.values(FilterType).map((type) => {
      const pointsCount = getPointsByFilter(this._points.getPointsOnBegining(), type);
      return {
        name: type,
        checked: type === this._activeFilterType,
        disabled: pointsCount.length === 0
      };
    });
    const oldComponent = this._filterComponent;

    this._filterComponent = new FilterComponent(filters);
    this._filterComponent.setChangeHandler(this._onTypeChange);

    if (oldComponent) {
      replace(this._filterComponent, oldComponent);
    } else {
      renderComponent(container, this._filterComponent, `afterEnd`);
    }
  }

  _onTypeChange(filterType) {
    this._activeFilterType = filterType;
    this._points.setFilter(filterType);
  }

  _onDataChange() {
    this.render();
  }
}
