import { noop } from './noop';

export default class DropdownService {
  private currentDropdown: HTMLElement | null = null;
  private listenerCallback: () => void = noop;

  public openDropdown(
    container: HTMLElement,
    dropdownElement: HTMLElement,
    onClose: () => void,
  ): HTMLElement {
    onClose();
    this.closeCurrentDropdown();

    container.append(dropdownElement);

    this.listenerCallback = () => {
      this.closeCurrentDropdown();
      onClose();
    };

    window.addEventListener('click', this.listenerCallback);

    this.currentDropdown = dropdownElement;

    return dropdownElement;
  }

  public closeCurrentDropdown(): void {
    this.currentDropdown?.remove();

    window.removeEventListener('click', this.listenerCallback);
  }
}
