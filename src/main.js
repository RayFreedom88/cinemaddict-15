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

// импорт утилит
import {render} from './utils/render.js';
import {isEscEvent} from './utils/common.js';

const FILMS_COUNT_PER_STEP = 5;
const FILMS_COUNT = 15;

const films = new Array(FILMS_COUNT).fill().map(generateFilms);
const filter = generateFilters(films);

const body = document.querySelector('body');
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


// функция рендера карточки фильма
const renderFilmCard = (filmCardContainer, film) => {
  const filmCardComponent = new FilmCardView(film);
  const filmDetailsComponent = new FilmDetailsView(film);

  const closePopup = () => {
    body.removeChild(filmDetailsComponent.getElement());
    body.classList.remove('hide-overflow');

    filmDetailsComponent.getElement().querySelector('.film-details__close-btn').removeEventListener('click', closePopup);
    // eslint-disable-next-line no-use-before-define
    document.removeEventListener('keydown', popupEscKeyDownHandler);
  };

  const popupEscKeyDownHandler = (evt) => {
    if (isEscEvent(evt)) {
      closePopup();
    }
  };

  const openPopup = () => {
    body.appendChild(filmDetailsComponent.getElement());
    body.classList.add('hide-overflow');

    filmDetailsComponent.setClickHandler(closePopup);
    document.addEventListener('keydown', popupEscKeyDownHandler);
  };

  filmCardComponent.setClickHandler(openPopup);
  filmCardComponent.setClickHandler(openPopup);
  filmCardComponent.setClickHandler(openPopup);


  render(filmCardContainer, filmCardComponent);
};

// функция рендера списка фильмов
const renderFilmsList = (filmListContainer, listFilms) => {
  const filmSectionComponent = new FilmSectionView();
  const filmsListComponent = new FilmsListView();

  render(filmListContainer, filmSectionComponent);

  if (listFilms.length === 0) {
    render(filmListContainer, new NoFilmView());

    return;
  }

  render(filmSectionComponent, filmsListComponent);

  const filmsContainer = filmsListComponent.getElement().querySelector('.films-list__container');

  listFilms
    .slice(0, Math.min(films.length, FILMS_COUNT_PER_STEP))
    .forEach((listFilm) => renderFilmCard(filmsContainer, listFilm));

  // рендер кнопки show more
  if (listFilms.length >= FILMS_COUNT_PER_STEP) {
    let renderedCardsCount = FILMS_COUNT_PER_STEP;

    const showMoreButton = new ButtonView();

    render(filmsListComponent, showMoreButton);

    showMoreButton.setClickHandler(() => {
      listFilms
        .slice(renderedCardsCount, renderedCardsCount + FILMS_COUNT_PER_STEP)
        .forEach((listFilm) => renderFilmCard(filmsContainer, listFilm));

      renderedCardsCount += FILMS_COUNT_PER_STEP;

      if (renderedCardsCount >= listFilms.length) {
        showMoreButton.getElement().remove();
        showMoreButton.removeElement();
      }
    });
  }
};

// рендер профиля пользователя
render(siteHeader, new ProfileView());

// рендер навигации
renderNavMenu(siteMain, filter);


// рендер сортировки
render(siteMain, new SortView());

// рендер списка фильмов
renderFilmsList(siteMain, films);
