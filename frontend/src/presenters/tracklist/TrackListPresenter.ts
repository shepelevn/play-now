import TrackListComponent from '../../components/trackList/TrackListComponent';
import DropdownService from '../../utils/DropdownService';
import TrackDropdownService from './TrackDropdownService';
import TrackPresenter from './TrackPresenter';

import trackImageSrc from '../../resources/img/tracks (2).jpg';

export type TrackData = {
  number: number;
  imageSrc: string;
  title: string;
  author: string;
  album: string;
  addedDate: Date;
  lengthS: number;
  liked: boolean;
};

export default class TrackListPresenter {
  private trackListComponent: TrackListComponent;
  private tracksData: TrackData[];
  private trackDropdownService;

  constructor(
    private parentElement: HTMLElement,
    private dropdownService: DropdownService,
  ) {
    this.tracksData = [
      {
        number: 1,
        imageSrc: trackImageSrc,
        title: 'song 1',
        author: 'author 1',
        album: 'album 1',
        addedDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
        lengthS: 120,
        liked: false,
      },
      {
        number: 2,
        imageSrc: trackImageSrc,
        title: 'song 2',
        author: 'author 2',
        album: 'album 2',
        addedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        lengthS: 60,
        liked: false,
      },
      {
        number: 3,
        imageSrc: trackImageSrc,
        title: 'song 3',
        author: 'author 3',
        album: 'album 3',
        addedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        lengthS: 195,
        liked: false,
      },
      {
        number: 4,
        imageSrc: trackImageSrc,
        title: 'song 4',
        author: 'author 4',
        album: 'album 4',
        addedDate: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000),
        lengthS: 145,
        liked: false,
      },
      {
        number: 5,
        imageSrc: trackImageSrc,
        title: 'song 4',
        author: 'author 4',
        album: 'album 4',
        addedDate: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000),
        lengthS: 145,
        liked: false,
      },
      {
        number: 6,
        imageSrc: trackImageSrc,
        title: 'song 4',
        author: 'author 4',
        album: 'album 4',
        addedDate: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000),
        lengthS: 145,
        liked: false,
      },
      {
        number: 7,
        imageSrc: trackImageSrc,
        title: 'song 4',
        author: 'author 4',
        album: 'album 4',
        addedDate: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000),
        lengthS: 145,
        liked: false,
      },
      {
        number: 8,
        imageSrc: trackImageSrc,
        title: 'song 4',
        author: 'author 4',
        album: 'album 4',
        addedDate: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000),
        lengthS: 145,
        liked: false,
      },
    ];

    this.trackListComponent = new TrackListComponent();

    this.trackDropdownService = new TrackDropdownService(this.dropdownService);

    this.render();
  }

  private createLikeCallback(index: number) {
    return () => {
      const trackData = this.tracksData[index];

      if (trackData === undefined) {
        throw new Error(`trackData with index: ${index} not found`);
      }

      trackData.liked = !trackData.liked;

      this.tracksData[index] = trackData;

      this.render();
    };
  }

  private createDropdownCallback(index: number) {
    return (event: Event) => {
      event.stopPropagation();

      this.trackDropdownService.openDropdown(index);
    };
  }

  private render() {
    this.trackListComponent.removeElement();
    const trackListElement = this.trackListComponent.getElement();
    this.parentElement.append(trackListElement);

    const trackListUl = document.getElementById('tracks-list');

    if (trackListUl instanceof HTMLElement) {
      for (const trackData of this.tracksData) {
        new TrackPresenter(
          trackListUl,
          trackData,
          this.createLikeCallback(trackData.number - 1),
          this.createDropdownCallback(trackData.number - 1),
        );
      }
    }
  }
}
