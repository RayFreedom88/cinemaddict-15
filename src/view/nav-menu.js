import AbstractView from './abstract.js';

//   const filterItems = document.querySelectorAll('.main-navigation__item');
//   const filterItemClassActive = 'main-navigation__item--active';

//   const filterItemClickHandler = (evt) => {
//     evt.preventDefault();
//     filterItems.forEach((item) => {
//       item === evt.currentTarget
//         ? item.classList.add(filterItemClassActive)
//         : item.classList.remove(filterItemClassActive);
//     });
//   };

//   filterItems.forEach((item) => item.addEventListener('click', filterItemClickHandler));

const createNavigationTpl = (movieList) => {
  const watchlist = [];
  const history = [];
  const favourites = [];

  movieList.forEach((movie) => {
    if (movie.isWatchlist) {
      watchlist.push(movie);
    }
    if (movie.isMarkAsWatched) {
      history.push(movie);
    }
    if (movie.isFavorite) {
      favourites.push(movie);
    }
  });

  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${watchlist.length}</span></a>
        <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${history.length}</span></a>
        <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${favourites.length}</span></a>
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export default class NavMenu extends AbstractView {
  constructor (movieList) {
    super();
    this._movieList = movieList;
  }

  getTemplate () {
    return createNavigationTpl(this._movieList);
  }
}
