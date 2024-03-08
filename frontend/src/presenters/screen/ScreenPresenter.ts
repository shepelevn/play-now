import { ScreenState } from '../../types/ScreenState';
import PlaylistsPresenter from '../playlists/PlaylistsPresenter';
import TrackListPresenter from '../tracklist/TrackListPresenter';

export default class ScreenPresenter {
  private currentScreen: ScreenState = ScreenState.Tracks;

  constructor(
    public parentElement: HTMLElement,
    public trackListPresenter: TrackListPresenter,
    public playlistsPresenter: PlaylistsPresenter,
  ) {
    this.render();
  }

  public render(): void {
    this.parentElement.innerHTML = '';

    if (this.currentScreen === ScreenState.Tracks) {
      this.trackListPresenter.render();
    } else {
      this.playlistsPresenter.render();
    }
  }

  public changeScreen(screenType: ScreenState): void {
    this.currentScreen = screenType;

    this.render();
  }
}
