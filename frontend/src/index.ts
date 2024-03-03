import TimeAgo from 'javascript-time-ago';
import ru from 'javascript-time-ago/locale/ru';
import { createRootElement } from './createRootElement';
import HeaderPresenter from './presenters/header/HeaderPresenter';
import SidebarPresenter from './presenters/sidebar/SidebarPresenter';
import TrackListPresenter from './presenters/tracklist/TrackListPresenter';
import PlayerPresenter from './presenters/player/PlayerPresenter';
import { createAndAppendElement } from './utils/createAndAppendElement';
import DropdownService from './utils/DropdownService';

import './resources/css/style.css';
import trackImageSrc from './resources/img/tracks (2).jpg';
import Tracks from './model/Tracks';
import { TrackData } from './types/TrackData';

TimeAgo.addDefaultLocale(ru);

const dropdownService = new DropdownService();

// TODO: Move to main presenter maybe
const rootElement: HTMLElement = createRootElement();

new HeaderPresenter(rootElement);

const contentWrapElement: HTMLElement = createAndAppendElement(
  rootElement,
  '<div class="content-wrap flex"></div>',
);

new SidebarPresenter(contentWrapElement);

const mainElement = createAndAppendElement(
  contentWrapElement,
  '<main class="main"> </main>',
);

const tracksData: TrackData[] = [
  {
    id: 0,
    imageSrc: trackImageSrc,
    title: 'song 1',
    author: 'author 1',
    album: 'album 1',
    addedDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    lengthS: 120,
    liked: false,
  },
  {
    id: 0,
    imageSrc: trackImageSrc,
    title: 'song 2',
    author: 'author 2',
    album: 'album 2',
    addedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    lengthS: 60,
    liked: false,
  },
  {
    id: 0,
    imageSrc: trackImageSrc,
    title: 'song 3',
    author: 'author 3',
    album: 'album 3',
    addedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    lengthS: 195,
    liked: false,
  },
  {
    id: 0,
    imageSrc: trackImageSrc,
    title: 'song 4',
    author: 'author 4',
    album: 'album 4',
    addedDate: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000),
    lengthS: 145,
    liked: false,
  },
  {
    id: 0,
    imageSrc: trackImageSrc,
    title: 'song 5',
    author: 'author 5',
    album: 'album 5',
    addedDate: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000),
    lengthS: 145,
    liked: false,
  },
  {
    id: 0,
    imageSrc: trackImageSrc,
    title: 'song 6',
    author: 'author 6',
    album: 'album 6',
    addedDate: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000),
    lengthS: 145,
    liked: false,
  },
  {
    id: 0,
    imageSrc: trackImageSrc,
    title: 'song 7',
    author: 'author 7',
    album: 'album 7',
    addedDate: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000),
    lengthS: 145,
    liked: false,
  },
  {
    id: 0,
    imageSrc: trackImageSrc,
    title: 'song 8',
    author: 'author 8',
    album: 'album 8',
    addedDate: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000),
    lengthS: 145,
    liked: false,
  },
];

new TrackListPresenter(mainElement, dropdownService, new Tracks(tracksData));

new PlayerPresenter(rootElement);
