import {createProfileTpl} from './view/profile.js';
import {createMainNavigationTpl} from './view/main-navigation.js';
import {createSortTpl} from './view/sort.js';
import {createFilmsSectionTpl} from './view/film-section.js';
import {createFilmsListTpl} from './view/film-list.js';
import {createFildCardTpl} from './view/film-card.js';
import {createButtonShowMoreTpl} from './view/button.js';
import {createFilmDetailsTpl} from './view/film-details.js';

const render = (container, tpl, place = 'beforeend') => {
  container.insertAdjacentHTML(place, tpl);
};

const siteHeaderElement = document.querySelector('.header');

render(siteHeaderElement, createProfileTpl());

const siteMainElement = document.querySelector('.main');

render(siteMainElement, createMainNavigationTpl());
render(siteMainElement, createSortTpl());
render(siteMainElement, createFilmsSectionTpl());

const filmsSection = siteMainElement.querySelector('.films');

render(filmsSection, createFilmsListTpl());

const filmsListContainer = filmsSection.querySelector('.films-list__container');

const FILM_COUNT = 5;

for (let i = 1; i <= FILM_COUNT; i++) {
  render(filmsListContainer, createFildCardTpl());
}

render(filmsListContainer, createButtonShowMoreTpl(), 'afterend');

const siteFooterElement = document.querySelector('.footer');
render(siteFooterElement, createFilmDetailsTpl(), 'afterend');
