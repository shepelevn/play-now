import { Playlist } from '../../presenters/sidebar/SidebarPresenter';
import { renderSvgSprite } from '../../render/renderSvgSprite';
import Component from '../Component';
import SidebarButtonComponent from './SidebarButtonComponent';

import NoteSvg from '../../resources/svg/note.sprite.svg';
import PlaySvg from '../../resources/svg/play.sprite.svg';

export default class SidebarComponent extends Component {
  private items: SidebarButtonComponent[] = [];

  constructor(playlistsData: Playlist[]) {
    super();

    this.items.push(
      new SidebarButtonComponent(
        'Треки',
        renderSvgSprite(NoteSvg.url, 'aside__btn-note-icon'),
      ),
      new SidebarButtonComponent(
        'Плейлисты',
        renderSvgSprite(PlaySvg.url, 'aside__btn-play-icon'),
      ),
      new SidebarButtonComponent('Любимые песни'),
    );

    for (const playlistData of playlistsData) {
      this.items.push(new SidebarButtonComponent(playlistData.name));
    }
  }

  public getTemplate(): string {
    const items = this.items.reduce(
      (accumulator: string, item: SidebarButtonComponent) =>
        accumulator + item.getTemplate(),
      '',
    );

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
            ${items}
          </ul>
        </nav>
      </aside>
    `;
  }
}
