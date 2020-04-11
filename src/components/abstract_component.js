import {createElement} from '../formulas.js';

const HIDDEN_CLASS = `visually-hidden`;

export default class AbstractComponent {
  constructor() {
    if (new.target === AbstractComponent) {
      throw new Error(`Can't instantiate AbstractComponent, only concrete one.`);
    }

    this._element = null; // приватный DOM-элемент
  }

  getTemplate() { // Запретит использовать абстрактный класс как компонент
    throw new Error(`Abstract method not implemented: getTemplate`);
  }

  getElement() {
    if (!this._element) { // если элемент не существует, то содзадим на основании шаблона
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() { // удаляем ссылку на элемент. Удалив элемент из DOM он не исчезнет из памяти, если не удалим на него ссылку
    this._element = null;
  }

  show() {
    if (this._element) {
      this._element.classList.remove(HIDDEN_CLASS);
    }
  }

  hide() {
    if (this._element) {
      this._element.classList.add(HIDDEN_CLASS);
    }
  }
}
