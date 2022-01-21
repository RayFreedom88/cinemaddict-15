import dayjs from 'dayjs';
import AbstractView from './abstract.js';

const createGenreTpl = (genre) => `<span class="film-details__genre">${genre}</span>`;

const getGenre = (genres) => {
  const arrayGenre = genres.map((genre) => createGenreTpl(genre));
  return arrayGenre;
};

const createCommentTpl = (comment) => {
  const {
    text,
    emotion,
    author,
    commentDate,
  } = comment;

  return `<li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
    </span>
    <div>
      <p class="film-details__comment-text">${text}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${author}</span>
        <span class="film-details__comment-day">${commentDate}</span>
        <button class="film-details__comment-delete">Delete</button>
      </p>
    </div>
    </li>`;
};

const createFilmDetailsTpl = (film) => {
  const {
    poster,
    title,
    originalTitle,
    rating,
    ageRating,
    director,
    writers,
    actors,
    releaseDate,
    runtime,
    releaseCountry,
    genres,
    description,
    comments,
    isWatchlist,
    isHistory,
    isFavorite,
  } = film;

  const date = dayjs(releaseDate).format('DD MMMM YYYY');

  const genresHeading = genres.length > 1 ? 'Genres' : 'Genre';

  const getComment = (array) => {
    const arrayComments = array.map((comment) => createCommentTpl(comment));
    return arrayComments;
  };

  const watchlistClassName = isWatchlist
    ? 'film-details__control-button--watchlist film-details__control-button--active'
    : 'film-details__control-button--watchlist';

  const historyClassName = isHistory
    ? 'film-details__control-button--watched film-details__control-button--active'
    : 'film-details__control-button--watched';

  const favoriteClassName = isFavorite
    ? 'film-details__control-button--favorite film-details__control-button--active'
    : 'film-details__control-button--favorite';

  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="film-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>

          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="./images/posters/${poster}" alt="">
              <p class="film-details__age">${ageRating}+</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${title}</h3>
                  <p class="film-details__title-original">${originalTitle}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${rating}</p>
                </div>
              </div>

              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${director}</td>
                </tr>

                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${writers.join(', ')}</td>
                </tr>

                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${actors.join(', ')}</td>
                </tr>

                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${date}</td>
                </tr>

                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${runtime}</td>
                </tr>

                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${releaseCountry}</td>
                </tr>

                <tr class="film-details__row">
                  <td class="film-details__term">${genresHeading}</td>
                  <td class="film-details__cell">
                    ${getGenre(genres).join('')}
                </tr>
              </table>

              <p class="film-details__film-description">
                ${description}
              </p>
            </div>
          </div>

          <section class="film-details__controls">
            <button type="button" class="film-details__control-button ${watchlistClassName}" id="watchlist" name="watchlist">Add to watchlist</button>
            <button type="button" class="film-details__control-button ${historyClassName}" id="watched" name="watched">Already watched</button>
            <button type="button" class="film-details__control-button ${favoriteClassName}" id="favorite" name="favorite">Add to favorites</button>
          </section>
        </div>

        <div class="film-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

            <ul class="film-details__comments-list">
              ${getComment(comments).join('')}
            </ul>
          </section>
        </div>
      </form>
    </section>`
  );
};

export default class FilmDetails extends AbstractView {
  constructor(film) {
    super();
    this._film = film;

    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._toWatchListClickHandler = this._toWatchListClickHandler.bind(this);
    this._markAsWatchedClickHandler = this._markAsWatchedClickHandler.bind(this);

    this._closeFilmDetailsClickHandler = this._closeFilmDetailsClickHandler.bind(this);
  }

  getTemplate() {
    return createFilmDetailsTpl(this._film);
  }

  _toWatchListClickHandler(evt) {
    evt.preventDefault();

    this._callback.toWatchListClick();
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();

    this._callback.favoriteClick();
  }

  _markAsWatchedClickHandler(evt) {
    evt.preventDefault();

    this._callback.markAsWatchedClick();
  }

  _closeFilmDetailsClickHandler(evt) {
    evt.preventDefault();

    this._callback.closeFilmDetailsClick();
  }

  setAddToWatchListClickHandler(callback) {
    this._callback.toWatchListClick = callback;

    this.getElement().querySelector('.film-details__control-button--watchlist').addEventListener('click', this._toWatchListClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;

    this.getElement().querySelector('.film-details__control-button--favorite').addEventListener('click', this._favoriteClickHandler);
  }

  setMarkAsWatchedClickHandler(callback) {
    this._callback.markAsWatchedClick = callback;

    this.getElement().querySelector('.film-details__control-button--watched').addEventListener('click', this._markAsWatchedClickHandler);
  }

  setCloseFilmDetailsClickHandler(callback) {
    this._callback.closeFilmDetailsClick = callback;

    this.getElement().querySelector('.film-details__close-btn').addEventListener('click', this._closeFilmDetailsClickHandler);
  }
}
