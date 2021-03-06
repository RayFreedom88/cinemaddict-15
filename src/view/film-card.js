import AbstractView from './abstract';
import { getFormatDate, getRuntime } from '../utils/common';

const createFilmCardTpl = (movie) => {
  const {
    poster,
    title,
    rating,
    releaseDate,
    runtime,
    genres,
    description,
    comments,
    isWatchlist,
    isMarkAsWatched,
    isFavorite,
  } = movie;

  const MAX_DESCRIPTION_LENGTH = 139;

  const year = getFormatDate(releaseDate,'YYYY');

  const getFilmCardDescription = () => (description.length > MAX_DESCRIPTION_LENGTH) ? `${description.substring(0, MAX_DESCRIPTION_LENGTH)}...`: description;

  const watchlistClassName = isWatchlist
    ? 'film-card__controls-item--add-to-watchlist film-card__controls-item--active'
    : 'film-card__controls-item--add-to-watchlist';

  const markAsWatchedClassName = isMarkAsWatched
    ? 'film-card__controls-item--mark-as-watched film-card__controls-item--active'
    : 'film-card__controls-item--mark-as-watched';

  const favoriteClassName = isFavorite
    ? 'film-card__controls-item--favorite film-card__controls-item--active'
    : 'film-card__controls-item--favorite';

  return (
    `<article class="film-card">
        <h3 class="film-card__title">${title}</h3>
        <p class="film-card__rating">${rating}</p>
        <p class="film-card__info">
          <span class="film-card__releaseDate">${year}</span>
          <span class="film-card__duration">${getRuntime(runtime)}</span>
          <span class="film-card__genre">${genres.join(', ')}</span>
        </p>
        <img src="./images/posters/${poster}" alt="" class="film-card__poster">
        <p class="film-card__description">${getFilmCardDescription()}</p>
        <a class="film-card__comments">${comments.length} comments</a>
        <div class="film-card__controls">
          <button class="film-card__controls-item ${watchlistClassName}" type="button">Add to watchlist</button>
          <button class="film-card__controls-item ${markAsWatchedClassName}" type="button">Mark as watched</button>
          <button class="film-card__controls-item ${favoriteClassName}" type="button">Mark as favorite</button>
        </div>
      </article>`
  );
};

export default class FilmCard extends AbstractView {
  constructor(movie) {
    super();
    this._movie = movie;

    this._addToWatchListClickHandler = this._addToWatchListClickHandler.bind(this);
    this._markAsWatchedClickHandler = this._markAsWatchedClickHandler.bind(this);
    this._favouriteClickHandler = this._favouriteClickHandler.bind(this);

    this._openFilmDetailsClickHandler = this._openFilmDetailsClickHandler.bind(this);
  }

  getTemplate() {
    return createFilmCardTpl(this._movie);
  }

  _openFilmDetailsClickHandler(evt) {
    evt.preventDefault();

    this._callback.openFilmDetailsClick();
  }

  _addToWatchListClickHandler(evt) {
    evt.preventDefault();

    this._callback.addToWatchListClick();
  }

  _markAsWatchedClickHandler(evt) {
    evt.preventDefault();

    this._callback._markAsWatchedClick();
  }

  _favouriteClickHandler(evt) {
    evt.preventDefault();

    this._callback._favouriteClick();
  }

  setAddToWatchListClickHandler(callback) {
    this._callback.addToWatchListClick = callback;

    this.getElement().querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this._addToWatchListClickHandler);
  }

  setMarkAsWatchedClickHandler(callback) {
    this._callback._markAsWatchedClick = callback;

    this.getElement().querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this._markAsWatchedClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback._favouriteClick = callback;

    this.getElement().querySelector('.film-card__controls-item--favorite').addEventListener('click', this._favouriteClickHandler);
  }

  setOpenFilmDetailsClickHandler(callback) {
    this._callback.openFilmDetailsClick = callback;

    this.getElement().querySelector('.film-card__poster').addEventListener('click', this._openFilmDetailsClickHandler);
    this.getElement().querySelector('.film-card__title').addEventListener('click', this._openFilmDetailsClickHandler);
    this.getElement().querySelector('.film-card__comments').addEventListener('click', this._openFilmDetailsClickHandler);
  }
}
