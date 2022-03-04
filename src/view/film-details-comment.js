import AbstractView from './abstract';
import { getFormatDate } from '../utils/common';

const createFilmDetailsCommentTpl = (comment) => {
  const {id, text, emotion, author, commentDate} = comment;

  const date = getFormatDate(commentDate, 'YYYY/MM/DD HH:mm');

  return `<li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
    </span>
    <div>
      <p class="film-details__comment-text">${text}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${author}</span>
        <span class="film-details__comment-day">${date}</span>
        <button class="film-details__comment-delete" data-id="${id}">Delete</button>
      </p>
    </div>
    </li>`;
};

export default class FilmDetailsComment extends AbstractView {
  constructor(comment) {
    super();
    this.comment = comment;

    this._commentDeleteClickHandler = this._commentDeleteClickHandler.bind(this);
  }

  getTemplate() {
    return createFilmDetailsCommentTpl(this.comment);
  }

  _commentDeleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.commentDeleteClick(evt.target.dataset.id);
  }

  setCommentDeleteClickHandler(callback) {
    this._callback.commentDeleteClick = callback;
    this.getElement().querySelector('.film-details__comment-delete').addEventListener('click', this._commentDeleteClickHandler);
  }
}
