import {createElement} from '../utils.js';

const createFilmsSectionTpl = () => (
  `<section class="films">
    </section>`
);

export default class FilmSection {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmsSectionTpl();
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
