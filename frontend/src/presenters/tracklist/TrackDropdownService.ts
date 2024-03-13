import DropdownService from '../../utils/services/DropdownService';
import { createElement } from '../../utils/dom/createElement';

export default class TrackDropdownService {
  private currentDropdownButton: HTMLElement | null = null;

  constructor(private readonly dropdownService: DropdownService) {}

  public openDropdown(
    id: number,
    deleteCallback: () => void,
    openModalCallback: () => void,
    isPlaylist: boolean,
  ) {
    const trackItemElement: HTMLElement | null = document.getElementById(
      `track-item-${id}`,
    );

    if (!trackItemElement) {
      throw new Error(`Could not find the track with id: ${id}`);
    }

    const dropdownContainer = trackItemElement.querySelector(
      '.tracks__item__drop',
    );

    if (!(dropdownContainer instanceof HTMLElement)) {
      throw new Error('Dropdown container is not an instanceof HTMLElement');
    }

    this.addDropdown(
      dropdownContainer,
      trackItemElement,
      deleteCallback,
      openModalCallback,
      isPlaylist,
    );
  }

  private addDropdown(
    dropdownContainer: HTMLElement,
    trackItemElement: HTMLElement,
    deleteCallback: () => void,
    openModalCallback: () => void,
    isPlaylist: boolean,
  ): void {
    const dropdownElement: HTMLElement = this.createDropdownElement(isPlaylist);

    this.currentDropdownButton = trackItemElement.querySelector(
      '.track__btn-dropdown',
    );

    this.currentDropdownButton?.classList.add('btn-dropdown--active');

    const dropdown: HTMLElement | null = this.dropdownService.openDropdown(
      dropdownContainer,
      dropdownElement,
      () => {
        this.currentDropdownButton?.classList.remove('btn-dropdown--active');
      },
    );

    if (dropdown) {
      const addButton = dropdownElement.querySelector('.track__add-btn');
      addButton?.addEventListener('click', () => {
        openModalCallback();
      });

      const deleteButton = dropdownElement.querySelector('.track__delete-btn');
      deleteButton?.addEventListener('click', () => deleteCallback());
    } else {
      dropdownElement.remove();
    }
  }

  private createDropdownElement(isPlaylist: boolean): HTMLElement {
    return createElement(`
      <div class="track__dropdown dropdown--active">
        <button class="track__add-btn">Добавить в плейлист</button>
        ${isPlaylist ? '<button class="track__delete-btn">Удалить из плейлиста</button>' : ''}
      </div>
      `);
  }
}
