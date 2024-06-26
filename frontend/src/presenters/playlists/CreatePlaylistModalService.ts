import { createElement } from '../../utils/dom/createElement';
import ModalService from '../../utils/services/ModalService';

import spinnerImage from '../../resources/img/spinner.png';

export default class CreatePlaylistModalService {
  constructor(private readonly modalService: ModalService) {}

  public open(onCreateCallback: (name: string) => Promise<void>): void {
    const modalElement: HTMLElement = this.createModalElement();

    this.setCreateHandler(modalElement, onCreateCallback);

    this.setCloseHandler(modalElement);
  }

  public close() {
    this.modalService.close();
  }

  private createModalElement(): HTMLElement {
    return createElement(`
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
          <div class="loading loading_hidden modal-loading" id="modal-loading">
            <img class="loading__spinner" src="${spinnerImage}" alt="Идёт загрузка">
          </div>
        </div>
      </div>
    `);
  }

  private setCreateHandler(
    modalElement: HTMLElement,
    onCreateCallback: (name: string) => Promise<void>,
  ): void {
    const button: HTMLElement | null = modalElement.querySelector(
      '.create-playlist__btn',
    );

    if (!button) {
      throw new Error('.create-playlist__btn is not found');
    }

    button.addEventListener('click', async () => {
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
        const loadingElement: HTMLElement | null =
          document.getElementById('modal-loading');

        if (!loadingElement) {
          throw new Error('Could not find element with id: "modal-loading"');
        }

        loadingElement.classList.remove('loading_hidden');

        await onCreateCallback(name);

        loadingElement.classList.add('loading_hidden');
      }
    });
  }

  private setCloseHandler(modalElement: HTMLElement): void {
    const cancelButton: HTMLElement | null = modalElement.querySelector(
      '.create-playlist__cancel',
    );

    if (!cancelButton) {
      throw new Error('.create-playlist__cancel is not found');
    }

    cancelButton.addEventListener('click', () => this.modalService.close());

    this.modalService.open(modalElement);
  }
}
