import {
  createPlaylist,
  deletePlaylist,
  loadPlaylistsData,
} from '../../api/playlists';
import PlaylistsComponent from '../../components/playlists/PlaylistsComponent';
import Playlists from '../../model/Playlists';
import { noop } from '../../utils/noop';

import addImage from '../../resources/img/add.png';
import deleteImage from '../../resources/img/delete.png';
import PlaylistButtonComponent from '../../components/playlists/PlaylistButtonComponent';
import CreatePlaylistModalService from './CreatePlaylistModalService';
import ModalService from '../../utils/services/ModalService';
import DeletePlaylistModalService from '../tracklist/DeletePlaylistModalService';
import { PlaylistData } from '../../types/PlaylistData';
import { ModelStatus } from '../../types/ModelStatus';
import PlaylistCardPresenter from './PlaylistCardPresenter';

export default class PlaylistsPresenter {
  private readonly playlistsComponent: PlaylistsComponent;
  public onLoadCallback: () => void = noop;
  private readonly createPlaylistModalService: CreatePlaylistModalService;
  private readonly deletePlaylistModalService: DeletePlaylistModalService;

  constructor(
    private readonly parentElement: HTMLElement,
    private readonly playlistsModel: Playlists,
    modalService: ModalService,
  ) {
    this.playlistsComponent = new PlaylistsComponent(playlistsModel);

    this.createPlaylistModalService = new CreatePlaylistModalService(
      modalService,
    );

    this.deletePlaylistModalService = new DeletePlaylistModalService(
      modalService,
      playlistsModel,
    );

    this.loadPlaylists();
  }

  private async loadPlaylists(): Promise<void> {
    this.playlistsModel.playlists = await loadPlaylistsData();
    this.playlistsModel.status = ModelStatus.Success;

    this.onLoadCallback();
  }

  public render(): void {
    this.playlistsComponent.removeElement();

    const playlistsComponentElement: HTMLElement =
      this.playlistsComponent.getElement();
    const listElement: HTMLElement | null =
      playlistsComponentElement.querySelector('.playlist__list');

    this.parentElement.append(playlistsComponentElement);

    if (!listElement) {
      throw new Error('element with a class ".playlist__list" is not found');
    }

    listElement.innerHTML = '';

    for (const playlist of this.playlistsModel.playlists) {
      new PlaylistCardPresenter(listElement, playlist);

      // TODO: Delete later
      // listElement.append(
      //   new PlaylistCardComponent(
      //     playlist.name,
      //     playlist.imageId,
      //     playlist.songs.length,
      //   ).getElement(),
      // );
    }

    this.addCreatePlaylistComponent(listElement);

    this.addDeletePlaylistComponent(listElement);
  }

  private addCreatePlaylistComponent(listElement: HTMLElement): void {
    const createPlaylistComponent: PlaylistButtonComponent =
      new PlaylistButtonComponent(addImage, 'Создать плейлист');

    createPlaylistComponent.addOnClickListener((event: Event) => {
      event.preventDefault();

      this.createPlaylistModalService.open(async (name: string) => {
        const newPlaylist: PlaylistData = await createPlaylist(name);

        this.playlistsModel.add(newPlaylist);

        this.createPlaylistModalService.close();

        this.onLoadCallback();
      });
    });

    listElement.append(createPlaylistComponent.getElement());
  }

  private addDeletePlaylistComponent(listElement: HTMLElement): void {
    const deletePlaylistComponent: PlaylistButtonComponent =
      new PlaylistButtonComponent(deleteImage, 'Удалить плейлист');

    deletePlaylistComponent.addOnClickListener((event: Event) => {
      event.preventDefault();

      this.deletePlaylistModalService.open(async (playlistId: number) => {
        await deletePlaylist(playlistId);
        this.playlistsModel.delete(playlistId);

        this.deletePlaylistModalService.close();
        this.onLoadCallback();
      });
    });

    listElement.append(deletePlaylistComponent.getElement());
  }
}
