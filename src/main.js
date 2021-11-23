// импорты моковых данных

import {generateFilms} from './mock/films.js';

// импорты компонентов

import {createProfileTpl} from './view/profile.js';
import {createMainNavigationTpl} from './view/filter.js';
import {generateFilters} from './mock/filter.js';
import {createSortTpl} from './view/sort.js';
import {createFilmsSectionTpl} from './view/film-section.js';
import {createFilmsListTpl} from './view/film-list.js';
import {createFilmCardTpl} from './view/film-card.js';
import {createButtonShowMoreTpl} from './view/button.js';
import {createFilmDetailsTpl} from './view/film-details.js';

const FILMS_COUNT_STEP = 5;
const FILMS_COUNT = 15;

const films = new Array(FILMS_COUNT).fill().map(generateFilms);

// функция отрисовки компонентов

const render = (container, tpl, place = 'beforeend') => {
  container.insertAdjacentHTML(place, tpl);
};

// рендер профиля

const siteHeader = document.querySelector('.header');

render(siteHeader, createProfileTpl());

// рендер нафигации

const siteMain = document.querySelector('.main');

const filters = generateFilters(films);

render(siteMain, createMainNavigationTpl(filters));

const filterItems = document.querySelectorAll('.main-navigation__item');
const filterItemClassActive = 'main-navigation__item--active';

// клик по кнопки фильтра

const filterItemClickHandler = (evt) => {
  evt.preventDefault();
  filterItems.forEach((item) => {
    item === evt.currentTarget
      ? item.classList.add(filterItemClassActive)
      : item.classList.remove(filterItemClassActive);
  });
};

filterItems.forEach((item) => item.addEventListener('click', filterItemClickHandler));

// рендер сортировки

render(siteMain, createSortTpl());

// рендер секции films

render(siteMain, createFilmsSectionTpl());

// рендер списка фильмов

const filmsSection = siteMain.querySelector('.films');

render(filmsSection, createFilmsListTpl());

// рендер карточек с фильмами

const filmsListContainer = filmsSection.querySelector('.films-list__container');

for (let i = 0; i < FILMS_COUNT_STEP; i++) {
  render(filmsListContainer, createFilmCardTpl(films[i]));
}

// рендер кнопки show more

const filmsList = filmsSection.querySelector('.films-list');

if (films.length >= FILMS_COUNT_STEP) {
  let renderedCardsCount = FILMS_COUNT_STEP;

  render(filmsList, createButtonShowMoreTpl());

  const loadMoreButton = filmsList.querySelector('.films-list__show-more');

  loadMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    films
      .slice(renderedCardsCount, renderedCardsCount + FILMS_COUNT_STEP)
      .forEach((film) => render(filmsListContainer, createFilmCardTpl(film)));

    renderedCardsCount += FILMS_COUNT_STEP;

    if (renderedCardsCount >= films.length) {
      loadMoreButton.remove();
    }
  });
}

// отображение попапа

const siteFooter = document.querySelector('.footer');

filmsListContainer.addEventListener('click', (evt) => {
  evt.preventDefault();

  if (!document.querySelector('.film-details') && (evt.target.classList.contains('film-card__poster') || evt.target.classList.contains('film-card__title') || evt.target.classList.contains('film-card__comments'))) {

    render(siteFooter, createFilmDetailsTpl(films[0]), 'afterend');

    const popup = document.querySelector('.film-details');
    const buttonClosePopup = popup.querySelector('.film-details__close-btn');

    const ESC = 27;

    buttonClosePopup.addEventListener('click', () => {
      popup.remove();
    });

    document.addEventListener('keydown', ({keyCode}) => {
      if (keyCode === ESC) {
        popup.remove();
      }
    });

  }
});
