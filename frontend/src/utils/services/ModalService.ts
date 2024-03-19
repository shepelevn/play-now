import { createElement } from '../dom/createElement';

export default class ModalService {
  private previousModal: HTMLElement | null = null;
  private readonly modalParent: HTMLElement;
  private readonly overlay: HTMLElement;
  private readonly content: HTMLElement;

  constructor() {
    this.modalParent = createElement('<div class="modal modal_hidden"> </div>');

    this.overlay = createElement('<div class="modal__overlay"></div>');
    this.overlay.addEventListener('click', () => {
      this.close();
    });

    this.content = createElement('<div class="modal__content"></div>');

    this.modalParent.append(this.overlay);
    this.modalParent.append(this.content);

    document.body.prepend(this.modalParent);
  }

  public open(element: HTMLElement) {
    this.previousModal?.remove();
    this.previousModal = element;

    this.content.append(element);

    this.modalParent.classList.remove('modal_hidden');
  }

  public close() {
    this.previousModal?.remove();
    this.previousModal = null;

    this.modalParent.classList.add('modal_hidden');
  }
}
