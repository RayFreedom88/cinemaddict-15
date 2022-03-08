import { generateFilms } from './mock/film';

import FilmsModel from './model/films';
import FilterModel from './model/filter';

import ProfileView from './view/profile';
import NavMenuView from './view/nav-menu';
import StatsView from './view/stats';

import FilterPresenter from './presenter/filter';
import FilmsPresenter from './presenter/films';

import { remove, render, RenderPosition } from './utils/render';
import { FilterType } from './utils/const';

const FILMS_COUNT = 15;

const movieList = new Array(FILMS_COUNT).fill().map(generateFilms);

const filmsModel = new FilmsModel();
filmsModel.setFilms(movieList);

const filterModel = new FilterModel();

const siteHeader = document.querySelector('.header');
const siteMain = document.querySelector('.main');
const siteNavMenu = new NavMenuView();


const filmsPresenter = new FilmsPresenter(siteMain, filmsModel, filterModel);
const filterPresenter = new FilterPresenter(siteNavMenu, filterModel, filmsModel);

// рендер профиля, нафигации
render(siteHeader, new ProfileView(movieList));
render(siteMain, siteNavMenu);

let statsComponent = null;

const handleNavMenuClick = (filterType) => {
  //придумать нормальное решение для переключения класса
  if (filterType === 'stats') {
    siteNavMenu.getElement().querySelector('[data-name="stats"]').classList.add('main-navigation__additional--active');
    siteNavMenu.getElement().querySelectorAll('a').forEach((element) => {
      element.classList.remove('main-navigation__item--active');
    });
  } else {
    siteNavMenu.getElement().querySelector('[data-name="stats"]').classList.remove('main-navigation__additional--active');
  }

  switch (filterType) {
    case FilterType.ALL:
      remove(statsComponent);
      filmsPresenter.destroy();
      filmsPresenter.init();
      break;
    case FilterType.WATCHLIST:
      remove(statsComponent);
      filmsPresenter.destroy();
      filmsPresenter.init();
      break;
    case FilterType.HISTORY:
      remove(statsComponent);
      filmsPresenter.destroy();
      filmsPresenter.init();
      break;
    case FilterType.FAVORITES:
      remove(statsComponent);
      filmsPresenter.destroy();
      filmsPresenter.init();
      break;
    case FilterType.STATS:
      filmsPresenter.destroy();
      statsComponent = new StatsView(filmsModel.getFilms());
      render(siteMain, statsComponent, RenderPosition.AFTEREND);
      break;
  }
};

siteNavMenu.setNavMenuClickHandler(handleNavMenuClick);

filterPresenter.init();
// filmsPresenter.init();

