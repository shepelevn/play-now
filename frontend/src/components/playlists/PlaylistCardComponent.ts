import Component from '../Component';
import { PLAYLIST_IMAGES } from './playlistImages';
import { getTracksCountString } from '../../utils/getTracksCountString';

export default class PlaylistCardComponent extends Component {
  constructor(
    private readonly id: number,
    private readonly name: string,
    private readonly tracksCount: number,
  ) {
    super();
  }

  public getTemplate(): string {
    const tracksCountString: string = getTracksCountString(this.tracksCount);

    const smallImageSrc =
      PLAYLIST_IMAGES.small[this.id % PLAYLIST_IMAGES.small.length];
    const normalImageSrc =
      PLAYLIST_IMAGES.normal[this.id % PLAYLIST_IMAGES.normal.length];
    const bigImageSrc =
      PLAYLIST_IMAGES.big[this.id % PLAYLIST_IMAGES.big.length];

    return `
      <li class="playlist__item">
        <picture>
          <source srcset="${smallImageSrc}" media="(max-width: 576px)">
          <source srcset="${bigImageSrc}" media="(max-width: 1440px)">
          <img class="playlist__img" src="${normalImageSrc}" alt="Любимые песни">
        </picture>
        <div class="playlist__content">
          <h3 class="playlist__h3"><a class="playlist__h3__link" href="/">${this.name}</a></h3><span class="playlist__count">${tracksCountString}</span>
        </div>
      </li>
    `;
  }

  public addOnClickListener(callback: () => void): void {
    const link: HTMLElement | null = this.getElement().querySelector(
      '.playlist__h3__link',
    );

    if (!link) {
      throw new Error('.playlist__h3__link is not found');
    }

    link.addEventListener('click', (event: Event) => {
      event.preventDefault();

      callback();
    });
  }
}
