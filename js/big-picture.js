import {isEscapeKey} from './util.js';
// import {renderComments, commentsLoader, commentsShown} from './comments.js';

const RENDERED_COMMENTS = 5;

const picturesContainer = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const bigPictureCancel = document.querySelector('.big-picture__cancel');
const body = document.querySelector('body');
const commentsWrapper = document.querySelector('.social__comments');
const commentElement = document.querySelector('.social__comment');
const commentsLoader = document.querySelector('.comments-loader');
const socialCommentCount = document.querySelector('.social__comment-count');
const commentsCount = socialCommentCount.querySelector('.comments-count');
const commentsLoaded = socialCommentCount.querySelector('.comments-loaded');
let commentsShown = 0;
let commentsArray = [];

const createComment = ({avatar, name, message}) => {
  const commentClone = commentElement.cloneNode(true);

  commentClone.querySelector('.social__picture').src = avatar;
  commentClone.querySelector('.social__picture').alt = name;
  commentClone.querySelector('.social__text').textContent = message;

  return commentClone;
};

const renderComments = () => {
  commentsShown += RENDERED_COMMENTS;

  if (commentsShown >= commentsArray.length) {
    commentsLoader.classList.add('hidden');
    commentsShown = commentsArray.length;
  } else {
    commentsLoader.classList.remove('hidden');
  }

  const commentsFragment = document.createDocumentFragment();

  for (let i = 0; i < commentsShown; i++) {
    const comment = createComment(commentsArray[i]);
    commentsFragment.append(comment);
  }

  commentsWrapper.innerHTML = '';
  commentsWrapper.appendChild(commentsFragment);
  commentsLoaded.textContent = commentsShown;
  commentsCount.textContent = commentsArray.length;
};

const onRenderComments = () => renderComments();

const renderBigPicture = ({url, likes, description}) => {
  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.big-picture__img img').alt = description;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.social__caption').textContent = description;
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('keydown', onDocumentKeydown);
  commentsLoader.removeEventListener('click', onRenderComments);
  commentsShown = 0;
};

const onCloseBigPicture = () => closeBigPicture();

const openBigPicture = () => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  bigPictureCancel.addEventListener('click', onCloseBigPicture);
  document.addEventListener('keydown', onDocumentKeydown);
  commentsLoader.addEventListener('click', onRenderComments);
};

const initBigPicture = (photos) => {
  picturesContainer.addEventListener('click', (evt) => {
    if (evt.target.closest('.picture')) {
      openBigPicture();
      const photoId = Number(evt.target.closest('.picture').id);
      const clickedPicture = photos.find((photo) => photo.id === photoId);

      renderBigPicture(clickedPicture);
      commentsArray = clickedPicture.comments;
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
