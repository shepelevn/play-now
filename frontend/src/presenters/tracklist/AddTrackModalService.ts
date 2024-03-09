import { addToPlaylist } from '../../api/playlists';
import { PLAYLIST_IMAGES } from '../../components/playlists/playlistImages';
import PlaylistsModel from '../../model/PlaylistsModel';
import { PlaylistData } from '../../types/PlaylistData';
import { createElement } from '../../utils/createElement';
import { getTracksCountString } from '../../utils/getTracksCountString';
import ModalService from '../../utils/services/ModalService';

export default class AddTrackModalService {
  constructor(
    private readonly modalService: ModalService,
    private readonly playlistsModel: PlaylistsModel,
  ) {}

  public open(songId: number) {
    const modalDiv: HTMLElement = this.createModalElement();

    this.createPlaylistButtons(modalDiv, songId);

    this.addCancelHandler(modalDiv);

    this.modalService.open(modalDiv);
  }

  public close() {
    this.modalService.close();
  }

  private createModalElement(): HTMLElement {
    return createElement(`
      <div class="playlists-modal">
          <div class="playlists-modal__title">
              Добавить в плейлист
          </div>
          <div class="playlists-modal__playlist_content">
          </div>
          <div class="playlists-modal__footer">
              <div class="playlists-modal__close-btn">
                  Отменить
              </div>
          </div>
      </div>
    `);
  }

  private addCancelHandler(modalDiv: HTMLElement): void {
    const cancelButton: HTMLElement | null = modalDiv.querySelector(
      '.playlists-modal__close-btn',
    );

    if (!cancelButton) {
      throw new Error('playlists-modal__close-btn is not found');
    }

    cancelButton.addEventListener('click', () => this.close());
  }

  private createPlaylistButtons(modalDiv: HTMLElement, songId: number): void {
    const buttonsContainer = modalDiv.querySelector(
      '.playlists-modal__playlist_content',
    );

    for (const playlist of this.playlistsModel.getFilteredForAddition(songId)) {
      const playlistButton: HTMLElement = this.createPlaylistButton(playlist);

      playlistButton.addEventListener('click', async () => {
        this.close();

        const newPlaylist: PlaylistData = await addToPlaylist(
          playlist.id,
          songId,
        );

        this.playlistsModel.update(playlist.id, newPlaylist);
      });

      buttonsContainer?.append(playlistButton);
    }
  }

  private createPlaylistButton(playlist: PlaylistData): HTMLElement {
    const imageId: number = playlist.id % PLAYLIST_IMAGES.small.length;
    const imageSrc: string | undefined = PLAYLIST_IMAGES.small[imageId];
    const countString: string = getTracksCountString(playlist.songs.length);

    if (!imageSrc) {
      throw new Error(`Image with id: ${imageId} not found`);
    }

    return createElement(`
      <div class="playlists-modal__playlist">
          <img src="${imageSrc}" alt="" class="playlists-modal__playlist__image"/>
          <div class="playlists-modal__playlist__title">
            ${playlist.name}
          </div>
          <div class="playlists-modal__playlist__info">
            ${countString}
          </div>
      </div>
    `);
  }
}
