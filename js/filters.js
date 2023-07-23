import {createRandomIdFromRangeGenerator, debounce} from './util.js';

const RANDOM_PHOTOS_COUNT = 10;

// const buttonFIlterDefailt = document.querySelector('#filter-default');
// const buttonFIlterRandom = document.querySelector('#filter-random');
// const buttonFIlterDiscussed = document.querySelector('#filter-discussed');

const getRandomPosts = (posts, render) => {
  const getRandomId = createRandomIdFromRangeGenerator(0, posts.length - 1);
  const randomIdArray = Array.from({length: RANDOM_PHOTOS_COUNT}, getRandomId);
  const randomPosts = posts.filter((post) => {
    const id = post.id;
    return randomIdArray.some((element) => element === id);
  });
  debounce(render(randomPosts));
};

const compareCommentsCount = (postA, postB) =>
  postB.comments.length - postA.comments.length;

const getDiscussedPosts = (posts, render) => {
  const discussedPosts = posts.slice();
  discussedPosts.sort(compareCommentsCount);
  debounce(render(discussedPosts));
};

export {getRandomPosts, getDiscussedPosts};
