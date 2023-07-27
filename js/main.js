import {renderPictures} from './post.js';
import {initBigPicture} from './big-picture.js';
import {formSubmit} from './form.js';
import {getData} from './api.js';
import {showAlert} from './util.js';
import {renderSortedPosts} from './filters.js';

try {
  const posts = await getData();
  renderPictures(posts);
  renderSortedPosts(posts, initBigPicture);
} catch (err) {
  showAlert(err.message);
}

formSubmit();
