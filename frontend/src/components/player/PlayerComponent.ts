import { PlayerStatus } from '../../types/PlayerStatus';
import { TrackData } from '../../types/TrackData';
import { getTimeString } from '../../utils/getTimeString';
import Component from '../Component';
import { renderSvgSprite } from '../../render/renderSvgSprite';

import playSprite from '../../resources/svg/player-play.sprite.svg';
import stopSprite from '../../resources/svg/stop.sprite.svg';
import heartSprite from '../../resources/svg/heart.sprite.svg';
import shuffleSprite from '../../resources/svg/shuffle.sprite.svg';
import skipBackSprite from '../../resources/svg/skip-back.sprite.svg';
import repeatSprite from '../../resources/svg/repeat.sprite.svg';
import volumeSprite from '../../resources/svg/volume.sprite.svg';

export default class PlayerComponent extends Component {
  constructor(
    private readonly trackData: TrackData,
    private readonly status: PlayerStatus,
    private readonly shuffle: boolean,
    private readonly repeat: boolean,
  ) {
    super();
  }

  public getTemplate(): string {
    const centerButtonTemplate: string = this.getCenterButtonTemplate(
      this.status,
    );

    return `
      <footer class="footer">
        <div class="player flex">
          <div class="player__track-name flex"><img class="player__track__img" src="${this.trackData.image}" alt="${this.trackData.name} - ${this.trackData.artist.name}">
            <div class="player__track-name__content">
              <div class="flex player__name__header">
                <h3 class="player__track__h3">${this.trackData.name}</h3>
                <button class="player__track__like">
                  ${renderSvgSprite(heartSprite.url, 'player__track__like-svg')}
                </button>
              </div>
              <p class="player__track__author">${this.trackData.artist.name}</p>
            </div>
          </div>
          <div class="player__controls">
            <div class="player__controls__header">
              <button class="player__shuffle-btn" id="player-shuffle">
                ${renderSvgSprite(shuffleSprite.url, 'player__shuffle-svg player__svg ' + (this.shuffle ? 'player__svg_active' : ''))}
              </button>
              <button class="player__skipback-btn player__command-btn" id="player-previous">
                ${renderSvgSprite(skipBackSprite.url, 'player__skipback-svg')}
              </button>
                ${centerButtonTemplate}
              <button class="player__skipnext-btn player__command-btn" id="player-next">
                ${renderSvgSprite(skipBackSprite.url, 'player__skipnext-svg')}
              </button>
              <button class="player__repeat-btn" id="player-repeat">
                ${renderSvgSprite(repeatSprite.url, 'player__repeat-svg player__svg ' + (this.repeat ? 'player__svg_active' : ''))}
              </button>
            </div>
            <div class="player__controls__footer"> <span class="player__time-start" id="player-time">0:00</span>
              <div class="player__range-play" id="range-play"></div><span class="player__time-end">${getTimeString(this.trackData.duration)}</span>
            </div>
          </div>
          <div class="player__volume">
            ${renderSvgSprite(volumeSprite.url, 'player__volume-svg')}
            <div class="player__volume-range" id="range-volume"></div>
          </div>
        </div>
      </footer>
    `;
  }

  public addOnPlayListener(callback: () => void): void {
    const playButton: HTMLElement | null =
      document.getElementById('player-play');

    if (playButton) {
      playButton.addEventListener('click', callback);
    }
  }

  public addOnStopListener(callback: () => void): void {
    const stopButton: HTMLElement | null =
      document.getElementById('player-stop');

    if (stopButton) {
      stopButton.addEventListener('click', callback);
    }
  }

  public addOnNextListener(callback: () => void): void {
    const nextButton: HTMLElement | null =
      document.getElementById('player-next');

    if (!nextButton) {
      throw new Error('Button with id: player-next is not found');
    }

    nextButton.addEventListener('click', callback);
  }

  public addOnPreviousListener(callback: () => void): void {
    const previousButton: HTMLElement | null =
      document.getElementById('player-previous');

    if (!previousButton) {
      throw new Error('Button with id: player-previous is not found');
    }

    previousButton.addEventListener('click', callback);
  }

  public addOnShuffleListener(callback: () => void): void {
    const shuffleButton: HTMLElement | null =
      document.getElementById('player-shuffle');

    if (!shuffleButton) {
      throw new Error('Button with id: player-shuffle is not found');
    }

    shuffleButton.addEventListener('click', callback);
  }

  public addOnRepeatListener(callback: () => void): void {
    const repeatButton: HTMLElement | null =
      document.getElementById('player-repeat');

    if (!repeatButton) {
      throw new Error('Button with id: player-repeat is not found');
    }

    repeatButton.addEventListener('click', callback);
  }

  private getCenterButtonTemplate(status: PlayerStatus): string {
    return status === PlayerStatus.Stopped
      ? `
      <button class="player__play-btn player__command-btn" id="player-play">
        ${renderSvgSprite(playSprite.url, 'player__play-svg')}
      </button>
    `
      : `
      <button class="player__play-btn player__command-btn" id="player-stop">
        ${renderSvgSprite(stopSprite.url, 'player__play-svg')}
      </button>
      `;
  }
}
