import PlaylistsModel from '../../model/PlaylistsModel';
import { ModelStatus } from '../../types/ModelStatus';
import Component from '../Component';

export default class PlaylistsComponent extends Component {
  constructor(private readonly playlists: PlaylistsModel) {
    super();
  }

  public getTemplate(): string {
    const content: string =
      this.playlists.status === ModelStatus.Success
        ? '<ul class="playlist__list"></ul>'
        : '<p>Loading ...</p>';

    return `
      <section class="playlist section" data-target="playlists">
        <h2 class="playlist__h2 title__h2">Плейлисты</h2>
        ${content}
      </section>
    `;
  }
}
