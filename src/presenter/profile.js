import ProfileView from '../view/profile';

import { render, replace, remove } from '../utils/render';
import { getRank, getWatchedFilmsAmount } from '../utils/common';
import { UpdateType } from '../utils/const';

export default class Profile {
  constructor(container, filmsModel, headerProfileModel) {
    this._container = container;
    this._profileModel = headerProfileModel;
    this._filmsModel = filmsModel;
    this._films = this._filmsModel.getFilms();

    this._profileComponent = null;

    this._handleProfileModelEvent = this._handleProfileModelEvent.bind(this);
    this._handleFilmsModelEvent = this._handleFilmsModelEvent.bind(this);

    this._profileModel.addObserver(this._handleProfileModelEvent);
    this._filmsModel.addObserver(this._handleFilmsModelEvent);
  }

  init() {
    const prevProfileComponent = this._profileComponent;

    if (prevProfileComponent === null) {
      this._profileComponent = new ProfileView(getRank(getWatchedFilmsAmount(this._films)));
      render(this._container, this._profileComponent);
      return;
    }

    if (this._container.contains(prevProfileComponent.getElement())) {
      this._profileComponent = new ProfileView(this._profileModel.getRank());
      replace(this._profileComponent, prevProfileComponent);
    }

    remove(prevProfileComponent);

  }

  _handleProfileModelEvent() {
    this.init();
  }

  _handleFilmsModelEvent() {
    this._profileModel.setRank(UpdateType.MAJOR, getRank(getWatchedFilmsAmount(this._filmsModel.getFilms())));
  }
}
