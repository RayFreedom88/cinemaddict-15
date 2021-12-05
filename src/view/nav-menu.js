import {createElement} from '../utils.js';

const createFilter = (filter) => {
  const {name, count} = filter;

  return (
    `<a href="#${name}" class="main-navigation__item">
      ${name} <span class="main-navigation__item-count">${count}</span>
    </a>`
  );
};

const createNavigationTpl = (filters) => {
  const filmsFilter = filters.map((it) => createFilter(it)).join('\n');

  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        ${filmsFilter}
    </nav>`
  );
};

export default class NavMenu {
  constructor (filters) {
    this._filters = filters;
    this._element = null;
  }

  getTemplate () {
    return createNavigationTpl(this._filters);
  }

  getElement () {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement () {
    this._element = null;
  }
}
