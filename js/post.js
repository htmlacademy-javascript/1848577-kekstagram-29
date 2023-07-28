const pictureTemplateElement = document.querySelector('#picture').content;
const containerElement = document.querySelector('.pictures');

const createPictures = ({ url, description, likes, comments, id }) => {
  const pictureElement = pictureTemplateElement.cloneNode(true);
  const pictureImgElement = pictureElement.querySelector('.picture__img');

  pictureImgElement.src = url;
  pictureImgElement.alt = description;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  pictureElement.querySelector('.picture').id = id;

  return pictureElement;
};

const renderPictures = (pictures) => {
  containerElement.querySelectorAll('.picture').forEach((element) => element.remove());
  const picturesFragment = document.createDocumentFragment();

  pictures.forEach((picture) => {
    picturesFragment.append(createPictures(picture));
  });

  containerElement.appendChild(picturesFragment);
};

export {renderPictures};
