import Component from '../Component';

export default class SidebarButtonComponent extends Component {
  constructor(
    private text: string,
    private iconTemplate: string = '',
  ) {
    super();
  }

  public getTemplate(): string {
    return `
      <li class="aside__item">
        <button class="aside__btn aside__tabs-btn" data-path="tracks">
        ${this.iconTemplate}
      <span class="aside__btn__text">${this.text}</span>
        </button>
      </li>
    `;
  }
}
