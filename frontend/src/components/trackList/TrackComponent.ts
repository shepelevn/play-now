import TimeAgo from 'javascript-time-ago';
import { getTimeString } from '../../utils/getTimeString';
import Component from '../Component';

import HeartSvg from '../../resources/svg/heart.sprite.svg';
import { renderSvgSprite } from '../../render/renderSvgSprite';
import { TrackDataWithIndex } from '../../types/TracksDataWithIndex';
import { isTrackLiked } from '../../utils/isTrackLiked';

export default class TrackComponent extends Component {
  private readonly createdAt: Date;
  private readonly liked: boolean;

  constructor(private readonly trackData: TrackDataWithIndex) {
    super();

    this.createdAt = new Date(trackData.createdAt);
    this.liked = isTrackLiked(trackData);
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
      <li class="tracks__item flex" id="track-item-${this.trackData.id}">
        <div class="tracks__item__number">${this.trackData.index + 1}</div>
        <div class="tracks__item__name"><img class="track__img" src="${this.trackData.image}" alt="${this.trackData.album.name}">
          <div class="track__content">
            <h3 class="track__name"><a class="track__name__link" href="#">${this.trackData.name}</a></h3><span class="track__author">${this.trackData.artist.name}</span>
          </div>
        </div>
        <div class="tracks__item__albom">${this.trackData.album.name}</div>
        <div class="tracks__item__data flex"><span class="data__text">${timeAgo.format(this.createdAt)}</span>
          <button class="track__like-btn ${this.liked ? 'like-btn--active' : ''}">

          ${renderSvgSprite(HeartSvg.url, 'track__like-icon')}

          </button>
        </div>
        <time class="tracks__item__time">${getTimeString(this.trackData.duration)}</time>
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
