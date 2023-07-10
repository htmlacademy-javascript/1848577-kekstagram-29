import {isEscapeKey} from './util.js';

const imgUploadInput = document.querySelector('.img-upload__input');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadCancel = document.querySelector('.img-upload__cancel');
const body = document.querySelector('body');
const imgUploadForm = document.querySelector('.img-upload__form');
const successTemplate = document.querySelector('#success').content;
const errorTemplate = document.querySelector('#error').content;

const successMessage = successTemplate.cloneNode(true);
const errorMessage = errorTemplate.cloneNode(true);

const onSuccessMessageClose = () => {
  successMessage.remove();
};

const renderSuccessMessage = () => {
  const successButton = successMessage.querySelector('.success__button');

  body.append(successMessage);
  successButton.addEventListener('click', onSuccessMessageClose);
  document.addEventListener('keydown', onDocumentKeydownSuccessMessage);
};

const onErrorMessageClose = () => {
  errorMessage.remove();
};

const renderErrorMessage = () => {
  const errorButton = errorMessage.querySelector('.error__button');

  body.append(errorMessage);
  errorButton.addEventListener('click', onErrorMessageClose);
  document.addEventListener('keydown', onDocumentKeydownSuccessMessage);
};

const OnUploadOverlayOpen = () => {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  imgUploadCancel.addEventListener('click', onUploadCancel);
  document.addEventListener('keydown', onDocumentKeydown);
};

function onUploadCancel () {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  imgUploadInput.removeEventListener('change', OnUploadOverlayOpen);
}

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onUploadCancel();
  }
}

function onDocumentKeydownSuccessMessage (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onSuccessMessageClose();
  }
}

imgUploadInput.addEventListener('change', OnUploadOverlayOpen);

const pristine = new Pristine(imgUploadForm);

const validateComment = (value) => value.length <= 140;


pristine.addValidator(imgUploadForm.querySelector('.text__hashtags'));
pristine.addValidator(imgUploadForm.querySelector('.text__description'), validateComment, 'длина менее 140 символов');

imgUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    renderSuccessMessage();
  } else {
    renderErrorMessage();
  }
});
