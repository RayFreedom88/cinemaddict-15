import { createElement } from '../utils';

const createNoFilmTpl = () => (
  `<section class="films-list">
    <h2 class="films-list__title">There are no movies in our database</h2>
  </section>`
);

export default class NoFilm {
  constructor () {
    this._element = null;
  }

  getTemplate () {
    return createNoFilmTpl();
  }

  getElement () {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement () {
    this._element = null;
  }
}