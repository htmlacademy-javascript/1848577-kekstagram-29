const pictureTemplate = document.querySelector('#picture').content;
const container = document.querySelector('.pictures');

const createPictures = ({ url, description, likes, comments, id }) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  const pictureImg = pictureElement.querySelector('.picture__img');

  pictureImg.src = url;
  pictureImg.alt = description;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  pictureElement.querySelector('.picture').id = id;

  return pictureElement;
};

const renderPictures = (pictures) => {
  const picturesFragment = document.createDocumentFragment();

  pictures.forEach((picture) => {
    picturesFragment.append(createPictures(picture));
  });

  container.appendChild(picturesFragment);
};

export {renderPictures};
