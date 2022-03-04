import { generateFilms } from './mock/film';

import FilmsModel from './model/films';
import FilterModel from './model/filter';

import ProfileView from './view/profile';
import NavMenuView from './view/nav-menu';

import FilmsPresenter from './presenter/films';

import { render } from './utils/render';

const FILMS_COUNT = 15;

const movieList = new Array(FILMS_COUNT).fill().map(generateFilms);

const filters = [
  {
    type: 'all',
    name: 'All movies',
    count: 0,
  },
];

const filmsModel = new FilmsModel();
filmsModel.setFilms(movieList);

const filterModel = new FilterModel();

const siteHeader = document.querySelector('.header');
const siteMain = document.querySelector('.main');

// рендер профиля, нафигации
render(siteHeader, new ProfileView());
render(siteMain, new NavMenuView(filters, 'all'));

const filmsPresenter = new FilmsPresenter(siteMain, filmsModel);
filmsPresenter.init();
