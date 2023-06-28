import {createArrayOfPhotos} from './data.js';

const pictureTemplate = document.querySelector('#picture').content;
const picturesBlock = document.querySelector('.pictures');

const pictures = createArrayOfPhotos();

const picturesFragment = document.createDocumentFragment();

pictures.forEach((picture)=> {
  const pictureElement = pictureTemplate.cloneNode(true);
  const pictureImg = pictureElement.querySelector('.picture__img');
  pictureImg.src = picture.url;
  pictureImg.alt = picture.description;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
  picturesFragment.appendChild(pictureElement);
});

picturesBlock.appendChild(picturesFragment);
