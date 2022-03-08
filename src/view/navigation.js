import AbstractView from './abstract';
import { FilterType } from '../utils/const';

const createNavigationTemplate = () => (
  `<nav class="main-navigation">

    <a href="#stats"
    class="main-navigation__additional"
    data-name="${FilterType.STATS}">Stats</a>
  </nav>`
);

export default class Navigation extends AbstractView {
  constructor() {
    super();

    this._navigationClickHandler = this._navigationClickHandler.bind(this);
  }

  getTemplate() {
    return createNavigationTemplate();
  }

  _navigationClickHandler(evt) {
    evt.preventDefault();
    this._callback.navigationClick(evt.target.dataset.name);
  }

  setNavigationClickHandler(callback) {
    this._callback.navigationClick = callback;
    this.getElement().addEventListener('click', this._navigationClickHandler);
  }
}
