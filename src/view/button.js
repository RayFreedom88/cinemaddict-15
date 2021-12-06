import {createElement} from '../utils.js';

const createButtonShowMoreTpl = () => (
  '<button class="films-list__show-more">Show more</button>'
);

export default class Button {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createButtonShowMoreTpl();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
