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
          <button class="search__btn-open">
             <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.5 18C14.1944 18 18 14.1944 18 9.5C18 4.80558 14.1944 1 9.5 1C4.80558 1 1 4.80558 1 9.5C1 14.1944 4.80558 18 9.5 18Z" stroke="#AAAAAA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M18.9999 19L15.5 15.5001" stroke="#AAAAAA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
          </button>
            <ul class="aside__list">
            </ul>
            ${isLoading ? `<li class="sidebar-loading loading loading_small"><img class="loading__spinner" src="${spinnerImage}" alt="Идет загрузка"></li>` : ''}
        </nav>
      </aside>
    `;
  }
}
