import Component from '../Component';

export default class SearchComponent extends Component {
  public getTemplate(): string {
    return `
      <div class="header__search">
        <input class="header__search__field" type="search" placeholder="ЧТО БУДЕМ ИСКАТЬ?">
      </div>
    `;
  }

  public addOnChange(callback: (event: Event) => void) {
    const input: HTMLElement | null = this.getElement().querySelector(
      '.header__search__field',
    );

    if (!(input instanceof HTMLInputElement)) {
      throw new Error(
        'Element with a class ".header__search__field" is not an instanceof HTMLInputElement',
      );
    }

    input.addEventListener('input', callback);
  }
}
