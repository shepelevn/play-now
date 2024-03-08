import PlaylistCardComponent from '../../components/playlists/PlaylistCardComponent';
import { PlaylistData } from '../../types/PlaylistData';

export default class PlaylistCardPresenter {
  private readonly component: PlaylistCardComponent;

  constructor(
    private readonly parentElement: HTMLElement,
    private readonly playlistData: PlaylistData,
    public readonly changeToPlaylist: (playlistData: PlaylistData) => void,
  ) {
    this.component = new PlaylistCardComponent(
      playlistData.id,
      playlistData.name,
      playlistData.songs.length,
    );

    this.render();
  }

  private render(): void {
    this.component.addOnClickListener(() => {
      this.changeToPlaylist(this.playlistData);
    });

    this.parentElement.append(this.component.getElement());
  }
}
