import AbstractView from './abstract.js';

const createFilmsSectionTpl = () => (
  `<section class="films">
    </section>`
);

export default class FilmSection extends AbstractView {
  getTemplate() {
    return createFilmsSectionTpl();
  }
}
