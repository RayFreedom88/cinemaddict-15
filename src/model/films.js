import AbstractObserver from '../utils/abstract-observer';

export default class Films extends AbstractObserver {
  constructor() {
    super();
    this._movieList = [];
  }

  setFilms(movieList) {
    this.movieList = movieList.slice();
  }

  getFilms() {
    return this.movieList;
  }

  updateFilm(updateType, update) {
    const index = this._films.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting film');
    }

    this._films = [
      ...this._films.slice(0, index),
      update,
      ...this._films.slice(index + 1),
    ];

    this._notify(updateType, update);
  }
}
