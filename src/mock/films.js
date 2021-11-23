import dayjs from 'dayjs';

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

const posters = [
  'made-for-each-other.png',
  'popeye-meets-sinbad.png',
  'sagebrush-trail.jpg',
  'santa-claus-conquers-the-martians.jpg',
  'the-dance-of-life.jpg',
  'the-great-flamarion.jpg',
  'the-man-with-the-golden-arm.jpg',
];

const titles = [
  'Made for Each Other',
  'Popeye the Sailor Meets Sindbad the Sailor',
  'Sagebrush Trail',
  'Santa Claus Conquers the Martians',
  'The Dance of Life',
  'The Great Flamarion',
  'The Man with the Golden Arm',
];

const getRating = (min, max) => {
  const result = Math.random() * (max - min + 1) + min;
  return result.toFixed(1);
};

const directors = [
  'Reza Badiyi',
  'Minhal Baig',
  'Chris Bailey',
  'David James Baker',
  'Richard Foster Baker',
  'Paul Bales',
];

const arrayWriters = [
  'Robert Towne',
  'Quentin Tarantino',
  'William Goldman',
  'Charlie Kaufman',
  'Woody Allen',
  'Nora Ephron',
];

const arrayActors = [
  'Tom Hanks',
  'Woody Harrelson',
  'Tommy Lee Jones',
  'Samuel L. Jackson',
  'Bradley Cooper',
  'Mel Gibson',
];

const getRandomDate = () => {
  const daysInterval = -15000;
  const day = dayjs().date((getRandom(daysInterval, dayjs().date())));
  return dayjs(day);
};

const runtimes = [
  '1h 59m',
  '1h 18m',
  '1h 21m',
  '54m',
  '16m',
  '1h 36m',
  '1h 05m',
];

const countries = [
  'Australia',
  'Bosnia and Herzegovina',
  'Cambodia',
  'Iceland',
  'Liechtenstein',
  'United Kingdom',
];

const arrayGenres = [
  'Western',
  'Drama',
  'Comedy',
  'Cartoon',
  'Musical',
  'Mystery',
];

const descriptions = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.',
];

const COMMENTS = [
  'Невероятно романтичное кино.',
  'Фильм, который потряс до глубины души. Красивый, трогательный. При этом поучительный, особенно для детей.',
  'Двоякое чувство, вроде и получил удовольствие от просмотра, но по итогу фильм заканчивается ничем.',
  'Я понимаю что большинству фильм нравится, но мне он не очень зашел.',
  'Услада для глаз, соскучившихся по хорошему кино.',
  'Злая от просмотра, ждала фильм.такую задумку изгадить. Дешёвая камера, размытая съемка дрожащей рукой, обрезанные головы людей, коленки близким планом (да, крупный план коленок , в момент когда человек говорит). Все максимально приближено, с обрезанными кадрами. Ну неужели нельзя посмотреть в экран что в кадр попала часть головы персонала кто снизу и ее просто размазывают, вместо переснятого дубля.',
];

const emotions = [
  'smile',
  'sleeping',
  'puke',
  'angry',
];

const authorsComment = [
  'Ilya Reilly',
  'Tom Ford',
  'Takeshi Kitano',
  'Morgan Freeman',
  'Guli Tuli',
  'Tuti Fruti',
  'Robert Putiatevich',
];

const getComments = () => ({
  id: getRandom(1, 20),
  text: getRandomIndex(COMMENTS),
  emotion: getRandomIndex(emotions),
  author: getRandomIndex(authorsComment),
  commentDate: dayjs().format('YYYY/MM/DD HH:mm'),
});

const getArrayCommentsId = (array) => {
  const arrayCommentsId = [];
  array.forEach((element) => arrayCommentsId.push(element.id));
  return arrayCommentsId;
};

export const generateFilms = () => {
  const actors = new Array(getRandom(2, 6)).fill().map(() => getRandomIndex(arrayActors));
  const writers = new Array(getRandom(1, 3)).fill().map(() => getRandomIndex(arrayWriters));
  const genres = new Array(getRandom(1,2)).fill().map(() => getRandomIndex(arrayGenres));
  const comments = new  Array(getRandom(0, 5)).fill().map(() => getComments());

  return {
    id: getRandom(1, 20),
    poster: getRandomIndex(posters),
    ageRating: getRandom(6,18),
    title: getRandomIndex(titles),
    originalTitle: getRandomIndex(titles),
    rating: getRating(1, 10),
    director: getRandomIndex(directors),
    writers,
    actors,
    releaseDate: getRandomDate('D MMMM YYYY'),
    runtime: getRandomIndex(runtimes),
    releaseCountry: getRandomIndex(countries),
    genres,
    description: getRandomIndex(descriptions),
    comments,
    commentsId: getArrayCommentsId(comments),
    totalComments: comments.length,
    isWatchlist: Boolean(getRandom(0, 1)),
    isHistory: Boolean(getRandom(0, 1)),
    isFavorite: Boolean(getRandom(0, 1)),
  };
};
