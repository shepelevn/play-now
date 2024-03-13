import SidebarComponent from '../../components/sidebar/SidebarComponent';
import PlaylistsModel from '../../model/PlaylistsModel';
import { renderSvgSprite } from '../../render/renderSvgSprite';
import { ScreenState } from '../../types/ScreenState';
import { notInitialized } from '../../utils/notInitialized';

import NoteSvg from '../../resources/svg/note.sprite.svg';
import PlaySvg from '../../resources/svg/play.sprite.svg';
import SidebarButtonPresenter from './SidebarButtonPresenter';
import TracksModel from '../../model/TracksModel';
import { loadFavorites } from '../../api/tracks';
import { ModelStatus } from '../../types/ModelStatus';
import { PlaylistData } from '../../types/PlaylistData';
import { TracksType } from '../../types/TracksType';
import { SidebarButtonType } from '../../types/SidebarButtonType';

export default class SidebarPresenter {
  private readonly sidebarComponent: SidebarComponent;
  public loadTracksCallback: () => void = notInitialized;
  public searchChangeCallback: () => void = notInitialized;
  public changeToPlaylist: (playlistData: PlaylistData) => void =
    notInitialized;
  public activeButton: SidebarButtonType = SidebarButtonType.Tracks;

  constructor(
    private readonly parentElement: HTMLElement,
    private readonly playlistsModel: PlaylistsModel,
    private readonly tracksModel: TracksModel,
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

    this.addTracksButton(listElement);
    this.addPlaylistListButton(listElement);
    this.addFavoriteButton(listElement);

    for (const playlistData of this.playlistsModel.playlists) {
      this.addPlaylistButton(listElement, playlistData.id);
    }

    this.initMobileSearch();
  }

  private addTracksButton(listElement: HTMLElement): void {
    const isActive: boolean =
      this.activeButton === SidebarButtonType.Tracks &&
      this.tracksModel.tracksType === TracksType.Tracks;

    new SidebarButtonPresenter(
      listElement,
      'Треки',
      () => {
        this.tracksModel.tracksTitle = 'Треки';
        this.tracksModel.tracksType = TracksType.Tracks;

        this.loadTracksCallback();

        this.activeButton = SidebarButtonType.Tracks;
        this.render();
      },
      isActive,
      renderSvgSprite(NoteSvg.url, 'aside__btn-note-icon'),
    );
  }

  private addPlaylistListButton(listElement: HTMLElement): void {
    new SidebarButtonPresenter(
      listElement,
      'Плейлисты',
      () => {
        this.activeButton = SidebarButtonType.Tracks;

        this.tracksModel.onChange(ScreenState.Playlists);

        this.activeButton = SidebarButtonType.Playlists;
        this.render();
      },
      this.activeButton === SidebarButtonType.Playlists,
      renderSvgSprite(PlaySvg.url, 'aside__btn-play-icon'),
    );
  }

  private addFavoriteButton(listElement: HTMLElement): void {
    const isActive: boolean =
      this.activeButton === SidebarButtonType.Tracks &&
      this.tracksModel.tracksType === TracksType.Favorite;

    new SidebarButtonPresenter(
      listElement,
      'Любимые песни',
      async () => {
        this.activeButton = SidebarButtonType.Tracks;

        this.tracksModel.tracksTitle = 'Любимые песни';
        this.tracksModel.tracksType = TracksType.Favorite;
        this.tracksModel.playlistId = null;
        this.tracksModel.status = ModelStatus.Pending;
        this.tracksModel.onChange(ScreenState.Tracks);

        this.tracksModel.setAll(await loadFavorites());
        this.tracksModel.status = ModelStatus.Success;

        this.tracksModel.onChange(ScreenState.Tracks);

        this.activeButton = SidebarButtonType.Tracks;
        this.render();
      },
      isActive,
    );
  }

  private addPlaylistButton(
    listElement: HTMLElement,
    playlistId: number,
  ): void {
    const playlistData = this.playlistsModel.get(playlistId);

    const isActive: boolean =
      this.activeButton === SidebarButtonType.Tracks &&
      this.tracksModel.tracksType === TracksType.Playlist &&
      this.tracksModel.playlistId === playlistData.id;

    new SidebarButtonPresenter(
      listElement,
      playlistData.name,
      () => {
        const playlistData = this.playlistsModel.get(playlistId);

        this.activeButton = SidebarButtonType.Tracks;
        this.changeToPlaylist(playlistData);

        this.activeButton = SidebarButtonType.Tracks;
        this.render();
      },
      isActive,
    );
  }

  private initMobileSearch(): void {
    this.sidebarComponent.addOnSearchListener((event: Event) => {
      const input: EventTarget | null = event.currentTarget;

      if (!(input instanceof HTMLInputElement)) {
        throw new Error('Event target is not HTMLInputElement');
      }

      this.tracksModel.filterString = input.value;

      this.searchChangeCallback();
    });
  }
}
