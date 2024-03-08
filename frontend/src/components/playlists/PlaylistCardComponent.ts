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

    const imageSrc = PLAYLIST_IMAGES[this.id % PLAYLIST_IMAGES.length];

    // TODO: Add high quality picture srcset links
    return `
      <li class="playlist__item">
        <picture>
          <source srcset="${imageSrc}" media="(max-width: 576px)">
          <source srcset="${imageSrc}" media="(max-width: 1440px)"><img class="playlist__img" src="${imageSrc}" alt="Любимые песни">
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
