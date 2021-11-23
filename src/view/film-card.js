import dayjs from 'dayjs';

export const createFilmCardTpl = (film) => {
  const {
    poster,
    title,
    rating,
    releaseDate,
    runtime,
    genres,
    description,
    totalComments,
    isWatchlist,
    isHistory,
    isFavorite,
  } = film;

  const year = dayjs(releaseDate).format('YYYY');

  const watchlistClassName = isWatchlist
    ? 'film-card__controls-item--add-to-watchlist film-card__controls-item--active'
    : 'film-card__controls-item--add-to-watchlist';

  const historyClassName = isHistory
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
          <span class="film-card__duration">${runtime}</span>
          <span class="film-card__genre">${genres.join(', ')}</span>
        </p>
        <img src="./images/posters/${poster}" alt="" class="film-card__poster">
        <p class="film-card__description">${description}</p>
        <a class="film-card__comments">${totalComments} comments</a>
        <div class="film-card__controls">
          <button class="film-card__controls-item ${watchlistClassName}" type="button">Add to watchlist</button>
          <button class="film-card__controls-item ${historyClassName}" type="button">Mark as watched</button>
          <button class="film-card__controls-item ${favoriteClassName}" type="button">Mark as favorite</button>
        </div>
      </article>`
  );
};
