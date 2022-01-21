import FilmCardView from '../view/film-card.js';
import FilmDetailsView from '../view/film-details.js';
import FilmDetailsNewCommentView from '../view/film-details-new-comment';
import { render, remove, replace } from '../utils/render';
import { isEscEvent } from '../utils/common';

export default class FilmCard {
  constructor(filmContainer, changeData) {
    this._body = document.querySelector('body');
    this._filmContainer = filmContainer;
    this._changeData = changeData;

    this._filmCardComponent = null;
    this._filmDetailsComponent = null;

    this._handleFilmClick = this._handleFilmClick.bind(this);
    this._handleFilmDetailsCloseClick = this._handleFilmDetailsCloseClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);

    this._handleToWatchListClick = this._handleToWatchListClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleMarkAsWatchedClick = this._handleMarkAsWatchedClick.bind(this);
  }

  init(film) {
    this._film = film;

    const prevFilmCardComponent = this._filmCardComponent;
    const prevFilmDetailsComponent = this._filmDetailsComponent;

    this._filmCardComponent = new FilmCardView(film);
    this._filmDetailsComponent = new FilmDetailsView(film);

    const filmDetailsCommentWrap = this._filmDetailsComponent.getElement().querySelector('.film-details__comments-wrap');

    this._filmCardComponent.setOpenFilmDetailsClickHandler(this._handleFilmClick);
    this._filmDetailsComponent.setCloseFilmDetailsClickHandler(this._handleFilmDetailsCloseClick);

    this._filmCardComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._filmCardComponent.setAddToWatchListClickHandler(this._handleToWatchListClick);
    this._filmCardComponent.setMarkAsWatchedClickHandler(this._handleMarkAsWatchedClick);

    this._filmDetailsComponent.setAddToWatchListClickHandler(this._handleToWatchListClick);
    this._filmDetailsComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._filmDetailsComponent.setMarkAsWatchedClickHandler(this._handleMarkAsWatchedClick);

    render(filmDetailsCommentWrap, new FilmDetailsNewCommentView);

    if (prevFilmCardComponent === null || prevFilmDetailsComponent === null) {
      render(this._filmContainer, this._filmCardComponent);
      return;
    }

    if (this._filmContainer.contains(prevFilmCardComponent.getElement())) {
      replace(this._filmCardComponent, prevFilmCardComponent);
    }

    if (this._filmContainer.contains(prevFilmDetailsComponent.getElement())) {
      replace(this._filmDetailsComponent, prevFilmDetailsComponent);
    }

    remove(prevFilmCardComponent);
    remove(prevFilmDetailsComponent);
  }

  destroy() {
    remove(this._filmCardComponent);
    remove(this._filmDetailsComponent);
  }

  _openFilmDetails() {
    if (this._body.lastElementChild.className === 'film-details') {
      this._body.lastElementChild.remove();
    }

    this._body.appendChild(this._filmDetailsComponent.getElement());
    this._body.classList.add('hide-overflow');

    document.addEventListener('keydown', this._escKeyDownHandler);
  }

  _closeFilmDetails() {
    this._body.removeChild(this._filmDetailsComponent.getElement());
    this._body.classList.remove('hide-overflow');

    document.removeEventListener('keydown', this._escKeyDownHandler);
  }

  _escKeyDownHandler(evt) {
    if (isEscEvent(evt)) {
      this._closeFilmDetails();
    }
  }

  _handleFilmClick() {
    this._openFilmDetails();
  }

  _handleFilmDetailsCloseClick() {
    this._closeFilmDetails();
  }

  _handleToWatchListClick() {
    this._changeData(
      Object.assign(
        {},
        this._film,
        {
          isWatchlist: !this._film.isWatchlist,
        },
      ),
    );
  }

  _handleFavoriteClick() {
    this._changeData(
      Object.assign(
        {},
        this._film,
        {
          isFavorite: !this._film.isFavorite,
        },
      ),
    );
  }

  _handleMarkAsWatchedClick() {
    this._changeData(
      Object.assign(
        {},
        this._film,
        {
          isHistory: !this._film.isHistory,
        },
      ),
    );
  }
}
