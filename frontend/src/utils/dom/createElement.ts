import stringToDom from 'string-to-dom';

export function createElement(template: string): HTMLElement {
  return stringToDom(template);
}
