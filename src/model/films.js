import AbstractObserver from '../utils/abstract-observer';

export default class Films extends AbstractObserver {
  constructor() {
    super();
    this._movieList = [];
  }

  setFilms(movieList) {
    this._movieList = movieList.slice();
  }

  getFilms() {
    return this._movieList;
  }

  updateFilm(updateType, update) {
    const index = this._movieList.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting film');
    }

    this._movieList = [
      ...this._movieList.slice(0, index),
      update,
      ...this._movieList.slice(index + 1),
    ];

    this._notify(updateType, update);
  }
}
