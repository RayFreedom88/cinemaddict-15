import AbstractView from './abstract.js';

const createLoadingTpl = () => (
  `<section class="films-list">
    <h2 class="films-list__title">Loading...</h2>
  </section>`
);

export default class FilmLoading extends AbstractView {
  getTemplate() {
    return createLoadingTpl();
  }
}
