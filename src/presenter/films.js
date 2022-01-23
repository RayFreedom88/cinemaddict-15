import SortView from '../view/sort';
import FilmSectionView from '../view/film-section';
import NoFilmView from '../view/no-film';
// import FilmLoadingView from '../view/film-loading';
import FilmsListView from '../view/film-list';
import ShowMoreButtonView from '../view/show-more-button';
import FilmCardPresenter from './film-card';

import { updateItem } from '../utils/common';
import { render, remove, RenderPosition } from '../utils/render';
import { SortType } from '../utils/const';
import { sortByDate, sortByRating } from '../utils/common';

const FILMS_COUNT_PER_STEP = 5;

export default class Films {
  constructor(filmsContainer, filmsModel) {
    this._filmsContainer = filmsContainer;
    this._filmsModel = filmsModel;
    this._renderedFilmCount = FILMS_COUNT_PER_STEP;

    this._filmPresenterMap = new Map();
    this._currentSortType = SortType.DEFAULT;

    this._sortComponent = new SortView();
    this._filmSectionComponent = new FilmSectionView();
    this._noFilmComponent = new NoFilmView();
    this._filmsListComponent = new FilmsListView();

    this._showMoreButtonComponent = new ShowMoreButtonView();

    this._handleFilmChange = this._handleFilmChange.bind(this);
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(movieList) {
    this._movieList = movieList.slice();
    this._sourceMovieList = movieList.slice();

    render(this._filmsContainer, this._filmSectionComponent);

    this._renderFilms();
  }

  _getFilms() {
    return this._filmsModel.getFilms();
  }

  _handleFilmChange(updatedFilm) {
    this._movieList = updateItem(this._movieList, updatedFilm);
    this._sourceMovieList = updateItem(this._sourceMovieList, updatedFilm);
    this._filmPresenterMap.get(updatedFilm.id).init(updatedFilm);
  }

  _sortFilmCards(sortType) {
    switch (sortType) {
      case SortType.DATE:
        this._movieList.sort(sortByDate);
        break;
      case SortType.RATING:
        this._movieList.sort(sortByRating);
        break;
      default:
        this._movieList = this._sourceMovieList.slice();
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortFilmCards(sortType);
    this._clearFilmList();
    this._renderFilmsList();
  }

  _renderSort() {
    render(this._filmSectionComponent, this._sortComponent, RenderPosition.BEFOREBEGIN);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderNoFilm() {
    render(this._filmSectionComponent, this._noFilmComponent);
  }

  _renderFilmCard(cardFilm) {
    const filmCardPresenter = new FilmCardPresenter(this._filmsListContainer, this._handleFilmChange);
    filmCardPresenter.init(cardFilm);

    this._filmPresenterMap.set(cardFilm.id, filmCardPresenter);
  }

  _renderFilmCards(from, to) {
    this._movieList
      .slice(from, to)
      .forEach((movie) => this._renderFilmCard(movie));
  }

  _clearFilmList() {
    this._filmPresenterMap.forEach((presenter) => presenter.destroy());
    this._filmPresenterMap.clear();
    this._renderedFilmCount = FILMS_COUNT_PER_STEP;
    remove(this._showMoreButtonComponent);
  }

  _renderFilmsList() {
    render(this._filmSectionComponent, this._filmsListComponent);

    this._filmsListContainer = this._filmsListComponent.getElement().querySelector('.films-list__container');

    this._renderFilmCards(0, Math.min(this._movieList.length, FILMS_COUNT_PER_STEP));

    if (this._movieList.length > FILMS_COUNT_PER_STEP) {
      this._renderShowMoreButton();
    }
  }

  _handleShowMoreButtonClick() {
    this._renderFilmCards(this._renderedFilmCount, this._renderedFilmCount + FILMS_COUNT_PER_STEP);
    this._renderedFilmCount += FILMS_COUNT_PER_STEP;

    if (this._renderedFilmCount >= this._movieList.length) {
      remove(this._showMoreButtonComponent);
    }
  }

  _renderShowMoreButton() {
    render(this._filmsListComponent, this._showMoreButtonComponent);

    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);
  }

  _renderFilms() {
    if (this._movieList.length === 0) {
      this._renderNoFilm();

      return;
    }

    this._renderSort();
    this._renderFilmsList();
  }
}
