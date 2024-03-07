import SidebarButtonComponent from '../../components/sidebar/SidebarButtonComponent';

export default class SidebarButtonPresenter {
  private readonly component: SidebarButtonComponent;

  constructor(
    private readonly parentElement: HTMLElement,
    text: string,
    clickCallback: () => void,
    iconTemplate: string = '',
  ) {
    this.component = new SidebarButtonComponent(text, iconTemplate);

    this.component.addOnClickListener(clickCallback);

    this.render();
  }

  public render(): void {
    this.parentElement.append(this.component.getElement());
  }
}
