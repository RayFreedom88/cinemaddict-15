import AbstractView from './abstract';
import { FilterType } from '../utils/const';

const createNavMenuTpl = () => (
  `<nav class="main-navigation">
    <a href="#stats" class="main-navigation__additional" data-name="${FilterType.STATS}">Stats</a>
  </nav>`
);

export default class NavMenu extends AbstractView {
  constructor() {
    super();

    this._navMenuClickHandler = this._navMenuClickHandler.bind(this);
  }

  getTemplate() {
    return createNavMenuTpl();
  }

  _navMenuClickHandler(evt) {
    evt.preventDefault();
    this._callback.navigationClick(evt.target.dataset.name);
  }

  setNavMenuClickHandler(callback) {
    this._callback.navigationClick = callback;
    this.getElement().addEventListener('click', this._navMenuClickHandler);
  }
}
