import AbstractComponent from './abstract_component.js';
import moment from 'moment';

const createWaybillTemplate = (sortedPoints) => {
  const addStartDate = moment(sortedPoints[0].dateFrom).format(`MMM DD`);
  const addEndDate = moment(sortedPoints[sortedPoints.length - 1].dateTo).format(`MMM DD`);
  const totalPrice = sortedPoints.reduce((acc, it) => {
    return acc + it.basePrice;
  }, 0);

  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${sortedPoints[0].name} &mdash; ... &mdash; ${sortedPoints[sortedPoints.length - 1].name}</h1>
        <p class="trip-info__dates">${addStartDate}&nbsp;&mdash;&nbsp;${addEndDate}</p>
      </div>
      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
      </p>
    </section>`
  );
};

export default class Waybill extends AbstractComponent {
  constructor(sortedPoints) {
    super();
    this._sortedPoints = sortedPoints;
  }
  getTemplate() {
    return createWaybillTemplate(this._sortedPoints);
  }
}
