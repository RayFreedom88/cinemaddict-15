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

const createFilterTpl = (filter, currentFilterType) => {
  const {type, name, count} = filter;
  return `<a
    href="#${type}"
    class="main-navigation__item ${type === currentFilterType ? 'main-navigation__item--active' : ''}"
    title="${type}">
      ${name}${type !== 'all' ? `<span class="main-navigation__item-count">${count}</span>` : ''}
  </a>`;
};

const createNavigationTpl = (filterList, currentFilterType) => {
  const filterListTpl = filterList
    .map((filter) => createFilterTpl(filter, currentFilterType))
    .join('');

  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${filterListTpl}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export default class NavMenu extends AbstractView {
  constructor (filters, currentFilterType) {
    super();
    this._filters = filters;
    this._currentFilter = currentFilterType;

    this._filterClickHandler = this._filterClickHandler.bind(this);
  }

  getTemplate () {
    return createNavigationTpl(this._filters, this._currentFilter);
  }

  _filterClickHandler(evt) {
    evt.preventDefault();
    this._callback.filterClick(evt.target.title);
  }

  setFilterClickHandler(callback) {
    this._callback.filterClick = callback;
    this.getElement().querySelectorAll('.main-navigation__item').addEventListener('click', this._filterClickHandler);
  }
}
