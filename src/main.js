// импорты моковых данных
import {generateFilms} from './mock/films.js';
import {generateFilters} from './mock/filter.js';
// импорты компонентов
import ProfileView from './view/profile.js';
import NavMenuView from './view/nav-menu.js';

import FilmsPresenter from './presenter/films.js';
// импорт утилит
import {render} from './utils/render.js';

const FILMS_COUNT = 15;

const films = new Array(FILMS_COUNT).fill().map(generateFilms);
const filter = generateFilters(films);

const siteHeader = document.querySelector('.header');
const siteMain = document.querySelector('.main');

// функция рендера нафигации
const renderNavMenu = (navMenuContainer, navMenuFilter) => {
  const navMenu = new NavMenuView(navMenuFilter);

  render(navMenuContainer, navMenu);

  const filterItems = document.querySelectorAll('.main-navigation__item');
  const filterItemClassActive = 'main-navigation__item--active';

  const filterItemClickHandler = (evt) => {
    evt.preventDefault();
    filterItems.forEach((item) => {
      item === evt.currentTarget
        ? item.classList.add(filterItemClassActive)
        : item.classList.remove(filterItemClassActive);
    });
  };

  filterItems.forEach((item) => item.addEventListener('click', filterItemClickHandler));
};

// рендер профиля, нафигации
render(siteHeader, new ProfileView());
renderNavMenu(siteMain, filter);

const filmsPresenter = new FilmsPresenter(siteMain);
filmsPresenter.init(films);
