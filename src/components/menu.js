<<<<<<< HEAD
import AbstractComponent from './abstract-component.js';
=======
import AbstractComponent from './abstract_component.js';

export const MAIN_VIEW_MODE = {
  STATISTICS: `statistics-setbymyself`,
  TABLE: `table-setbymyself`,
};
>>>>>>> 9660486227da763a628df2cc5fea05f37748fc9e

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
      .forEach((it) => {
        if (it.classList.contains(`trip-tabs__btn--active`)) {
          it.classList.remove(`trip-tabs__btn--active`);
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
