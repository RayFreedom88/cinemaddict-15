import dayjs from 'dayjs';

export const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

export const sortByDate = (a, b) => dayjs(b.releaseDate).diff(dayjs(a.releaseDate));

export const sortByRating = (a, b) => b.rating - a.rating;
