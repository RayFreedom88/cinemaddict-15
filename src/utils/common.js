import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

const MINUTES_IN_HOUR = 60;

export const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';
// преобразует дату в нужный формат
export const getFormatDate = (date, format) => dayjs(date).format(`${format}`);

// преобразует хрономентраж в нужный формат
export const getRuntime = (runtime) => {
  if (runtime < MINUTES_IN_HOUR) {
    return `${dayjs.duration(runtime, 'minutes').minutes()}m`;
  } else if (runtime % MINUTES_IN_HOUR === 0) {
    return `${dayjs.duration(runtime, 'minutes').hours()}h`;
  }
  return `${dayjs.duration(runtime, 'minutes').hours()}h ${dayjs.duration(runtime, 'minutes').minutes()}m`;
};

// cортировка по дате
export const sortByDate = (a, b) => dayjs(b.releaseDate).diff(dayjs(a.releaseDate));

// сортировка по рейтингу
export const sortByRating = (a, b) => b.rating - a.rating;

export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};

