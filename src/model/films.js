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
}
