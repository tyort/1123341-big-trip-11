import AbstractComponent from './abstract_component.js';
import moment from 'moment';


const createWaybillTemplate = (points) => {
  const sortedPoints = points.sort((a, b) => new Date(a.dateFrom).getTime - new Date(b.dateFrom).getTime);
  const uniqueCIty = sortedPoints.map((it) => it.name)
    .filter((item, index, array) => array.indexOf(item) === index);

  const addNameOrDots = () => {
    switch (uniqueCIty.length) {
      case 0:
        return `There is no Cities`;
      case 1:
        return `${sortedPoints[0].name}`;
      case 2:
        return `${sortedPoints[0].name} - ${sortedPoints[sortedPoints.length - 1].name}`;
      case 3:
        return `${sortedPoints[0].name} - ${sortedPoints[1].name} - ${sortedPoints[sortedPoints.length - 1].name}`;
      default:
        return `${sortedPoints[0].name} - ... - ${sortedPoints[sortedPoints.length - 1].name}`;
    }
  };

  const addStartDate = sortedPoints[0] !== undefined ? moment(sortedPoints[0].dateFrom).format(`MMM DD`) : `NoDate`;
  const addEndDate = sortedPoints[sortedPoints.length - 1] !== undefined
    ? moment(sortedPoints[sortedPoints.length - 1].dateTo).format(`MMM DD`)
    : `NoDate`;

  const totalPrice = sortedPoints.reduce((acc, it) => {
    return acc + it.basePrice;
  }, 0);

  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${addNameOrDots()}</h1>
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
