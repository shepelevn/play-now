import { createElement } from '../utils/createElement';

export default abstract class Component {
  protected element: HTMLElement | null = null;

  public abstract getTemplate(): string;

  public getElement(): HTMLElement {
    this.element ??= createElement(this.getTemplate());

    return this.element;
  }

  public removeElement(): void {
    this.element?.remove();

    this.element = null;
  }
}
