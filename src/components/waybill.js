import AbstractComponent from './abstract_component.js';
import moment from 'moment';


const createWaybillTemplate = (points) => {
  const sortedPoints = points.sort((a, b) => new Date(a.dateFrom).getTime() - new Date(b.dateFrom).getTime());
  const uniqueCIty = sortedPoints.map((it) => it.name).filter((item, index, array) => array.indexOf(item) === index);

  let tripInfoTitle = ``;

  if (uniqueCIty.length <= 1) {
    tripInfoTitle = sortedPoints[0] ? sortedPoints[0].name : `There is no point`;

  } else if (uniqueCIty.length <= 3 && sortedPoints.length === 3) {
    tripInfoTitle = `${sortedPoints[0].name} - ${sortedPoints[1].name} - ${sortedPoints[2].name}`;

  } else {
    tripInfoTitle = `${sortedPoints[0].name} - ... - ${sortedPoints[sortedPoints.length - 1].name}`;
  }

  const addStartDate = sortedPoints[0] !== undefined ? moment(sortedPoints[0].dateFrom).format(`MMM DD`) : `No Date`;
  const addEndDate = sortedPoints[sortedPoints.length - 1] !== undefined
    ? moment(sortedPoints[sortedPoints.length - 1].dateTo).format(`MMM DD`)
    : `No Date`;

  const totalPrice = sortedPoints.reduce((acc, it) => {
    return acc + it.basePrice;
  }, 0);

  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${tripInfoTitle}</h1>
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
