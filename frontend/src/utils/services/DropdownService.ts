import { notInitialized } from '../notInitialized';

export default class DropdownService {
  private currentDropdown: HTMLElement | null = null;
  private listenerCallback: () => void = notInitialized;
  private isOpen: boolean = false;
  private previousContainer: HTMLElement | null = null;

  public openDropdown(
    container: HTMLElement,
    dropdownElement: HTMLElement,
    onClose: () => void,
  ): HTMLElement | null {
    this.closeCurrentDropdown();
    onClose();

    if (this.isOpen && container === this.previousContainer) {
      this.isOpen = false;
      return null;
    }

    container.append(dropdownElement);

    this.listenerCallback = () => {
      this.closeCurrentDropdown();
      onClose();

      this.isOpen = false;
    };

    window.addEventListener('click', this.listenerCallback);

    this.currentDropdown = dropdownElement;

    this.previousContainer = container;
    this.isOpen = true;

    return this.currentDropdown;
  }

  public closeCurrentDropdown(): void {
    if (this.currentDropdown) {
      this.currentDropdown.remove();

      this.currentDropdown = null;
    }

    window.removeEventListener('click', this.listenerCallback);
  }
}
