import FilmCardView from '../view/film-card';
import FilmDetailsView from '../view/film-details';
import FilmDetailsCommentView from '../view/film-details-comment';
import FilmDetailsNewCommentView from '../view/film-details-new-comment';

import { render, remove, replace } from '../utils/render';
import { UserAction, UpdateType } from '../utils/const.js';
import { isEscEvent } from '../utils/common';

export default class FilmCard {
  constructor(filmContainer, changeData) {
    this._filmContainer = filmContainer;
    this._changeData = changeData;

    this._bodyElement = document.querySelector('body');

    this._filmCardComponent = null;
    this._filmDetailsComponent = null;

    this._handleOpenFilmDetailsClick = this._handleOpenFilmDetailsClick.bind(this);
    this._handleCloseFilmDetailsClick = this._handleCloseFilmDetailsClick.bind(this);

    this._handleToWatchListClick = this._handleToWatchListClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleMarkAsWatchedClick = this._handleMarkAsWatchedClick.bind(this);

    this._handleCommentDeleteClick = this._handleCommentDeleteClick.bind(this);

    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(movie) {
    this._movie = movie;

    const prevFilmCardComponent = this._filmCardComponent;
    const prevFilmDetailsComponent = this._filmDetailsComponent;

    this._filmCardComponent = new FilmCardView(movie);
    this._filmDetailsComponent = new FilmDetailsView(movie);

    this._filmCardComponent.setAddToWatchListClickHandler(this._handleToWatchListClick);
    this._filmCardComponent.setMarkAsWatchedClickHandler(this._handleMarkAsWatchedClick);
    this._filmCardComponent.setFavoriteClickHandler(this._handleFavoriteClick);

    this._filmCardComponent.setOpenFilmDetailsClickHandler(this._handleOpenFilmDetailsClick);

    this._filmDetailsComponent.setAddToWatchListClickHandler(this._handleToWatchListClick);
    this._filmDetailsComponent.setMarkAsWatchedClickHandler(this._handleMarkAsWatchedClick);
    this._filmDetailsComponent.setFavoriteClickHandler(this._handleFavoriteClick);

    this._filmDetailsComponent.setCloseFilmDetailsClickHandler(this._handleCloseFilmDetailsClick);

    const filmDetailsCommentWrap = this._filmDetailsComponent.getElement().querySelector('.film-details__comments-wrap');
    const filmDetailsCommentsList = this._filmDetailsComponent.getElement().querySelector('.film-details__comments-list');

    for (let i = 0; i < this._movie.comments.length; i++) {
      // render(filmDetailsCommentsList, new FilmDetailsCommentView(this._movie.comments[i]));
      const filmDetailsCommentComponent = new FilmDetailsCommentView(this._movie.comments[i]);
      render(filmDetailsCommentsList, filmDetailsCommentComponent);
      filmDetailsCommentComponent.setCommentDeleteClickHandler(this._handleCommentDeleteClick);
    }

    render(filmDetailsCommentWrap, new FilmDetailsNewCommentView);

    if (prevFilmCardComponent === null || prevFilmDetailsComponent === null) {
      render(this._filmContainer, this._filmCardComponent);
      return;
    }

    if (this._filmContainer.contains(prevFilmCardComponent.getElement())) {
      replace(this._filmCardComponent, prevFilmCardComponent);
    }

    if (this._bodyElement.contains(prevFilmDetailsComponent.getElement())) {
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
    if (this._bodyElement.lastElementChild.className === 'film-details') {
      this._bodyElement.lastElementChild.remove();
    }

    this._bodyElement.appendChild(this._filmDetailsComponent.getElement());
    this._bodyElement.classList.add('hide-overflow');

    document.addEventListener('keydown', this._escKeyDownHandler);
  }

  _closeFilmDetails() {
    this._bodyElement.removeChild(this._filmDetailsComponent.getElement());
    this._bodyElement.classList.remove('hide-overflow');

    document.removeEventListener('keydown', this._escKeyDownHandler);
  }

  _escKeyDownHandler(evt) {
    if (isEscEvent(evt)) {
      evt.preventDefault();

      this._closeFilmDetails();
    }
  }

  _handleOpenFilmDetailsClick() {
    this._openFilmDetails();
  }

  _handleCloseFilmDetailsClick() {
    this._closeFilmDetails();
  }

  _handleToWatchListClick() {
    this._changeData(
      UserAction.UPDATE_FILM,
      UpdateType.PATCH,
      Object.assign(
        {},
        this._movie,
        {
          isWatchlist: !this._movie.isWatchlist,
        },
      ),
    );
  }

  _handleMarkAsWatchedClick() {
    this._changeData(
      UserAction.UPDATE_FILM,
      UpdateType.PATCH,
      Object.assign(
        {},
        this._movie,
        {
          isMarkAsWatched: !this._movie.isMarkAsWatched,
        },
      ),
    );
  }

  _handleFavoriteClick() {
    this._changeData(
      UserAction.UPDATE_FILM,
      UpdateType.PATCH,
      Object.assign(
        {},
        this._movie,
        {
          isFavorite: !this._movie.isFavorite,
        },
      ),
    );
  }

  _handleCommentDeleteClick() {
    this._changeData(
      UserAction.DELETE_COMMENT,
      UpdateType.PATCH,
      Object.assign(
        {},
        this._movie,
        {
          //comments: this._film.comments,
        },
      ),
    );
  }
}
