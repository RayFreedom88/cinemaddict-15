import AbstractView from './abstract';

const createFilmsSectionTpl = () => (
  `<section class="films">
    </section>`
);

export default class FilmSection extends AbstractView {
  getTemplate() {
    return createFilmsSectionTpl();
  }
}
