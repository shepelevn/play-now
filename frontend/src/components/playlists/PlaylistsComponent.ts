import Component from '../Component';

export default class PlaylistsComponent extends Component {
  public getTemplate(): string {
    return `
      <section class="playlist section" data-target="playlists">
        <h2 class="playlist__h2">Плейлисты</h2>
        <ul class="playlist__list">
        </ul>
      </section>
    `;
  }
}
