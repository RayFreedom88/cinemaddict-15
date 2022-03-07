import dayjs from 'dayjs';
import { nanoid } from 'nanoid';
import {
  POSTERS,
  TITLES,
  DIRECTORS,
  ARRAY_WRITERS,
  ARRAY_ACTORS,
  COUNTRIES,
  ARRAY_GENRES,
  DESCRIPTIONS,
  COMMENTS,
  EMOTIONS,
  COMMENT_AUTHORS
} from './const.js';

// Функция для генерации случайного числа, взята из интернета
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random

const getRandom = function (min, max) {
  const lower = Math.ceil(Math.min((min), (max)));
  const upper = Math.floor(Math.max((min), (max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomIndex = (array) => {
  const randomIndex = getRandom(0, array.length -1);
  return array[randomIndex];
};

const getRating = (min, max) => {
  const result = Math.random() * (max - min + 1) + min;
  return result.toFixed(1);
};

const getRandomDate = () => {
  const daysInterval = -3000;
  const day = dayjs().date((getRandom(daysInterval, dayjs().date())));
  return dayjs(day);
};

export const generateComments = () => ({
  id: nanoid(),
  text: getRandomIndex(COMMENTS),
  emotion: getRandomIndex(EMOTIONS),
  author: getRandomIndex(COMMENT_AUTHORS),
  commentDate: getRandomDate('D MMMM YYYY'),
});

export const generateFilms = () => {
  const actors = new Array(getRandom(2, 6)).fill().map(() => getRandomIndex(ARRAY_ACTORS));
  const writers = new Array(getRandom(1, 3)).fill().map(() => getRandomIndex(ARRAY_WRITERS));
  const genres = new Array(getRandom(1,2)).fill().map(() => getRandomIndex(ARRAY_GENRES));
  const comments = new  Array(getRandom(0, 5)).fill().map(() => generateComments());

  return {
    id: nanoid(),
    comments,
    title: getRandomIndex(TITLES),
    originalTitle: getRandomIndex(TITLES),
    poster: getRandomIndex(POSTERS),
    ageRating: `${getRandom(6,18)}`,
    rating: getRating(1, 10),
    director: getRandomIndex(DIRECTORS),
    writers,
    actors,
    releaseDate: getRandomDate('D MMMM YYYY'),
    runtime: getRandom(30, 180),
    releaseCountry: getRandomIndex(COUNTRIES),
    genres,
    description: getRandomIndex(DESCRIPTIONS),
    isWatchlist: Boolean(getRandom(0, 1)),
    isMarkAsWatched: Boolean(getRandom(0, 1)),
    isFavorite: Boolean(getRandom(0, 1)),
  };
};
