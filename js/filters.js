import {createRandomIdFromRangeGenerator, debounce} from './util.js';

const RANDOM_PHOTOS_COUNT = 10;
const filtersBlock = document.querySelector('.img-filters');

const getDefaultPosts = (posts, render) => {
  render(posts);
};

const getRandomPosts = (posts, render) => {
  const getRandomId = createRandomIdFromRangeGenerator(0, posts.length - 1);
  const randomIdArray = Array.from({length: RANDOM_PHOTOS_COUNT}, getRandomId);
  const randomPosts = posts.filter((post) => {
    const id = post.id;
    return randomIdArray.some((element) => element === id);
  });
  render(randomPosts);
};

const compareCommentsCount = (postA, postB) =>
  postB.comments.length - postA.comments.length;

const getDiscussedPosts = (posts, render) => {
  const discussedPosts = posts.slice();
  discussedPosts.sort(compareCommentsCount);
  render(discussedPosts);
};

const SortOptions = {
  'filter-default': getDefaultPosts,
  'filter-random': getRandomPosts,
  'filter-discussed': getDiscussedPosts,
};

const renderSortedPosts = (posts, render, init) => {
  filtersBlock.classList.remove('img-filters--inactive');

  filtersBlock.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('img-filters__button')) {
      filtersBlock
        .querySelector('.img-filters__button--active')
        .classList.remove('img-filters__button--active');
      evt.target.classList.add('img-filters__button--active');
      debounce(SortOptions[evt.target.id](posts, render));
    }
  });
  init(posts);
};

export {renderSortedPosts};
