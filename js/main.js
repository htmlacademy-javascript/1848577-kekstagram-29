import {createArrayOfPhotos} from './data.js';
import {renderPictures} from './post.js';
import {initBigPicture} from './big-picture.js';
import './form.js';

const arrayOfPhotos = createArrayOfPhotos();

renderPictures(arrayOfPhotos);
initBigPicture(arrayOfPhotos);
