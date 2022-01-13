import FilmCardView from '../view/film-card.js';
import FilmDetailsView from '../view/film-details.js';
import { render } from '../utils/render';
import { isEscEvent } from '../utils/common';

export default class FilmCard {
  constructor(filmContainer) {
    this._body = document.querySelector('body');
    this._filmContainer = filmContainer;

    this._filmCardComponent = null;
    this._filmDetailsComponent = null;

    this._handleFilmClick = this._handleFilmClick.bind(this);
    this._handleFilmDetailsCloseClick = this._handleFilmDetailsCloseClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(film) {
    this._film = film;

    this._filmCardComponent = new FilmCardView(film);
    this._filmDetailsComponent = new FilmDetailsView(film);

    this._filmCardComponent.setClickHandler(this._handleFilmClick);
    this._filmDetailsComponent.setClickHandler(this._handleFilmDetailsCloseClick);

    render(this._filmContainer, this._filmCardComponent);
  }

  _openFilmDetails() {
    if (this._body.lastElementChild.className === 'film-details') {
      this._body.lastElementChild.remove();
    }

    this._body.appendChild(this._filmDetailsComponent.getElement());
    this._body.classList.add('hide-overflow');

    document.addEventListener('keydown', this._escKeyDownHandler);
  }

  _closeFilmDetails() {
    this._body.removeChild(this._filmDetailsComponent.getElement());
    this._body.classList.remove('hide-overflow');

    document.removeEventListener('keydown', this._escKeyDownHandler);
  }

  _escKeyDownHandler(evt) {
    if (isEscEvent(evt)) {
      this._closeFilmDetails();
    }
  }

  _handleFilmClick() {
    this._openFilmDetails();
  }

  _handleFilmDetailsCloseClick() {
    this._closeFilmDetails();
  }
}
