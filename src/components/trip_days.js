import AbstractComponent from './abstract_component.js';

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

