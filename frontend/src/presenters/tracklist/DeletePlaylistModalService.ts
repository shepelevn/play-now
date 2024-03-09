import { PLAYLIST_IMAGES } from '../../components/playlists/playlistImages';
import PlaylistsModel from '../../model/PlaylistsModel';
import { PlaylistData } from '../../types/PlaylistData';
import { createElement } from '../../utils/createElement';
import { getTracksCountString } from '../../utils/getTracksCountString';
import ModalService from '../../utils/services/ModalService';

import spinnerImage from '../../resources/img/spinner.png';

export default class DeletePlaylistModalService {
  constructor(
    private readonly modalService: ModalService,
    private readonly playlistsModel: PlaylistsModel,
  ) {}

  public open(onDeleteCallback: (playlistId: number) => Promise<void>) {
    const modalDiv: HTMLElement = this.createModalElement();

    this.addPlaylistButtons(modalDiv, onDeleteCallback);

    this.addCancelButton(modalDiv);

    this.modalService.open(modalDiv);
  }

  public close() {
    this.modalService.close();
  }

  private createModalElement(): HTMLElement {
    return createElement(`
      <div class="playlists-modal">
          <div class="playlists-modal__title">
              Удалить плейлист
          </div>
          <div class="playlists-modal__playlist_content">
          </div>
          <div class="playlists-modal__footer">
              <div class="playlists-modal__close-btn">
                  Отменить
              </div>
          </div>
          <div class="loading modal-loading loading_hidden" id="modal-loading">
            <img class="loading__spinner" src="${spinnerImage}" alt="Идёт загрузка">
          </div>
      </div>
    `);
  }

  private addPlaylistButtons(
    modalDiv: HTMLElement,
    onDeleteCallback: (playlistId: number) => Promise<void>,
  ): void {
    const buttonsContainer = modalDiv.querySelector(
      '.playlists-modal__playlist_content',
    );

    for (const playlist of this.playlistsModel.playlists) {
      const playlistButton: HTMLElement = this.addPlaylistButton(playlist);

      playlistButton.addEventListener('click', async () => {
        const loadingElement: HTMLElement | null =
          document.getElementById('modal-loading');

        if (!loadingElement) {
          throw new Error('Could not find element with id: "modal-loading"');
        }

        loadingElement.classList.remove('loading_hidden');

        await onDeleteCallback(playlist.id);

        loadingElement.classList.add('loading_hidden');
      });

      buttonsContainer?.append(playlistButton);
    }
  }

  private addPlaylistButton(playlist: PlaylistData): HTMLElement {
    const imageId: number = playlist.id % PLAYLIST_IMAGES.length;
    const imageSrc: string | undefined = PLAYLIST_IMAGES[imageId];
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

  private addCancelButton(modalDiv: HTMLElement): void {
    const cancelButton: HTMLElement | null = modalDiv.querySelector(
      '.playlists-modal__close-btn',
    );

    if (!cancelButton) {
      throw new Error('playlists-modal__close-btn is not found');
    }

    cancelButton.addEventListener('click', () => this.close());
  }
}
