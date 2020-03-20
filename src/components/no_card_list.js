import AbstractComponent from './abstract_component.js';

const createNoCardListTemplate = () => {
  return (
    `<p class="trip-events__msg">Click New Event to create your first point</p>`
  );
};

export default class NoCardList extends AbstractComponent {
  getTemplate() {
    return createNoCardListTemplate();
  }
}
