import Component from '../Component';

export default class SidebarButtonComponent extends Component {
  constructor(
    private readonly text: string,
    private readonly iconTemplate: string = '',
    private readonly isActive: boolean,
  ) {
    super();
  }

  public getTemplate(): string {
    // TODO: Delete later
    if (this.isActive) {
      console.log(this.text);
    }

    return `
      <li class="aside__item">
        <button class="aside__btn aside__tabs-btn ${this.isActive ? 'aside__btn-active' : ''}" data-path="tracks">
        ${this.iconTemplate}
      <span>${this.text}</span>
        </button>
      </li>
    `;
  }

  public addOnClickListener(callback: () => void): void {
    const button: HTMLElement | null =
      this.getElement().querySelector('.aside__btn');

    if (button) {
      button.addEventListener('click', callback);
    }
  }
}
