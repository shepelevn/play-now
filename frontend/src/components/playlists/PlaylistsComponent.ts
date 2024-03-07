import Playlists from '../../model/Playlists';
import { ModelStatus } from '../../types/ModelStatus';
import Component from '../Component';

export default class PlaylistsComponent extends Component {
  constructor(private readonly playlists: Playlists) {
    super();
  }

  public getTemplate(): string {
    return this.playlists.status === ModelStatus.Success
      ? `
      <section class="playlist section" data-target="playlists">
        <h2 class="playlist__h2 title__h2">Плейлисты</h2>
        <ul class="playlist__list">
        </ul>
      </section>
    `
      : `
      <section class="playlist section" data-target="playlists">
        <h2 class="playlist__h2 title__h2">Плейлисты</h2>
        <p>Loading ...</p>
      </section>
    `;
  }
}
