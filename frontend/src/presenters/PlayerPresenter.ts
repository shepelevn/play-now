import PlayerComponent from '../components/player/PlayerComponent';
import { TrackData } from './TrackListPresenter';

import trackImageSrc from '../resources/img/tracks (2).jpg';

export default class PlayerPresenter {
  private searchComponent: PlayerComponent;

  constructor(private parentElement: HTMLElement) {
    const trackData: TrackData = {
      number: 1,
      title: 'song 1',
      imageSrc: trackImageSrc,
      author: 'author 1',
      album: 'album 1',
      lengthS: 61,
      addedDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    };

    this.searchComponent = new PlayerComponent(trackData);

    this.parentElement.append(this.searchComponent.getElement());
  }
}
