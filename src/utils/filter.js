import { FilterType } from './const';

export const filter = {
  [FilterType.ALL]: (films) => films.filter((film) => !film.DEFAULT),
  [FilterType.WATCHLIST]: (films) => films.filter((film) => film.isWatchlist),
  [FilterType.HISTORY]: (films) => films.filter((film) => film.isMarkAsWatched),
  [FilterType.FAVORITES]: (films) => films.filter((film) => film.isFavorite),
};
