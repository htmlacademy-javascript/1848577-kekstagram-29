import {isEscapeKey, CONSTS} from './util.js';

const RENDERED_COMMENTS = 5;

const picturesContainerElement = document.querySelector('.pictures');
const bigPictureElement = document.querySelector('.big-picture');
const bigPictureCancelElement = document.querySelector('.big-picture__cancel');
const commentsWrapperElement = document.querySelector('.social__comments');
const commentElement = document.querySelector('.social__comment');
const commentsLoaderElement = document.querySelector('.comments-loader');
const socialCommentCountElement = document.querySelector('.social__comment-count');
const commentsCountElement = socialCommentCountElement.querySelector('.comments-count');
const commentsLoadedElement = socialCommentCountElement.querySelector('.comments-loaded');
let commentsShown = 0;
let comments = [];

const createComment = ({avatar, name, message}) => {
  const commentClone = commentElement.cloneNode(true);

  commentClone.querySelector('.social__picture').src = avatar;
  commentClone.querySelector('.social__picture').alt = name;
  commentClone.querySelector('.social__text').textContent = message;

  return commentClone;
};

const renderComments = () => {
  commentsShown += RENDERED_COMMENTS;

  if (commentsShown >= comments.length) {
    commentsLoaderElement.classList.add('hidden');
    commentsShown = comments.length;
  } else {
    commentsLoaderElement.classList.remove('hidden');
  }

  const commentsFragment = document.createDocumentFragment();

  for (let i = 0; i < commentsShown; i++) {
    const comment = createComment(comments[i]);
    commentsFragment.append(comment);
  }

  commentsWrapperElement.innerHTML = '';
  commentsWrapperElement.appendChild(commentsFragment);
  commentsLoadedElement.textContent = commentsShown;
  commentsCountElement.textContent = comments.length;
};

const onCommentsClick = () => renderComments();

const renderBigPicture = ({url, likes, description}) => {
  bigPictureElement.querySelector('.big-picture__img img').src = url;
  bigPictureElement.querySelector('.big-picture__img img').alt = description;
  bigPictureElement.querySelector('.likes-count').textContent = likes;
  bigPictureElement.querySelector('.social__caption').textContent = description;
};

const closeBigPicture = () => {
  bigPictureElement.classList.add('hidden');
  CONSTS.BODY.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('keydown', onDocumentKeydown);
  commentsLoaderElement.removeEventListener('click', onCommentsClick);
  commentsShown = 0;
};

const onBigPictureClick = () => closeBigPicture();

const openBigPicture = () => {
  bigPictureElement.classList.remove('hidden');
  CONSTS.BODY.classList.add('modal-open');

  bigPictureCancelElement.addEventListener('click', onBigPictureClick);
  document.addEventListener('keydown', onDocumentKeydown);
  commentsLoaderElement.addEventListener('click', onCommentsClick);
};

const initBigPicture = (photos) => {
  picturesContainerElement.addEventListener('click', (evt) => {
    if (evt.target.closest('.picture')) {
      openBigPicture();
      const photoId = Number(evt.target.closest('.picture').id);
      const clickedPicture = photos.find((photo) => photo.id === photoId);

      renderBigPicture(clickedPicture);
      comments = clickedPicture.comments;
      renderComments();
    }
  });
};

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}


export {initBigPicture};
