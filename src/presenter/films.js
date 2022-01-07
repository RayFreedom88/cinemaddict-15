import SortView from '../view/sort.js';
import FilmSectionView from '../view/film-section.js';
import NoFilmView from '../view/no-film.js';
// import FilmLoadingView from '../view/film-loading.js';
import FilmsListView from '../view/film-list.js';
import ShowMoreButtonView from '../view/show-more-button.js';
import FilmCardPresenter from './film-card.js';
import {render, remove, RenderPosition} from '../utils/render.js';

const FILMS_COUNT_PER_STEP = 5;

export default class Films {
  constructor(filmsContainer) {
    this._filmsContainer = filmsContainer;
    this._renderedFilmCount = FILMS_COUNT_PER_STEP;

    this._sortComponent = new SortView();
    this._filmSectionComponent = new FilmSectionView();
    this._noFilmComponent = new NoFilmView();
    this._filmsListComponent = new FilmsListView();
    this._filmsListContainer = this._filmsListComponent.getElement().querySelector('.films-list__container');
    this._showMoreButtonComponent = new ShowMoreButtonView();

    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
  }

  init(films) {
    this._films = films.slice();
    render(this._filmsContainer, this._filmSectionComponent);
    this._renderFilmsList();
  }

  _renderSort() {
    render(this._filmSectionComponent, this._sortComponent, RenderPosition.BEFOREBEGIN);
  }

  _renderNoFilm() {
    render(this._filmSectionComponent, this._noFilmComponent);
  }

  _renderFilmCard(cardFilm, filmPlace = this._filmsListContainer) {
    const filmCardPresenter = new FilmCardPresenter(filmPlace);
    filmCardPresenter.init(cardFilm);
  }

  _renderFilmCards(from, to) {
    this._films
      .slice(from, to)
      .forEach((film) => this._renderFilmCard(film));
  }

  _handleShowMoreButtonClick() {
    this._renderFilmCards(this._renderedFilmCount, this._renderedFilmCount + FILMS_COUNT_PER_STEP);
    this._renderedFilmCount += FILMS_COUNT_PER_STEP;

    if (this._renderedFilmCount >= this._films.length) {
      remove(this._showMoreButtonComponent);
    }
  }

  _renderShowMoreButton() {
    render(this._filmsListComponent, this._showMoreButtonComponent);

    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);
  }

  _renderFilmsList() {
    if (this._films.length === 0) {
      this._renderNoFilm();

      return;
    }

    this._renderSort();
    render(this._filmSectionComponent, this._filmsListComponent);
    this._renderFilmCards(0, Math.min(this._films.length, FILMS_COUNT_PER_STEP));
    this._renderShowMoreButton();
  }
}
