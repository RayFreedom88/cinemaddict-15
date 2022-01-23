import { generateFilms } from './mock/film.js';

import FilmsModel from './model/films.js';

import ProfileView from './view/profile.js';
import NavMenuView from './view/nav-menu.js';

import FilmsPresenter from './presenter/films.js';

import { render } from './utils/render.js';

const FILMS_COUNT = 15;

const movieList = new Array(FILMS_COUNT).fill().map(generateFilms);

const filmsModel = new FilmsModel();
filmsModel.setFilms(movieList);

const siteHeader = document.querySelector('.header');
const siteMain = document.querySelector('.main');

// рендер профиля, нафигации
render(siteHeader, new ProfileView());
render(siteMain, new NavMenuView(movieList));

const filmsPresenter = new FilmsPresenter(siteMain, filmsModel);
filmsPresenter.init(movieList);
