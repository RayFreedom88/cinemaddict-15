const filmToFilterMap = {
  Watchlist: (films) => films.filter((film) => film.isWatchlist).length,
  History: (films) => films.filter((film) => film.isHistory).length,
  Favorites: (films) => films.filter((film) => film.isFavorite).length,
};

const generateFilters = (films) => Object.entries(filmToFilterMap).map(
  ([filterName, countFilm]) => ({
    name: filterName,
    count: countFilm(films),
  }),
);

export {generateFilters};
