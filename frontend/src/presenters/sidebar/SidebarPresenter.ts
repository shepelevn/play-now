import SidebarComponent from '../../components/sidebar/SidebarComponent';
import Playlists from '../../model/Playlists';
import { renderSvgSprite } from '../../render/renderSvgSprite';
import ScreenState from '../../types/ScreenState';
import { noop } from '../../utils/noop';

import NoteSvg from '../../resources/svg/note.sprite.svg';
import PlaySvg from '../../resources/svg/play.sprite.svg';
import SidebarButtonPresenter from './SidebarButtonPresenter';

export default class SidebarPresenter {
  private sidebarComponent: SidebarComponent;
  public changeScreenCallback: (state: ScreenState) => void = noop;

  constructor(
    private parentElement: HTMLElement,
    private playlists: Playlists,
  ) {
    this.sidebarComponent = new SidebarComponent();

    this.parentElement.append(this.sidebarComponent.getElement());

    this.render();
  }

  public render(): void {
    const sidebarElement: HTMLElement = this.sidebarComponent.getElement();

    new SidebarButtonPresenter(
      sidebarElement,
      'Треки',
      () => {
        this.changeScreenCallback(ScreenState.Tracks);
      },
      renderSvgSprite(NoteSvg.url, 'aside__btn-note-icon'),
    );

    new SidebarButtonPresenter(
      sidebarElement,
      'Плейлисты',
      () => {
        this.changeScreenCallback(ScreenState.Playlists);
      },
      renderSvgSprite(PlaySvg.url, 'aside__btn-play-icon'),
    );

    new SidebarButtonPresenter(sidebarElement, 'Любимые песни', () => {
      this.changeScreenCallback(ScreenState.Tracks);
    });

    for (const playlistData of this.playlists.all()) {
      new SidebarButtonPresenter(sidebarElement, playlistData.name, () => {
        this.changeScreenCallback(ScreenState.Tracks);
      });
    }
  }
}
