import Component from '../Component';
import plural from 'plural-ru';
import { PLAYLIST_IMAGES } from './playlistImages';

export default class PlaylistCardComponent extends Component {
  constructor(
    private name: string,
    private imageId: number,
    private tracksCount: number,
  ) {
    super();
  }

  public getTemplate(): string {
    const tracksCountString: string = plural(
      this.tracksCount,
      '%d трек',
      '%d трека',
      '%d треков',
    );

    const imageSrc = PLAYLIST_IMAGES[this.imageId];

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
}
