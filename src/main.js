// импорты моковых данных

import {generateFilms} from './mock/films.js';
import {generateFilters} from './mock/filter.js';

// импорты компонентов
import ProfileView from './view/profile.js';
import NavMenuView from './view/nav-menu.js';
import SortView from './view/sort.js';
import FilmSectionView from './view/film-section.js';
import NoFilmView from './view/no-film.js';
// import FilmLoadingView from './view/film-loading.js';
import FilmsListView from './view/film-list.js';
import FilmCardView from './view/film-card.js';
import FilmDetailsView from './view/film-details.js';
import ButtonView from './view/button.js';

// импорт утилиты
import {render, RenderPosition} from './utils.js';

const FILMS_COUNT_PER_STEP = 5;
const FILMS_COUNT = 15;

const films = new Array(FILMS_COUNT).fill().map(generateFilms);
const filter = generateFilters(films);

const siteHeader = document.querySelector('.header');
const siteMain = document.querySelector('.main');

// функция рендера нафигации
const renderNavMenu = (navMenuContainer, navMenuFilter) => {
  const navMenu = new NavMenuView(navMenuFilter);

  render(navMenuContainer, navMenu.getElement(), RenderPosition.BEFOREEND);

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

// функция рендера карточки фильма

const renderFilmCard = (filmCardContainer, film) => {
  const filmCard = new FilmCardView(film);
  // const filmDetails = new FilmDetailsView(film);

  render(filmCardContainer, filmCard.getElement(), RenderPosition.BEFOREEND);
};

// функция рендера списка фильмов
const renderFilmsList = (filmListContainer, listFilms) => {
  const filmSection = new FilmSectionView();
  const filmsList = new FilmsListView();

  render(filmListContainer, filmSection.getElement(), RenderPosition.BEFOREEND);

  if (listFilms.length === 0) {
    render(filmListContainer, new NoFilmView().getElement(), RenderPosition.BEFOREEND);

    return;
  }

  render(filmSection.getElement(), filmsList.getElement(), RenderPosition.BEFOREEND);

  const filmsContainer = filmsList.getElement().querySelector('.films-list__container');

  listFilms
    .slice(0, Math.min(films.length, FILMS_COUNT_PER_STEP))
    .forEach((listFilm) => renderFilmCard(filmsContainer, listFilm));

  // рендер кнопки show more
  if (listFilms.length >= FILMS_COUNT_PER_STEP) {
    let renderedCardsCount = FILMS_COUNT_PER_STEP;

    const loadMoreButton = new ButtonView();

    render(filmsList.getElement(), loadMoreButton.getElement(), RenderPosition.BEFOREEND);

    loadMoreButton.getElement().addEventListener('click', (evt) => {
      evt.preventDefault();

      listFilms
        .slice(renderedCardsCount, renderedCardsCount + FILMS_COUNT_PER_STEP)
        .forEach((listFilm) => renderFilmCard(filmsContainer, listFilm));

      renderedCardsCount += FILMS_COUNT_PER_STEP;

      if (renderedCardsCount >= listFilms.length) {
        loadMoreButton.getElement().remove();
        loadMoreButton.removeElement();
      }
    });
  }
};

// рендер профиля пользователя
render(siteHeader, new ProfileView().getElement(), RenderPosition.BEFOREEND);

// рендер навигации
renderNavMenu(siteMain, filter);


// рендер сортировки
render(siteMain, new SortView().getElement(), RenderPosition.BEFOREEND);

// рендер списка фильмов
renderFilmsList(siteMain, films);

// // отображение попапа

// const siteFooter = document.querySelector('.footer');

// filmsListContainer.addEventListener('click', (evt) => {
//   evt.preventDefault();

//   if (!document.querySelector('.film-details') && (evt.target.classList.contains('film-card__poster') || evt.target.classList.contains('film-card__title') || evt.target.classList.contains('film-card__comments'))) {

//     renderTemplate(siteFooter, createFilmDetailsTpl(films[0]), 'afterend');

//     const popup = document.querySelector('.film-details');
//     const buttonClosePopup = popup.querySelector('.film-details__close-btn');

//     const ESC = 27;

//     buttonClosePopup.addEventListener('click', () => {
//       popup.remove();
//     });

//     document.addEventListener('keydown', ({keyCode}) => {
//       if (keyCode === ESC) {
//         popup.remove();
//       }
//     });

//   }
// });
