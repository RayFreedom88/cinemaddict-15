//import HeaderProfileView from './view/header-profile';
import ProfilePresenter from './presenter/profile';
import NavigationView from './view/navigation';
import StatsView from './view/stats.js';
import FooterStatiscticsView from './view/footer-statistics';

import FilmsPresenter from './presenter/films';
import FilterPresenter from './presenter/filter';

import FilmsModel from './model/films';
import FilterModel from './model/filter';
import ProfileModel from './model/profile';

import { RenderPosition, render, remove } from './utils/render';
import { generateFilm } from './mock/film';
import { FilterType } from './utils/const';

const FILMS_COUNT = 25;

const films = new Array(FILMS_COUNT).fill().map(generateFilm);

const profileModel = new ProfileModel();

const filmsModel = new FilmsModel();
filmsModel.setFilms(films);

const filterModel = new FilterModel();

const siteHeader = document.querySelector('.header');
const siteMain = document.querySelector('.main');
const NavigationComponent = new NavigationView();
const profilePresenterComponent = new ProfilePresenter(siteHeader, filmsModel, profileModel);
const filmsPresenterComponent = new FilmsPresenter(siteMain, filmsModel, filterModel);
const filterPresenterComponent = new FilterPresenter(NavigationComponent, filterModel, filmsModel);
const footerStatisticsContainerElement = document.querySelector('.footer__statistics');

profilePresenterComponent.init();
render(siteMain, NavigationComponent);

let statsComponent = null;

const handleNavigationClick = (filterType) => {
  //придумать нормальное решение для переключения класса
  if (filterType === 'stats') {
    NavigationComponent.getElement().querySelector('[data-name="stats"]').classList.add('main-navigation__additional--active');
    NavigationComponent.getElement().querySelectorAll('a').forEach((element) => {
      element.classList.remove('main-navigation__item--active');
    });
  } else {
    NavigationComponent.getElement().querySelector('[data-name="stats"]').classList.remove('main-navigation__additional--active');
  }

  switch (filterType) {
    case FilterType.ALL:
      remove(statsComponent);
      filmsPresenterComponent.destroy();
      filmsPresenterComponent.init();
      break;
    case FilterType.WATCHLIST:
      remove(statsComponent);
      filmsPresenterComponent.destroy();
      filmsPresenterComponent.init();
      break;
    case FilterType.HISTORY:
      remove(statsComponent);
      filmsPresenterComponent.destroy();
      filmsPresenterComponent.init();
      break;
    case FilterType.FAVORITES:
      remove(statsComponent);
      filmsPresenterComponent.destroy();
      filmsPresenterComponent.init();
      break;
    case FilterType.STATS:
      filmsPresenterComponent.destroy();
      remove(statsComponent);
      statsComponent = new StatsView(filmsModel.getFilms());
      render(siteMain, statsComponent, RenderPosition.AFTEREND);
      break;
  }
};

NavigationComponent.setNavigationClickHandler(handleNavigationClick);
filterPresenterComponent.init();
filmsPresenterComponent.init();
render(footerStatisticsContainerElement, new FooterStatiscticsView(films.length));
