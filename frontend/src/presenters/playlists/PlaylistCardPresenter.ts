import PlaylistCardComponent from '../../components/playlists/PlaylistCardComponent';
import { PlaylistData } from '../../types/PlaylistData';

export default class PlaylistCardPresenter {
  private component: PlaylistCardComponent;

  constructor(
    private parentElement: HTMLElement,
    playlistData: PlaylistData,
  ) {
    this.component = new PlaylistCardComponent(
      playlistData.name,
      playlistData.imageId,
      playlistData.songs.length,
    );

    this.render();
  }

  private render(): void {
    this.parentElement.append(this.component.getElement());
  }
}
