import {getRandomInteger, createRandomIdFromRangeGenerator, getRandomArrayElement} from './util.js';

const PHOTO_DESCRIPTIONS = [
  'Шикарный вид',
  'Очень дорого',
  'Зависть',
  'Отпуск мечты',
  'Прошлое лето',
  'Любимое место',
  'Вкуснятина'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.',
  'Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Иван',
  'Артемий',
  'Константин',
  'Юсуф',
  'Виктор',
  'Никита',
  'Анжелика',
  'Ирина'
];

const PHOTOS_COUNT = 25;

const createRandomDescriptionId = createRandomIdFromRangeGenerator(1, 25);
const createRandomPhotoId = createRandomIdFromRangeGenerator(1, 25);
const createRandomCommentId = createRandomIdFromRangeGenerator(1, 1000);

const createComment = () => ({
  id: createRandomCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

const createPhotoDescription = () => ({
  id: createRandomDescriptionId(),
  url: `photos/${createRandomPhotoId()}.jpg`,
  description: getRandomArrayElement(PHOTO_DESCRIPTIONS),
  likes: getRandomInteger(15, 200),
  comments: Array.from({length: getRandomInteger(0, 30)}, createComment),
});

const createArrayOfPhotos = () => Array.from({length: PHOTOS_COUNT}, createPhotoDescription);

export {createArrayOfPhotos};
