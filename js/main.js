import {renderPictures} from './post.js';
import {initBigPicture} from './big-picture.js';
import {formSubmit} from './form.js';
import {getData} from './api.js';
import { showAlert } from './util.js';

try {
  const posts = await getData();
  renderPictures(posts);
  initBigPicture(posts);
} catch (err) {
  showAlert(err.message);
}

formSubmit();
