import AbstractComponent from './abstract-component.js';

export default class AbstractSmartComponent extends AbstractComponent {
  recoveryListeners() {
    throw new Error(`Abstract method not implemented: recoveryListeners`);
  }

  reRender() {
    const oldElement = this.getElement(); // находим старый элемент
    const parent = oldElement.parentElement;

    this.removeElement(); // делаем this._element = null, чтобы создать новый элемент

    const newElement = this.getElement(); // создаем новый элемент

    parent.replaceChild(newElement, oldElement);

    this.recoveryListeners(); // восстанавливает все обработчики
  }
}
