import Component from '../Component';

export default class PlaylistButtonComponent extends Component {
  constructor(
    private readonly imageSrc: string,
    private readonly title: string,
  ) {
    super();
  }

  public getTemplate(): string {
    return `
      <li class="playlist__item">
        <div class="playlist__image-container">
          <picture class="playlist__small-btn">
            <source srcset="${this.imageSrc}" media="(max-width: 576px)">
            <source srcset="${this.imageSrc}" media="(max-width: 1440px)"><img class="playlist__img" src="${this.imageSrc}" alt="Любимые песни">
          </picture>
        </div>
        <div class="playlist__content">
          <h3 class="playlist__h3">
            <a class="playlist__h3__link" href="/">${this.title}</a>
          </h3>
        </div>
      </li>
    `;
  }

  public addClickListener(onClickCallback: (event: Event) => void): void {
    const linkElement: HTMLElement | null = this.getElement().querySelector(
      '.playlist__h3__link',
    );

    if (!linkElement) {
      throw new Error('Link element not found');
    }

    linkElement.addEventListener('click', onClickCallback);
  }
}
