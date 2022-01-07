import FilmCardView from '../view/film-card.js';
import FilmDetailsView from '../view/film-details.js';
import {render} from '../utils/render';
import {isEscEvent} from '../utils/common';

export default class FilmCard {
  constructor(filmContainer) {
    this._body = document.querySelector('body');
    this._filmContainer = filmContainer;
  }

  init(film) {
    this._film = film;

    this._filmCardComponent = new FilmCardView(film);
    this._filmDetailsComponent = new FilmDetailsView(film);

    render(this._filmContainer, this._filmCardComponent);

    this._filmCardComponent.setClickHandler(this._openPopup);
    this._filmCardComponent.setClickHandler(this._openPopup);
    this._filmCardComponent.setClickHandler(this._openPopup);
  }

  _closePopup() {
    this._body.removeChild(this._filmDetailsComponent.getElement());
    this._body.classList.remove('hide-overflow');

    this._filmDetailsComponent.getElement().querySelector('.film-details__close-btn').removeEventListener('click', this._closePopup);
    document.removeEventListener('keydown', this._popupEscKeyDownHandler);
  }

  _popupEscKeyDownHandler(evt) {
    if (isEscEvent(evt)) {
      this._closePopup();
    }
  }

  _openPopup () {
    this._body.appendChild(this._filmDetailsComponent.getElement());
    this._body.classList.add('hide-overflow');

    this._filmDetailsComponent.setClickHandler(this._closePopup);
    document.addEventListener('keydown', this._popupEscKeyDownHandler);
  }
}
