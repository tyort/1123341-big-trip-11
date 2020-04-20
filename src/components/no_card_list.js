import AbstractComponent from './abstract_component.js';

const createNoCardListTemplate = () => {
  return (
    `<p class="trip-events__msg"><font color="black">Click New Event to create your first point</br>
      or live in isolation, Buddy :)
    </font></p>`
  );
};

export default class NoCardList extends AbstractComponent {
  getTemplate() {
    return createNoCardListTemplate();
  }
}
