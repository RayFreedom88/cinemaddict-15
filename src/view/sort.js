import AbstractView from './abstract.js';
import { SortType } from '../utils/const.js';

const createSortTpl = () => (
  `<ul class="sort">
      <li>
        <a href="#" class="sort__button sort__button--active" data-sort-type="${SortType.DEFAULT}">Sort by default</a>
      </li>

      <li>
        <a href="#" class="sort__button" data-sort-type="${SortType.DATE}">Sort by date</a>
      </li>

      <li>
        <a href="#" class="sort__button" data-sort-type="${SortType.RATING}">Sort by rating</a>
      </li>
    </ul>`
);

export default class Sort extends AbstractView {
  constructor() {
    super();

    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createSortTpl();
  }

  _sortTypeChangeHandler(evt) {
    if (evt.target.tagName !== 'A') {
      return;
    }

    evt.preventDefault();
    const sortItems =  this.getElement().querySelectorAll('.sort__button');

    sortItems.forEach((button) => {
      const sortItem = evt.target.closest('.sort__button');
      button.classList.toggle('sort__button--active', button === sortItem);
    });

    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener('click', this._sortTypeChangeHandler);
  }
}
