import dayjs from 'dayjs';

export const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

export const sortByDate = (a, b) => dayjs(b.releaseDate).diff(dayjs(a.releaseDate));

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

