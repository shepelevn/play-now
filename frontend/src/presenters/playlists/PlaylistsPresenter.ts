import { loadPlaylistsData } from '../../api/playlists';
import PlaylistCardComponent from '../../components/playlists/PlaylistCardComponent';
import PlaylistsComponent from '../../components/playlists/PlaylistsComponent';
import { ModelStatus } from '../../model/ModelStatus';
import Playlists from '../../model/Playlists';
import { noop } from '../../utils/noop';

export default class PlaylistsPresenter {
  private playlistsComponent: PlaylistsComponent;
  public onLoadCallback: () => void = noop;

  constructor(
    private parentElement: HTMLElement,
    private playlistsModel: Playlists,
  ) {
    this.playlistsComponent = new PlaylistsComponent(playlistsModel);

    this.loadPlaylists();
  }

  private async loadPlaylists(): Promise<void> {
    this.playlistsModel.playlists = await loadPlaylistsData();
    this.playlistsModel.status = ModelStatus.Success;

    this.onLoadCallback();
  }

  public render(): void {
    this.playlistsComponent.removeElement();

    const playlistsComponentElement: HTMLElement =
      this.playlistsComponent.getElement();
    const listElement: HTMLElement | null =
      playlistsComponentElement.querySelector('.playlist__list');

    this.parentElement.append(playlistsComponentElement);

    if (listElement) {
      for (const playlist of this.playlistsModel.playlists) {
        listElement.append(
          new PlaylistCardComponent(
            playlist.name,
            playlist.imageId,
            playlist.songs.length,
          ).getElement(),
        );
      }
    }
  }
}
