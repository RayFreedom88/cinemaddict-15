import SortView from '../view/sort.js';
import FilmSectionView from '../view/film-section.js';
import NoFilmView from '../view/no-film.js';
// import FilmLoadingView from '../view/film-loading.js';
import FilmsListView from '../view/film-list.js';
import FilmCardView from '../view/film-card.js';
import FilmDetailsView from '../view/film-details.js';
import ButtonView from '../view/button.js';
import {render, remove, RenderPosition} from '../utils/render.js';
import {isEscEvent} from '../utils/common.js';

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
    this._buttonComponent = new ButtonView();
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
    const body = document.querySelector('body');
    const filmCardComponent = new FilmCardView(cardFilm);
    const filmDetailsComponent = new FilmDetailsView(cardFilm);

    const closePopup = () => {
      body.removeChild(filmDetailsComponent.getElement());
      body.classList.remove('hide-overflow');

      filmDetailsComponent.getElement().querySelector('.film-details__close-btn').removeEventListener('click', closePopup);
      // eslint-disable-next-line no-use-before-define
      document.removeEventListener('keydown', popupEscKeyDownHandler);
    };

    const popupEscKeyDownHandler = (evt) => {
      if (isEscEvent(evt)) {
        closePopup();
      }
    };

    const openPopup = () => {
      body.appendChild(filmDetailsComponent.getElement());
      body.classList.add('hide-overflow');

      filmDetailsComponent.setClickHandler(closePopup);
      document.addEventListener('keydown', popupEscKeyDownHandler);
    };

    filmCardComponent.setClickHandler(openPopup);
    filmCardComponent.setClickHandler(openPopup);
    filmCardComponent.setClickHandler(openPopup);

    render(filmPlace, filmCardComponent);
  }

  _renderFilmCards(from, to) {
    this._films
      .slice(from, to)
      .forEach((film) => this._renderFilmCard(film));
  }

  _renderShowMoreButton() {
    let renderedCardsCount = this._renderedFilmCount;
    const showMoreButton = this._buttonComponent;

    render(this._filmsListComponent, showMoreButton);

    showMoreButton.setClickHandler(() => {
      this._renderFilmCards(renderedCardsCount, renderedCardsCount + FILMS_COUNT_PER_STEP);

      renderedCardsCount += FILMS_COUNT_PER_STEP;

      if (renderedCardsCount >= this._films.length) {
        remove(showMoreButton);
      }
    });
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
