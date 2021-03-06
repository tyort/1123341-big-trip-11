import AbstractComponent from './abstract-component.js';

const createMenuTemplate = () =>
  (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
      <a class="trip-tabs__btn" href="#" id="table-setbymyself">Table</a>
      <a class="trip-tabs__btn" href="#" id="statistics-setbymyself">Stats</a>
    </nav>`
  );

export default class Menu extends AbstractComponent {
  getTemplate() {
    return createMenuTemplate();
  }

  setActiveViewMode(mainViewId) {
    Array.from(this.getElement().querySelectorAll(`.trip-tabs__btn`))
      .forEach((button) => {
        if (button.classList.contains(`trip-tabs__btn--active`)) {
          button.classList.remove(`trip-tabs__btn--active`);
        }
      });

    const item = this.getElement().querySelector(`#${mainViewId}`);

    if (item) {
      item.classList.add(`trip-tabs__btn--active`);
    }
  }

  setOnChange(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      if (evt.target.className !== `trip-tabs__btn`) {
        return;
      }

      const mainViewMode = evt.target.id;
      handler(mainViewMode);
    });
  }
}
