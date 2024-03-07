import { createPlaylist, deletePlaylist, loadPlaylistsData } from '../../api/playlists';
import PlaylistCardComponent from '../../components/playlists/PlaylistCardComponent';
import PlaylistsComponent from '../../components/playlists/PlaylistsComponent';
import { ModelStatus } from '../../model/ModelStatus';
import Playlists from '../../model/Playlists';
import { noop } from '../../utils/noop';

import addImage from '../../resources/img/add.png';
import deleteImage from '../../resources/img/delete.png';
import PlaylistButtonComponent from '../../components/playlists/PlaylistButtonComponent';
import CreatePlaylistModalService from './CreatePlaylistModalService';
import ModalService from '../../utils/services/ModalService';
import DeletePlaylistModalService from '../tracklist/DeletePlaylistModalService';
import { PlaylistData } from '../../types/PlaylistData';

export default class PlaylistsPresenter {
  private playlistsComponent: PlaylistsComponent;
  public onLoadCallback: () => void = noop;
  private createPlaylistModalService: CreatePlaylistModalService;
  private deletePlaylistModalService: DeletePlaylistModalService;

  constructor(
    private parentElement: HTMLElement,
    private playlistsModel: Playlists,
    modalService: ModalService,
  ) {
    this.playlistsComponent = new PlaylistsComponent(playlistsModel);

    this.createPlaylistModalService = new CreatePlaylistModalService(
      modalService,
    );

    this.deletePlaylistModalService = new DeletePlaylistModalService(
      modalService,
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

    if (listElement) {
      for (const playlist of this.playlistsModel.playlists) {
        listElement.append(
          new PlaylistCardComponent(
            playlist.name,
            playlist.imageId,
            playlist.songs.length,
          ).getElement(),
        );
      }

      const createPlaylistComponent: PlaylistButtonComponent =
        new PlaylistButtonComponent(addImage, 'Создать плейлист');

      createPlaylistComponent.addClickListener((event: Event) => {
        event.preventDefault();

        this.createPlaylistModalService.open(async (name: string) => {
          const newPlaylist: PlaylistData = await createPlaylist(name);

          this.playlistsModel.add(newPlaylist);

          this.createPlaylistModalService.close();

          this.onLoadCallback();
        });
      });

      listElement.append(createPlaylistComponent.getElement());

      const deletePlaylistComponent: PlaylistButtonComponent =
        new PlaylistButtonComponent(deleteImage, 'Удалить плейлист');

      deletePlaylistComponent.addClickListener((event: Event) => {
        event.preventDefault();

        this.deletePlaylistModalService.open(
          this.playlistsModel,
          async (playlistId: number) => {
            await deletePlaylist(playlistId);
            this.playlistsModel.delete(playlistId);

            this.deletePlaylistModalService.close();
            this.onLoadCallback();
          },
        );
      });

      listElement.append(deletePlaylistComponent.getElement());
    }
  }
}
