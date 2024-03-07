import { createElement } from '../../utils/createElement';
import ModalService from '../../utils/services/ModalService';

export default class CreatePlaylistModalService {
  constructor(private modalService: ModalService) {}

  public open(onCreateCallback: (name: string) => void): void {
    const modalElement = createElement(`
      <div>
        <div class="playlists-modal">
            <div class="playlists-modal__title">
                Создать плейлист
            </div>
            <div class="playlists-modal__playlist_content">
              <div class="create-playlist__content">
                  <label class="create-playlist__label">
                    Название
                    <input class="create-playlist__input common-input" id="create-playlist-name" type="text">
                  </label>
                  <button class="common-btn create-playlist__btn">Создать</button>
              </div>
            </div>
            <div class="playlists-modal__footer">
                <div class="playlists-modal__close-btn create-playlist__cancel">
                    Отменить
                </div>
            </div>
        </div>
      </div>
    `);

    const button: HTMLElement | null = modalElement.querySelector(
      '.create-playlist__btn',
    );

    if (!button) {
      throw new Error('.create-playlist__btn is not found');
    }

    button.addEventListener('click', () => {
      const input: HTMLElement | null = document.getElementById(
        'create-playlist-name',
      );

      if (!input) {
        throw new Error('Input with id: create-playlist-name not found');
      }

      if (!(input instanceof HTMLInputElement)) {
        throw new Error('Input element is not instanceof HTMLInputElement');
      }

      const name: string = input.value.trim();

      if (name !== '') {
        onCreateCallback(name);
      }
    });

    const cancelButton: HTMLElement | null = modalElement.querySelector(
      '.create-playlist__cancel',
    );

    if (!cancelButton) {
      throw new Error('.create-playlist__cancel is not found');
    }

    cancelButton.addEventListener('click', () => this.modalService.close());

    this.modalService.open(modalElement);
  }

  public close() {
    this.modalService.close();
  }
}
