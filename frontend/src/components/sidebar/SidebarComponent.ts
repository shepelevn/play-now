import PlaylistsModel from '../../model/PlaylistsModel';
import { ModelStatus } from '../../types/ModelStatus';
import Component from '../Component';

import spinnerImage from '../../resources/img/spinner.png';

export default class SidebarComponent extends Component {
  constructor(private readonly playlists: PlaylistsModel) {
    super();
  }

  public getTemplate(): string {
    const isLoading: boolean = this.playlists.status === ModelStatus.Pending;

    return `
      <aside class="aside">
        <h2 class="aside__h2 visually-hidden">Левая панель навигации</h2>
        <nav class="aside__nav">
          <div class="aside__search-container"></div>
          <ul class="aside__list">
          </ul>
          ${isLoading ? `<li class="sidebar-loading loading loading_small"><img class="loading__spinner" src="${spinnerImage}" alt="Идет загрузка"></li>` : ''}
        </nav>
      </aside>
    `;
  }
}
