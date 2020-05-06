import AbstractComponent from './abstract-component.js';
import moment from 'moment';


const createWaybillTemplate = (points) => {
  const sortedPoints = points.sort((a, b) => new Date(a.dateFrom).getTime() - new Date(b.dateFrom).getTime());
  const uniqueCities = [...new Set(sortedPoints.map((city) => city.name))];

  let tripInfoTitle = ``;

  if (uniqueCities.length <= 1) {
    tripInfoTitle = sortedPoints[0] ? sortedPoints[0].name : `There is no point`;

  } else if (uniqueCities.length === 2 && sortedPoints.length === 2) {
    tripInfoTitle = `${sortedPoints[0].name} - ${sortedPoints[1].name}`;

  } else if (uniqueCities.length <= 3 && sortedPoints.length === 3) {
    tripInfoTitle = `${sortedPoints[0].name} - ${sortedPoints[1].name} - ${sortedPoints[2].name}`;

  } else {
    tripInfoTitle = `${sortedPoints[0].name} - ... - ${sortedPoints[sortedPoints.length - 1].name}`;
  }

  const addStartDate = sortedPoints[0] ? moment(sortedPoints[0].dateFrom).format(`MMM DD`) : `No Date`;
  const addEndDate = sortedPoints[sortedPoints.length - 1]
    ? moment(sortedPoints[sortedPoints.length - 1].dateTo).format(`MMM DD`)
    : `No Date`;

  const totalOffersPrice = sortedPoints
    .map((point) => {
      const totalPrice = Array.from(point.offersPrice.values())
        .reduce((acc, offerPrice) => acc + offerPrice, 0);
      return totalPrice;
    })
    .reduce((acc, allOffersPrice) => acc + allOffersPrice, 0);

  const totalMainPrice = sortedPoints.reduce((acc, point) => acc + point.basePrice, 0);
  const totalPriceAll = totalOffersPrice + totalMainPrice;

  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${tripInfoTitle}</h1>
        <p class="trip-info__dates">${addStartDate}&nbsp;&mdash;&nbsp;${addEndDate}</p>
      </div>
      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPriceAll}</span>
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
