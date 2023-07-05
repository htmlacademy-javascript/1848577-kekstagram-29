const commentsWrapper = document.querySelector('.social__comments');
const commentElement = document.querySelector('.social__comment');

const renderComments = (comments) => {
  const commentsFragment = document.createDocumentFragment();

  comments.forEach(({avatar, name, message}) => {
    const commentClone = commentElement.cloneNode(true);
    commentClone.querySelector('.social__picture').src = avatar;
    commentClone.querySelector('.social__picture').alt = name;
    commentClone.querySelector('.social__text').textContent = message;

    commentsFragment.appendChild(commentClone);
  });
  commentsWrapper.innerHTML = '';
  commentsWrapper.appendChild(commentsFragment);
};

export {renderComments};
