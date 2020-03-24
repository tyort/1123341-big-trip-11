import AbstractComponent from './abstract_component.js';

export default class AbstractSmartComponent extends AbstractComponent {
  recoveryListeners() {
    throw new Error(`Abstract method not implemented: recoveryListeners`);
  }

  reRender() {
    const oldElement = this.getElement(); // возвращает существующий или рисует новый компонент, this._element уже не null
    const parent = oldElement.parentElement;
    this.removeElement(); // делаем this._element = null, чтобы создать новый компонент
    const newElement = this.getElement(); // создаем новый компонент
    parent.replaceChild(newElement, oldElement);
    this.recoveryListeners(); // восстанавливает все обработчики
  }
}
