import TimeAgo from 'javascript-time-ago';
import ru from 'javascript-time-ago/locale/ru';
import { createRootElement } from './createRootElement';
import HeaderPresenter from './presenters/header/HeaderPresenter';
import SidebarPresenter from './presenters/sidebar/SidebarPresenter';
import TrackListPresenter from './presenters/tracklist/TrackListPresenter';
import PlayerPresenter from './presenters/player/PlayerPresenter';
import { createAndAppendElement } from './utils/createAndAppendElement';
import DropdownService from './utils/DropdownService';
import Tracks from './model/Tracks';
import PlaylistsPresenter from './presenters/playlists/PlaylistsPresenter';
import ScreenPresenter from './presenters/screen/ScreenPresenter';

import './resources/css/style.css';
import Playlists from './model/Playlists';
import ScreenState from './types/ScreenState';
import axios from 'axios';
import { getApiToken } from './api/auth';
import { loadTracks } from './api/tracks';
import { ModelStatus } from './model/ModelStatus';

init();

async function init(): Promise<void> {
  TimeAgo.addDefaultLocale(ru);

  const authToken = await getApiToken();
  axios.defaults.headers.common.Authorization = `Bearer ${authToken}`;

  const dropdownService = new DropdownService();

  const tracksModel: Tracks = new Tracks();
  tracksModel.setAll(await loadTracks());
  tracksModel.status = ModelStatus.Success;

  const playlistsModel: Playlists = new Playlists();

  // TODO: Move to main presenter maybe
  const rootElement: HTMLElement = createRootElement();

  const headerPresenter = new HeaderPresenter(rootElement, tracksModel);

  const contentWrapElement: HTMLElement = createAndAppendElement(
    rootElement,
    '<div class="content-wrap flex"></div>',
  );

  const sidebarPresenter = new SidebarPresenter(
    contentWrapElement,
    playlistsModel,
    tracksModel,
  );

  const mainElement = createAndAppendElement(
    contentWrapElement,
    '<main class="main"> </main>',
  );

  const trackListPresenter: TrackListPresenter = new TrackListPresenter(
    mainElement,
    dropdownService,
    tracksModel,
    playlistsModel,
  );

  const playlistsPresenter: PlaylistsPresenter = new PlaylistsPresenter(
    mainElement,
    playlistsModel,
  );

  const screenPresenter = new ScreenPresenter(
    mainElement,
    trackListPresenter,
    playlistsPresenter,
  );

  headerPresenter.searchPresenter.searchChangeCallback = () => {
    screenPresenter.render();
  };

  sidebarPresenter.changeScreenCallback = (state: ScreenState) => {
    screenPresenter.changeScreen(state);
  };

  trackListPresenter.onChangeCallback = () => screenPresenter.render();

  playlistsPresenter.onLoadCallback = () => {
    sidebarPresenter.render();
    screenPresenter.render();
  };

  new PlayerPresenter(rootElement, tracksModel);
}
