import AbstractComponent from './abstract_component.js';

const createCardListTemplate = () => {
  return (
    `<li class="trip-days__item  day">
      <div class="day__info"></div>

      <ul class="trip-events__list">
        <!-- вставлять сюда -->
      </ul>
    </li>`
  );
};

export default class CardListLight extends AbstractComponent {
  getTemplate() {
    return createCardListTemplate(this._card, this._dayCounter);
  }
}

