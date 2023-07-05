import {createArrayOfPhotos} from './data.js';
import {renderPictures} from './post.js';
import {showBigPicture} from './big-picture.js';

const arrayOfPhotos = createArrayOfPhotos();
renderPictures(arrayOfPhotos);
showBigPicture(arrayOfPhotos);
