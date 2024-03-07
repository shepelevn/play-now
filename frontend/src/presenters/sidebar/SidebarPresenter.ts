import SidebarComponent from '../../components/sidebar/SidebarComponent';
import Playlists from '../../model/Playlists';
import { renderSvgSprite } from '../../render/renderSvgSprite';
import ScreenState from '../../types/ScreenState';
import { noop } from '../../utils/noop';

import NoteSvg from '../../resources/svg/note.sprite.svg';
import PlaySvg from '../../resources/svg/play.sprite.svg';
import SidebarButtonPresenter from './SidebarButtonPresenter';
import Tracks from '../../model/Tracks';
import { loadFavorites, loadTracks } from '../../api/tracks';
import { ModelStatus } from '../../model/ModelStatus';

export default class SidebarPresenter {
  private readonly sidebarComponent: SidebarComponent;
  public changeScreenCallback: (state: ScreenState) => void = noop;

  constructor(
    private readonly parentElement: HTMLElement,
    private readonly playlistsModel: Playlists,
    private readonly tracksModel: Tracks,
  ) {
    this.sidebarComponent = new SidebarComponent(playlistsModel);

    this.render();
  }

  public render(): void {
    this.sidebarComponent.removeElement();
    const sidebarElement: HTMLElement = this.sidebarComponent.getElement();
    this.parentElement.prepend(sidebarElement);

    const listElement: HTMLElement | null =
      sidebarElement.querySelector('.aside__list');

    if (!listElement) {
      throw new Error('Element with class .aside__list not found');
    }

    new SidebarButtonPresenter(
      listElement,
      'Треки',
      async () => {
        this.tracksModel.playlistId = null;
        this.tracksModel.status = ModelStatus.Pending;
        this.changeScreenCallback(ScreenState.Tracks);

        this.tracksModel.setAll(await loadTracks());
        this.tracksModel.status = ModelStatus.Success;

        this.changeScreenCallback(ScreenState.Tracks);
      },
      renderSvgSprite(NoteSvg.url, 'aside__btn-note-icon'),
    );

    new SidebarButtonPresenter(
      listElement,
      'Плейлисты',
      () => {
        this.changeScreenCallback(ScreenState.Playlists);
      },
      renderSvgSprite(PlaySvg.url, 'aside__btn-play-icon'),
    );

    new SidebarButtonPresenter(listElement, 'Любимые песни', async () => {
      this.tracksModel.playlistId = null;
      this.tracksModel.status = ModelStatus.Pending;
      this.changeScreenCallback(ScreenState.Tracks);

      this.tracksModel.setAll(await loadFavorites());
      this.tracksModel.status = ModelStatus.Success;

      this.changeScreenCallback(ScreenState.Tracks);
    });

    for (const playlistData of this.playlistsModel.playlists) {
      new SidebarButtonPresenter(listElement, playlistData.name, () => {
        this.tracksModel.playlistId = playlistData.id;
        this.tracksModel.setAll(playlistData.songs);

        this.changeScreenCallback(ScreenState.Tracks);
      });
    }
  }
}
