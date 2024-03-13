import Component from '../Component';

export default class SearchComponent extends Component {
  constructor(
    private readonly className: string,
    private readonly inputClass: string,
    private readonly placeholder: string,
    private readonly inputId: string,
  ) {
    super();
  }

  public getTemplate(): string {
    return `
      <div class="${this.className}">
        <input class="${this.inputClass}" id="${this.inputId}" type="search" placeholder="${this.placeholder}">
      </div>
    `;
  }

  public addOnChange(callback: (event: Event) => void) {
    const input: HTMLElement | null = document.getElementById(this.inputId);

    if (!(input instanceof HTMLInputElement)) {
      throw new Error(
        `Element with id "${this.inputId}" is not an instanceof HTMLInputElement`,
      );
    }

    input.addEventListener('input', callback);
  }
}
