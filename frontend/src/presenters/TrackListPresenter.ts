import TrackListComponent from '../components/trackList/TrackListComponent';

import trackImageSrc from '../resources/img/tracks (2).jpg';

export type TrackData = {
  number: number;
  imageSrc: string;
  title: string;
  author: string;
  album: string;
  addedDate: Date;
  lengthS: number;
};

export default class TrackListPresenter {
  constructor(private parentElement: HTMLElement) {
    const tracksData: TrackData[] = [
      {
        number: 1,
        imageSrc: trackImageSrc,
        title: 'song 1',
        author: 'author 1',
        album: 'album 1',
        addedDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
        lengthS: 120,
      },
      {
        number: 2,
        imageSrc: trackImageSrc,
        title: 'song 2',
        author: 'author 2',
        album: 'album 2',
        addedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        lengthS: 60,
      },
      {
        number: 3,
        imageSrc: trackImageSrc,
        title: 'song 3',
        author: 'author 3',
        album: 'album 3',
        addedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        lengthS: 195,
      },
      {
        number: 4,
        imageSrc: trackImageSrc,
        title: 'song 4',
        author: 'author 4',
        album: 'album 4',
        addedDate: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000),
        lengthS: 145,
      },
      {
        number: 4,
        imageSrc: trackImageSrc,
        title: 'song 4',
        author: 'author 4',
        album: 'album 4',
        addedDate: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000),
        lengthS: 145,
      },
      {
        number: 4,
        imageSrc: trackImageSrc,
        title: 'song 4',
        author: 'author 4',
        album: 'album 4',
        addedDate: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000),
        lengthS: 145,
      },
      {
        number: 4,
        imageSrc: trackImageSrc,
        title: 'song 4',
        author: 'author 4',
        album: 'album 4',
        addedDate: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000),
        lengthS: 145,
      },
      {
        number: 4,
        imageSrc: trackImageSrc,
        title: 'song 4',
        author: 'author 4',
        album: 'album 4',
        addedDate: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000),
        lengthS: 145,
      },
    ];

    this.parentElement.append(new TrackListComponent(tracksData).getElement());
  }
}
