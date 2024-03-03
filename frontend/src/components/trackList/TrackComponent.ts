import TimeAgo from 'javascript-time-ago';
import { getTimeString } from '../../utils/getTimeString';
import Component from '../Component';

import HeartSvg from '../../resources/svg/heart.sprite.svg';
import { renderSvgSprite } from '../../render/renderSvgSprite';

export default class TrackComponent extends Component {
  constructor(
    private number: number,
    private imageSrc: string,
    private title: string,
    private author: string,
    private album: string,
    private addedDate: Date,
    private lengthS: number,
    private liked: boolean,
  ) {
    super();
  }

  public addOnLikeListener(callback: () => void): void {
    const likeButton = this.getElement().querySelector('.track__like-btn');

    if (!(likeButton instanceof HTMLButtonElement)) {
      throw new TypeError('track__like-btn is not button');
    }

    likeButton.addEventListener('click', callback);
  }

  public addOnDropdownListener(callback: (event: Event) => void): void {
    const dropdownButton = this.getElement().querySelector(
      '.track__btn-dropdown',
    );

    if (!(dropdownButton instanceof HTMLButtonElement)) {
      throw new TypeError('track__btn-dropdown is not button');
    }

    dropdownButton.addEventListener('click', callback);
  }

  public getTemplate(): string {
    const timeAgo: TimeAgo = new TimeAgo('ru-RU');

    return `
      <li class="tracks__item flex" id="track-item-${this.number - 1}">
        <div class="tracks__item__number">${this.number}</div>
        <div class="tracks__item__name"><img class="track__img" src="${this.imageSrc}" alt="${this.album}">
          <div class="track__content">
            <h3 class="track__name"><a class="track__name__link" href="#">${this.title}</a></h3><span class="track__author">${this.author}</span>
          </div>
        </div>
        <div class="tracks__item__albom">${this.album}</div>
        <div class="tracks__item__data flex"><span class="data__text">${timeAgo.format(this.addedDate)}</span>
          <button class="track__like-btn ${this.liked ? 'like-btn--active' : ''}">

          ${renderSvgSprite(HeartSvg.url, 'track__like-icon')}

          </button>
        </div>
        <time class="tracks__item__time">${getTimeString(this.lengthS)}</time>
        <div class="tracks__item__drop">
          <button class="track__btn-dropdown"><svg width="23" height="4" viewBox="0 0 23 4" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="2" cy="2" r="2" fill="#C4C4C4"/>
      <circle cx="11.5" cy="2" r="2" fill="#C4C4C4"/>
      <circle cx="21" cy="2" r="2" fill="#C4C4C4"/>
      </svg>
          </button>
        </div>
      </li>
    `;
  }
}
