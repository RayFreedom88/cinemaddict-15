import {createElement} from '../utils.js';

const createLoadingTpl = () => (
  `<section class="films-list">
    <h2 class="films-list__title">Loading...</h2>
  </section>`
);

export default class FilmLoading {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createLoadingTpl();
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
