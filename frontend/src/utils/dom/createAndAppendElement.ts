import { createElement } from './createElement';

export function createAndAppendElement(
  parentElement: HTMLElement,
  template: string,
): HTMLElement {
  const element = createElement(template);

  parentElement.append(element);

  return element;
}
