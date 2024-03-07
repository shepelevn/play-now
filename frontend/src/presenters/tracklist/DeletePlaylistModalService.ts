import { PLAYLIST_IMAGES } from '../../components/playlists/playlistImages';
import Playlists from '../../model/Playlists';
import { createElement } from '../../utils/createElement';
import { getTracksCountString } from '../../utils/getTracksCountString';
import ModalService from '../../utils/services/ModalService';

export default class DeletePlaylistModalService {
  constructor(private modalService: ModalService) {}

  public open(
    playlistsModel: Playlists,
    onDeleteCallback: (playlistId: number) => void,
  ) {
    const modalDiv: HTMLElement = this.createElement();

    const cancelButton: HTMLElement | null = modalDiv.querySelector(
      '.playlists-modal__close-btn',
    );

    if (!cancelButton) {
      throw new Error('playlists-modal__close-btn is not found');
    }

    cancelButton.addEventListener('click', () => this.close());

    const buttonsContainer = modalDiv.querySelector(
      '.playlists-modal__playlist_content',
    );

    for (const playlist of playlistsModel.playlists) {
      const imageSrc: string | undefined = PLAYLIST_IMAGES[playlist.imageId];
      const countString: string = getTracksCountString(playlist.songs.length);

      if (!imageSrc) {
        throw new Error(`Image with id: ${playlist.imageId} not found`);
      }

      const playlistButton: HTMLElement = createElement(`
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

      playlistButton.addEventListener('click', async () => {
        onDeleteCallback(playlist.id);
      });

      buttonsContainer?.append(playlistButton);
    }

    this.modalService.open(modalDiv);
  }

  public close() {
    this.modalService.close();
  }

  private createElement(): HTMLElement {
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
      </div>
    `);
  }
}
