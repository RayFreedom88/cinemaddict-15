import SortView from '../view/sort';
import FilmSectionView from '../view/film-section';
import NoFilmView from '../view/no-film';
// import FilmLoadingView from '../view/film-loading';
import FilmsListView from '../view/film-list';
import ShowMoreButtonView from '../view/show-more-button';
import FilmCardPresenter from './film-card';

import { render, remove, RenderPosition } from '../utils/render';
import { SortType, UpdateType, UserAction } from '../utils/const';
import { sortByDate, sortByRating } from '../utils/common';

const FILMS_COUNT_PER_STEP = 5;

export default class Films {
  constructor(filmsContainer, filmsModel) {
    this._filmsContainer = filmsContainer;
    this._filmsModel = filmsModel;
    this._renderedFilmCount = FILMS_COUNT_PER_STEP;

    this._filmPresenterMap = new Map();
    this._currentSortType = SortType.DEFAULT;

    this._sortComponent = null;
    this._filmSectionComponent = new FilmSectionView();
    this._noFilmComponent = new NoFilmView();
    this._filmsListComponent = new FilmsListView();

    this._showMoreButtonComponent = null;

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
  }

  init() {
    render(this._filmsContainer, this._filmSectionComponent);

    this._renderFilms();
  }

  _getFilms() {
    switch (this._currentSortType) {
      case SortType.DATE:
        return this._filmsModel.getFilms().slice().sort(sortByDate);
      case SortType.RATING:
        return this._filmsModel.getFilms().slice().sort(sortByRating);
    }

    return this._filmsModel.getFilms();
  }

  _handleViewAction(actionType, updateType, update) {
    // console.log(actionType, updateType, update);
    // Здесь будем вызывать обновление модели.
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this._filmsModel.updateFilm(updateType, update);
        break;
      case UserAction.DELETE_COMMENT:
        this._filmsModel.updateFilm(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    // console.log(updateType, data);
    // В зависимости от типа изменений решаем, что делать:
    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть фильма
        this._filmPresenterMap.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        // - обновить фильм
        this._clearFilms();
        this._renderFilms();
        break;
      case UpdateType.MAJOR:
        // - обновить весь список
        this._clearFilms({resetRenderedFilmCardsCount: true, resetSortType: true});
        this._renderFilms();
        break;
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;

    this._clearFilms();
    this._renderFilms();
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new SortView(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    render(this._filmSectionComponent, this._sortComponent, RenderPosition.BEFOREBEGIN);
  }

  _renderNoFilm() {
    render(this._filmSectionComponent, this._noFilmComponent);
  }

  _renderFilmCard(cardFilm) {
    const filmCardPresenter = new FilmCardPresenter(this._filmsListContainer, this._handleViewAction);
    filmCardPresenter.init(cardFilm);

    this._filmPresenterMap.set(cardFilm.id, filmCardPresenter);
  }

  _renderFilmCards(films) {
    films.forEach((film) => this._renderFilmCard(film));
  }

  _renderFilmsList() {
    render(this._filmSectionComponent, this._filmsListComponent);

    this._filmsListContainer = this._filmsListComponent.getElement().querySelector('.films-list__container');
  }

  _handleShowMoreButtonClick() {
    const filmsCount = this._getFilms().length;
    const newRenderedFilmCount = Math.min(filmsCount, this._renderedFilmCount + FILMS_COUNT_PER_STEP);
    const films = this._getFilms().slice(this._renderedFilmCount, newRenderedFilmCount);

    this._renderFilmCards(films);
    this._renderedFilmCount = newRenderedFilmCount;

    if (this._renderedFilmCount >= filmsCount) {
      remove(this._showMoreButtonComponent);
    }
  }

  _renderShowMoreButton() {
    if (this._showMoreButtonComponent !== null) {
      this._showMoreButtonComponent = null;
    }

    this._showMoreButtonComponent = new ShowMoreButtonView();
    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);

    render(this._filmsListComponent, this._showMoreButtonComponent);
  }

  _clearFilms({resetRenderedFilmCardsCount = false, resetSortType = false} = {}) {
    const filmsCount = this._getFilms().length;

    this._filmPresenterMap.forEach((presenter) => presenter.destroy());
    this._filmPresenterMap.clear();

    remove(this._sortComponent);
    remove(this._noFilmComponent);
    remove(this._showMoreButtonComponent);

    if (resetRenderedFilmCardsCount) {
      this._renderedFilmCount = FILMS_COUNT_PER_STEP;
    } else {
      this._renderedFilmCount = Math.min(filmsCount, this._renderedFilmCount);
    }

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _renderFilms() {
    const films = this._getFilms();
    const filmsCount = films.length;

    if (filmsCount === 0) {
      this._renderNoFilm();
      return;
    }

    this._renderSort();
    this._renderFilmsList();
    this._renderFilmCards(films.slice(0, Math.min(filmsCount, this._renderedFilmCount)));

    if (filmsCount > this._renderedFilmCount) {
      this._renderShowMoreButton();
    }
  }
}
