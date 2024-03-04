import PlaylistCardComponent from '../../components/playlists/PlaylistCardComponent';
import PlaylistsComponent from '../../components/playlists/PlaylistsComponent';
import Playlists from '../../model/Playlists';

export default class PlaylistsPresenter {
  private playlistsComponent: PlaylistsComponent;

  constructor(
    private parentElement: HTMLElement,
    private playlistsModel: Playlists,
  ) {
    this.playlistsComponent = new PlaylistsComponent();
  }

  public render(): void {
    this.playlistsComponent.removeElement();

    const playlistsComponentElement: HTMLElement =
      this.playlistsComponent.getElement();
    const listElement: HTMLElement | null =
      playlistsComponentElement.querySelector('.playlist__list');

    this.parentElement.append(playlistsComponentElement);

    if (listElement) {
      for (const playlist of this.playlistsModel.all()) {
        listElement.append(
          new PlaylistCardComponent(
            playlist.name,
            playlist.imageSrc,
            playlist.tracksCount,
          ).getElement(),
        );
      }
    }
  }
}
