import {createRandomIdFromRangeGenerator, debounce} from './util.js';
import {renderPictures} from './post.js';

const RANDOM_PHOTOS_COUNT = 10;
const FILTERS_DELAY = 500;
const filtersBlock = document.querySelector('.img-filters');

const debouncedRender = debounce(renderPictures, FILTERS_DELAY);

const getDefaultPosts = (posts) =>posts;

const getRandomPosts = (posts) => {
  const getRandomId = createRandomIdFromRangeGenerator(0, posts.length - 1);
  const randomIdArray = Array.from({length: RANDOM_PHOTOS_COUNT}, getRandomId);
  const randomPosts = posts.filter((post) => {
    const id = post.id;
    return randomIdArray.some((element) => element === id);
  });
  return randomPosts;
};

const compareCommentsCount = (postA, postB) =>
  postB.comments.length - postA.comments.length;

const getDiscussedPosts = (posts) => {
  const discussedPosts = posts.slice();
  return discussedPosts.sort(compareCommentsCount);
};

const SortOptions = {
  'filter-default': getDefaultPosts,
  'filter-random': getRandomPosts,
  'filter-discussed': getDiscussedPosts,
};

const renderSortedPosts = (posts, init) => {
  filtersBlock.classList.remove('img-filters--inactive');

  filtersBlock.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('img-filters__button')) {
      filtersBlock
        .querySelector('.img-filters__button--active')
        .classList.remove('img-filters__button--active');
      evt.target.classList.add('img-filters__button--active');
      const sortPosts = SortOptions[evt.target.id](posts);
      debouncedRender(sortPosts);
    }
  });
  init(posts);
};

export {renderSortedPosts};
