// import {createArrayOfPhotos} from './data.js';
import {renderPictures} from './post.js';
import {initBigPicture} from './big-picture.js';
import {formSubmit} from './form.js';
import {getData} from './api.js';

// const arrayOfPhotos = createArrayOfPhotos();

try {
  const posts = await getData();
  renderPictures(posts);
  initBigPicture(posts)
} catch (err) {
  console.log(err.message);
}

formSubmit();
// renderPictures(arrayOfPhotos);
// initBigPicture(arrayOfPhotos);
