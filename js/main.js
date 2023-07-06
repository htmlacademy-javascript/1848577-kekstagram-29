import {createArrayOfPhotos} from './data.js';
import {renderPictures} from './post.js';
import {initBigPicture} from './big-picture.js';

const arrayOfPhotos = createArrayOfPhotos();

renderPictures(arrayOfPhotos);
initBigPicture(arrayOfPhotos);
