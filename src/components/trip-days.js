import AbstractComponent from './abstract-component.js';

const createTripDaysTemplate = () =>
  (
    `<ul class="trip-days">
    </ul>`
  );

export default class TripDays extends AbstractComponent {
  getTemplate() {
    return createTripDaysTemplate();
  }
}
