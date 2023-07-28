import {isEscapeKey, CONSTS} from './util.js';
import {removeEffects, resetScale} from './effects.js';
import {sendData} from './api.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const MAX_HASHTAG_COUNT = 5;
const MAX_HASHTAG_LENGTH = 20;
const VALID_HASHTAG_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;

const imgUploadInputElement = document.querySelector('.img-upload__input');
const imgUploadPreviewElement = document.querySelector('.img-upload__preview').querySelector('img');
const imgUploadOverlayElement = document.querySelector('.img-upload__overlay');
const imgUploadCancelElement = document.querySelector('.img-upload__cancel');
const imgUploadFormElement = document.querySelector('.img-upload__form');
const submitButtonElement = document.querySelector('.img-upload__submit');
const hashtagsFieldElement = document.querySelector('.text__hashtags');
const commentFieldElement = document.querySelector('.text__description');
const effectsPreviewsElement = document.querySelectorAll('.effects__preview');

let isMessageOpen = false;

const pristine = new Pristine(imgUploadFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

const OnUploadOverlayOpen = () => {
  imgUploadOverlayElement.classList.remove('hidden');
  const file = imgUploadInputElement.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    imgUploadPreviewElement.src = URL.createObjectURL(file);
    effectsPreviewsElement.forEach((preview) => {
      preview.style.backgroundImage = `url('${imgUploadPreviewElement.src}')`;
    });
  }
  removeEffects();
  CONSTS.BODY.classList.add('modal-open');
  imgUploadCancelElement.addEventListener('click', onUploadCancel);
  document.addEventListener('keydown', onDocumentKeydown);
};

function onUploadCancel () {
  imgUploadFormElement.reset();
  pristine.reset();
  imgUploadOverlayElement.classList.add('hidden');
  CONSTS.BODY.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

const isTextFieldFocused = () => document.activeElement === hashtagsFieldElement || document.activeElement === commentFieldElement;

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt) && !isTextFieldFocused() && !isMessageOpen) {
    evt.preventDefault();
    onUploadCancel();
  }
}

const normalizeHashags = (tagString) => tagString.trim().split(' ').filter((tag) => Boolean(tag.length));

const hasValidLength = (value) => normalizeHashags(value).every((hashtag) => hashtag.length <= MAX_HASHTAG_LENGTH);

const hasValidCount = (value) => normalizeHashags(value).length <= MAX_HASHTAG_COUNT;

const hasValidSymbols = (value) => normalizeHashags(value).every((hashtag) => VALID_HASHTAG_SYMBOLS.test(hashtag));

const hasUniqueTags = (value) => {
  const lowerCaseHashtags = normalizeHashags(value).map ((hashtag) => hashtag.toLowerCase());
  return lowerCaseHashtags.length === new Set(lowerCaseHashtags).size;
};

pristine.addValidator(hashtagsFieldElement, hasValidLength, `Максимальная длина одного хэш-тега ${MAX_HASHTAG_LENGTH} символов, включая решётку`, 4, true);
pristine.addValidator(hashtagsFieldElement, hasValidCount, `Нельзя указать больше ${MAX_HASHTAG_COUNT} хэш-тегов`, 3, true);
pristine.addValidator(hashtagsFieldElement, hasValidSymbols, 'Недопустимый хэш-тег', 2, true);
pristine.addValidator(hashtagsFieldElement, hasUniqueTags, 'Один и тот же хэш-тег не может быть использован дважды', 1, true);

imgUploadInputElement.addEventListener('change', OnUploadOverlayOpen);

const blockSubmitButton = () => {
  submitButtonElement.disabled = true;
};

const unblockSubmitButton = () => {
  submitButtonElement.disabled = false;
};

const successMessageTemplateElement = document.querySelector('#success').content.querySelector('.success');
const successMessage = successMessageTemplateElement.cloneNode(true);

const errorMessageTemplateElement = document.querySelector('#error').content.querySelector('.error');
const errorMessage = errorMessageTemplateElement.cloneNode(true);

const closeMessage = () => {
  const messageElement = document.querySelector('.error') || document.querySelector('.success');
  messageElement.remove();
  document.removeEventListener('keydown', onDocumentMessageKeydown);
  CONSTS.BODY.removeEventListener('click', onBodyClick);
  isMessageOpen = false;
};
const onClickButtonClose = () => closeMessage();

function onBodyClick(evt) {
  if (evt.target.closest('.error__inner') || evt.target.closest('.success__inner')) {
    return;
  }
  closeMessage();
}

function onDocumentMessageKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeMessage();
  }
}

const createMessage = (messageElement, closeButtonClick, reset = false) => {
  if (reset) {
    imgUploadFormElement.reset();
    pristine.reset();
    removeEffects();
    resetScale();
  }
  isMessageOpen = true;
  CONSTS.BODY.append(messageElement);
  document.addEventListener('keydown', onDocumentMessageKeydown);
  CONSTS.BODY.addEventListener('click', onBodyClick);
  messageElement.querySelector(closeButtonClick).addEventListener('click', onClickButtonClose);
};

const showMessageSuccess = () => createMessage(successMessage, '.success__button', true);
const showMessageError = () => createMessage(errorMessage, '.error__button');

const formSubmit = () => {
  imgUploadFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(showMessageSuccess)
        .then(onUploadCancel)
        .catch(showMessageError)
        .finally(unblockSubmitButton);
    }
  });
};

export {formSubmit};
