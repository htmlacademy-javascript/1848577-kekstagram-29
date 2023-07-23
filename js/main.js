import {renderPictures} from './post.js';
import {initBigPicture} from './big-picture.js';
import {formSubmit} from './form.js';
import {getData} from './api.js';
import {showAlert, debounce} from './util.js';
import {getRandomPosts, getDiscussedPosts} from './filters.js';

const filtersBlock = document.querySelector('.img-filters');
const buttonFIlterDefailt = document.querySelector('#filter-default');
const buttonFIlterRandom = document.querySelector('#filter-random');
const buttonFIlterDiscussed = document.querySelector('#filter-discussed');

try {
  const posts = await getData();
  renderPictures(posts);
  const debouncedRenderPictures = () => debounce(renderPictures(posts));
  filtersBlock.classList.remove('img-filters--inactive');

  const onDefaultButtonClick = () => {
    filtersBlock
      .querySelector('.img-filters__button--active')
      .classList.remove('img-filters__button--active');
    buttonFIlterDefailt.classList.add('img-filters__button--active');
    debouncedRenderPictures();
  };
  const onRandomButtonClick = () => {
    filtersBlock
      .querySelector('.img-filters__button--active')
      .classList.remove('img-filters__button--active');
    buttonFIlterRandom.classList.add('img-filters__button--active');
    getRandomPosts(posts, renderPictures);
  };
  const onDiscussedButtonClick = () => {
    filtersBlock
      .querySelector('.img-filters__button--active')
      .classList.remove('img-filters__button--active');
    buttonFIlterDiscussed.classList.add('img-filters__button--active');
    getDiscussedPosts(posts, renderPictures);
  };

  buttonFIlterDefailt.addEventListener('click', onDefaultButtonClick);
  buttonFIlterRandom.addEventListener('click', onRandomButtonClick);
  buttonFIlterDiscussed.addEventListener('click', onDiscussedButtonClick);
  initBigPicture(posts);
} catch (err) {
  showAlert(err.message);
}

formSubmit();
