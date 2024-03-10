import TimeAgo from 'javascript-time-ago';
import ru from 'javascript-time-ago/locale/ru';
import { createRootElement } from './createRootElement';
import HeaderPresenter from './presenters/header/HeaderPresenter';
import SidebarPresenter from './presenters/sidebar/SidebarPresenter';
import TrackListPresenter from './presenters/tracklist/TrackListPresenter';
import PlayerPresenter from './presenters/player/PlayerPresenter';
import { createAndAppendElement } from './utils/createAndAppendElement';
import TracksModel from './model/TracksModel';
import PlaylistsPresenter from './presenters/playlists/PlaylistsPresenter';
import ScreenPresenter from './presenters/screen/ScreenPresenter';
import PlaylistsModel from './model/PlaylistsModel';
import { ScreenState } from './types/ScreenState';
import axios from 'axios';
import { getApiToken } from './api/auth';
import { loadTracks } from './api/tracks';
import DropdownService from './utils/services/DropdownService';
import ModalService from './utils/services/ModalService';
import { ModelStatus } from './types/ModelStatus';
import { TracksType } from './types/TracksType';
import { PlaylistData } from './types/PlaylistData';
import PlayerModel from './model/PlayerModel';
import { SidebarButtonType } from './types/SidebarButtonType';
import 'nouislider/dist/nouislider.css';

import './resources/css/style.css';
import { TrackDataWithIndex } from './types/TracksDataWithIndex';

init();

async function init(): Promise<void> {
  TimeAgo.addDefaultLocale(ru);

  const authToken = await getApiToken();
  axios.defaults.headers.common.Authorization = `Bearer ${authToken}`;

  const rootElement: HTMLElement = createRootElement();

  const dropdownService = new DropdownService();
  const modalService = new ModalService();

  const tracksModel: TracksModel = new TracksModel();
  tracksModel.setAll(await loadTracks(''));
  tracksModel.status = ModelStatus.Success;

  const firstSong: TrackDataWithIndex | undefined =
    tracksModel.allWithSearch()[0];

  if (!firstSong) {
    throw new Error('firstSong is not found');
  }

  const playerModel: PlayerModel = new PlayerModel(
    firstSong,
    tracksModel.all(),
  );

  const playlistsModel: PlaylistsModel = new PlaylistsModel();

  initPresenters(
    rootElement,
    tracksModel,
    playlistsModel,
    playerModel,
    dropdownService,
    modalService,
  );
}

function initPresenters(
  rootElement: HTMLElement,
  tracksModel: TracksModel,
  playlistsModel: PlaylistsModel,
  playerModel: PlayerModel,
  dropdownService: DropdownService,
  modalService: ModalService,
): void {
  // Create presenters and DOM elements for them
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
    tracksModel,
    playlistsModel,
    playerModel,
    dropdownService,
    modalService,
  );

  const playlistsPresenter: PlaylistsPresenter = new PlaylistsPresenter(
    mainElement,
    playlistsModel,
    modalService,
  );

  const screenPresenter = new ScreenPresenter(
    mainElement,
    trackListPresenter,
    playlistsPresenter,
  );

  headerPresenter.searchPresenter.searchChangeCallback = () => {
    if (tracksModel.tracksType === TracksType.Tracks) {
      loadTracksCallback();
    }

    screenPresenter.render();
  };

  const playerPresenter: PlayerPresenter = new PlayerPresenter(
    rootElement,
    playerModel,
  );

  // Create callbacks
  const changeToPlaylist = createChangeToPlaylistCallback(
    tracksModel,
    sidebarPresenter,
  );
  const loadTracksCallback = createLoadTracksCallback(tracksModel);

  // Add callbacks to presenters
  sidebarPresenter.loadTracksCallback = loadTracksCallback;
  sidebarPresenter.changeToPlaylist = changeToPlaylist;

  trackListPresenter.onTracksChangeCallback = () => screenPresenter.render();

  playlistsPresenter.changeToPlaylist = changeToPlaylist;

  // Create callbacks for models
  tracksModel.onChange = (state: ScreenState) => {
    screenPresenter.changeScreen(state);
  };

  playlistsModel.onChange = () => {
    sidebarPresenter.render();
    screenPresenter.render();
  };

  playerModel.onTrackChange = () => {
    // TODO: Delete later maybe
    playerPresenter.render();

    playerPresenter.load();
    playerPresenter.play();
  };

  playerModel.onTrackListChange = () => {
    playerPresenter.onTrackListChange();
    // TODO: Delete later maybe
    playerPresenter.render();

    playerPresenter.load();
    playerPresenter.play();
  };
}

function createChangeToPlaylistCallback(
  tracksModel: TracksModel,
  sidebarPresenter: SidebarPresenter,
): (playlistData: PlaylistData) => void {
  return (playlistData: PlaylistData) => {
    tracksModel.tracksTitle = playlistData.name;
    tracksModel.tracksType = TracksType.Playlist;
    tracksModel.playlistId = playlistData.id;
    tracksModel.setAll(playlistData.songs);

    sidebarPresenter.activeButton = SidebarButtonType.Tracks;
    tracksModel.tracksType = TracksType.Playlist;

    sidebarPresenter.render();

    tracksModel.onChange(ScreenState.Tracks);
  };
}

function createLoadTracksCallback(tracksModel: TracksModel): () => void {
  return async () => {
    tracksModel.playlistId = null;
    tracksModel.status = ModelStatus.Pending;
    tracksModel.onChange(ScreenState.Tracks);

    tracksModel.setAll(await loadTracks(tracksModel.filterString));
    tracksModel.status = ModelStatus.Success;

    tracksModel.onChange(ScreenState.Tracks);
  };
}
