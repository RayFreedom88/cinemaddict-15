import { generateFilms } from './mock/film';

import FilmsModel from './model/films';
import FilterModel from './model/filter';

import ProfileView from './view/profile';
import NavMenuFilterView from './view/nav-menu-filter';

import FilterPresenter from './presenter/filter';
import FilmsPresenter from './presenter/films';

import { render } from './utils/render';

const FILMS_COUNT = 15;

const movieList = new Array(FILMS_COUNT).fill().map(generateFilms);

const filmsModel = new FilmsModel();
filmsModel.setFilms(movieList);

const filterModel = new FilterModel();

const siteHeader = document.querySelector('.header');
const siteMain = document.querySelector('.main');

const filmsPresenter = new FilmsPresenter(siteMain, filmsModel, filterModel);
const filterPresenter = new FilterPresenter(siteMain, filterModel, filmsModel);

// рендер профиля, нафигации
render(siteHeader, new ProfileView());
// render(siteMain, new NavMenuFilterView());

filterPresenter.init();
filmsPresenter.init();
